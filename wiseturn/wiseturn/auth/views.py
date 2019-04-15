from wiseturn.models import WTUser

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

from drf_yasg.utils import swagger_serializer_method
from wiseturn.views import InstitutionSerializer
from rest_framework.authtoken.models import Token


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_info': WTUserSerializer(user).data})


class WTUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WTUser
        fields = ('email', 'first_name', 'last_name', 'zippostal', 'phonenumber', 'grade',
                  'city', 'birthday', 'country_of_origin', 'education_level', 'school', 'password', 'admin_institution')
        read_only_fields = ('uid', 'admin_institution')
        extra_kwargs = {'password': {'write_only': True}}

    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )

    admin_institution = serializers.SerializerMethodField()

    @swagger_serializer_method(serializer_or_field=InstitutionSerializer)
    def get_admin_institution(self, instance):
        try:
            return InstitutionSerializer(instance.institutionadmin.institution).data
        except:
            return None

    def validate_password(self, value):
        # TODO: min password requirements
        return value

    def validate_email(self, value):
        if WTUser.objects.filter(email=value):
            raise serializers.ValidationError(
                "This email is already registered.")
        return value

    def create(self, validated_data):

        user = WTUser(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance


class UserCreateView(generics.GenericAPIView):
    serializer_class = WTUserSerializer

    def post(self, request, format=None):
        """
        Create a new user
        """
        serializer = WTUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = WTUserSerializer

    def get_object(self, request):
        return request.user

    def get(self, request, format=None):
        """
        Returns current user info
        """
        user = self.get_object(request)
        serializer = WTUserSerializer(user)
        return Response(serializer.data)

    def put(self, request, format=None):
        """
        Update current user info
        """
        user = self.get_object(request)
        serializer = WTUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
