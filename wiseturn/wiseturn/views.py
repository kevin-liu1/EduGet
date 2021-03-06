from wiseturn.models import *

import wiseturn.auth as WiseturnAuth

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
from rest_framework import filters

from django.shortcuts import get_object_or_404
from django.db.models import F
from drf_yasg.utils import swagger_serializer_method
from django_filters.rest_framework import DjangoFilterBackend



class NullsAlwaysLastOrderingFilter(filters.OrderingFilter):
    """ Use Django 1.11 nulls_last feature to force nulls to bottom in all orderings. """

    def filter_queryset(self, request, queryset, view):
        ordering = self.get_ordering(request, queryset, view)

        if ordering:
            f_ordering = []
            for o in ordering:
                if not o:
                    continue
                if o[0] == '-':
                    f_ordering.append(F(o[1:]).desc(nulls_last=True))
                else:
                    f_ordering.append(F(o).asc(nulls_last=True))

            return queryset.order_by(*f_ordering)

        return queryset


"""
SERIALIZERS
"""


class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = ('uid', 'name', 'country', 'location', 'logo', 'cost_of_living',)
        read_only_fields = ('uid',)

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        exclude = ('id',)
        read_only_fields = ('uid',)

    institution = InstitutionSerializer(read_only=True) 

    average_applicant_grade = serializers.SerializerMethodField()

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField)
    def get_average_applicant_grade(self, instance):
        l = [app.user.grade for app in instance.programapplication_set.prefetch_related('user') if app.user.grade]
        if l:
            return sum(l) / len(l) 

class ProgramField(serializers.SlugRelatedField):
    def to_representation(self, value):
        serializer = ProgramSerializer(value)
        return serializer.data

    def get_queryset(self):
        return Program.objects.all()

class InstitutionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        exclude = ('id', )
        read_only_fields = ('uid',)

    programs = serializers.SerializerMethodField()

    @swagger_serializer_method(serializer_or_field=ProgramSerializer)
    def get_programs(self, instance):
        return ProgramSerializer(instance.program_set.all(), many=True).data

class WTUserField(serializers.SlugRelatedField):
    def to_representation(self, value):
        serializer = WiseturnAuth.views.WTUserSerializer(value)
        return serializer.data
    
    def get_queryset(self):
        return WTUser.objects.all()


class ProgramApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramApplication
        exclude = ('id',)
        read_only_fields = ('uid',)

    program = ProgramField(slug_field="uid")
    user = WTUserField(slug_field="uid", read_only=True, default=serializers.CurrentUserDefault())

    def create(self, validated_data):
        return ProgramApplication.objects.create(
            user=self.context['request'].user,
            program=validated_data['program']
        )

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance

class ProgramCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramComment
        fields = '__all__'
        read_only_fields = ('uid',)

    program = serializers.SlugRelatedField(slug_field='uid', queryset=Program.objects.all())
    user = WTUserField(slug_field="uid", read_only=True, default=serializers.CurrentUserDefault())

    def create(self, validated_data):
        return ProgramComment.objects.create(
            user=self.context['request'].user,
            message=validated_data['message'],
            program=validated_data['program'],
        )
"""
VIEWS
"""


class InstitutionListView(generics.ListAPIView):
    """
    Returns a list of all Institutions
    """
    model = Institution
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    filter_backends = (filters.SearchFilter, NullsAlwaysLastOrderingFilter,)
    search_fields = ('name',)
    ordering_fields = '__all__'


class InstitutionDetailView(generics.GenericAPIView):
    serializer_class = InstitutionDetailSerializer

    def get_object(self, request, uid):
        return get_object_or_404(Institution, uid=uid)

    def get(self, request, uid, format=None):
        """
        Returns an institution and all its programs
        """
        institution = self.get_object(request, uid)
        serializer = InstitutionDetailSerializer(institution)
        return Response(serializer.data)


class ProgramListView(generics.ListAPIView):
    """
    Returns a list of all programs
    """
    model = Program
    queryset = Program.objects.all().select_related('institution')
    serializer_class = ProgramSerializer
    filter_backends = (filters.SearchFilter, NullsAlwaysLastOrderingFilter,)
    search_fields = ('name',)
    ordering_fields = '__all__'

class RecommendedProgramListView(ProgramListView):
    def get_queryset(self):
        # TODO: more sophisticated algorithm
        return Program.objects.filter(name__contains=self.request.user.interest).select_related('institution')

class ProgramDetailView(generics.GenericAPIView):
    serializer_class = ProgramSerializer

    def get_object(self, request, uid):
        return get_object_or_404(Program, uid=uid)

    def get(self, request, uid, format=None):
        program = self.get_object(request, uid)
        serializer = ProgramSerializer(program)
        return Response(serializer.data)

class ProgramAcceptedApplicantsView(generics.ListAPIView):
    model = WTUser
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        return WiseturnAuth.views.WTUserSerializer

    def get_queryset(self):
        uid = self.kwargs.get("uid")
        print(ProgramApplication.objects.filter(program__uid=uid, applicant_status='ACC'))
        return WTUser.objects.filter(
            pk__in=[app.user.pk for app in ProgramApplication.objects.filter(program__uid=uid, applicant_status='ACC').prefetch_related('user')]
        )

class ProgramCommentsView(generics.ListAPIView):
    model = ProgramComment
    serializer_class = ProgramCommentSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        uid = self.kwargs.get("uid")
        return ProgramComment.objects.filter(program__uid=uid).order_by('-created')

    def post(self, request, uid, format=None):
        serializer = ProgramCommentSerializer(
            data={'message': request.data['message'], 'program': uid}, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProgramApplicationListView(generics.ListAPIView):
    model = ProgramApplication
    serializer_class = ProgramApplicationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.request.user.programapplication_set.all()


class ProgramApplicationAdminListView(generics.ListAPIView):
    model = ProgramApplication
    serializer_class = ProgramApplicationSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('program__uid',)
    def get_queryset(self):
        user = get_object_or_404(
            InstitutionAdmin, wtuser_ptr=self.request.user)
        return ProgramApplication.objects.filter(program__institution=user.institution)


class ProgramApplicationCreateView(generics.GenericAPIView):
    serializer_class = ProgramApplicationSerializer

    def post(self, request, format=None):
        serializer = ProgramApplicationSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProgramApplicationDetailView(generics.GenericAPIView):
    serializer_class = ProgramApplicationSerializer

    def put(self, request, uid, format=None):
        application = get_object_or_404(ProgramApplication, uid=uid)

        data = {}

        try:
            if request.user.institutionadmin.institution == application.program.institution:
                data = request.data
            else:
                raise AttributeError
        except AttributeError:
            data['applicant_status'] = request.data.get('applicant_status', "")

        serializer = ProgramApplicationSerializer(
            application, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
