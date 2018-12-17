from wiseturn.models import WTUser

from rest_framework import serializers, viewsets, status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password, make_password
import django.contrib.auth.password_validation as validators


class WTUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WTUser
        fields = ('uid', 'first_name', 'last_name', 'email', 'password')
        read_only_fields = ('uid',)
        extra_kwargs = {'password': {'write_only': True}}

    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    password = serializers.CharField(
	    style={'input_type': 'password'},
	    write_only=True
	)

    def validate_password(self, value):
    	#TODO: min password requirements
    	return value

    def validate_email(self, value):
        if WTUser.objects.filter(email=value):
            raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, validated_data):
        user = WTUser(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        return instance


@api_view(['POST'])
def user_create_view(request):
    """
    Create a WTUser with fields
    firstname = CharField(max_length=256)
    lastname = CharField(max_length=256)
    email = EmailField()
    password = CharField()
    """
    if request.method == 'POST':
        serializer = WTUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def user_detail_view(request, uid):
    token = request.META['HTTP_AUTHORIZATION']
    print(token)

    """
    Retrieve or update a WTUser with fields
    firstname = CharField(max_length=256)
    lastname = CharField(max_length=256)
    email = EmailField()
    password = CharField()
    """
    print(request.user)
    print ("WTUser not found {}".format(uid))
    try:
        user = WTUser.objects.get(uid=uid)
    except WTUser.DoesNotExist:
        print ("WTUser not found {}".format(uid))
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = WTUserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = WTUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
