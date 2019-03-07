from wiseturn.models import *

from rest_framework import serializers, viewsets, status, generics
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password, make_password
import django.contrib.auth.password_validation as validators

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from drf_yasg.utils import swagger_serializer_method

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ('uid', 'name', 'country', 'location', 'logo')
        read_only_fields = ('uid',)


class InstitutionListView(generics.ListAPIView):
    """
    Returns a list of all Institutions
    """
    model = Institution
    serializer_class = InstitutionSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = Institution.objects.all()
        return queryset

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        exclude = ('id', 'institution')
        read_only_fields = ('uid',)

class InstitutionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        exclude = ('id',)
        read_only_fields = ('uid',)

    programs = serializers.SerializerMethodField()

    @swagger_serializer_method(serializer_or_field=ProgramSerializer)
    def get_programs(self, instance):
        return ProgramSerializer(instance.program_set.all(), many=True).data

class InstitutionDetailView(generics.GenericAPIView):
    serializer_class = InstitutionDetailSerializer
    # authentication_classes = (TokenAuthentication,)
    # permission_classes = (IsAuthenticated,)

    def get_object(self, request, uid):
        return get_object_or_404(Institution, uid=uid)

    def get(self, request, uid, format=None):
        """
        Returns an institution and all its programs
        """
        institution = self.get_object(request, uid)
        serializer = InstitutionDetailSerializer(institution)
        return Response(serializer.data)