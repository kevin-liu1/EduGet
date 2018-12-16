from wiseturn.models import User, Token
from wiseturn.auth import TokenAuthentication

from rest_framework import serializers, viewsets, status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.views import ObtainAuthToken

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password, make_password


class UserSerializer(serializers.Serializer):
    uid = serializers.CharField(max_length=256, read_only=True)
    firstname = serializers.CharField(max_length=256)
    lastname = serializers.CharField(max_length=256)
    email = serializers.EmailField()
    password = serializers.CharField(
	    style={'input_type': 'password'},
	    write_only=True
	)

    def validate_password(self, value):
    	#TODO: min password requirements
    	return value

    def validate_email(self, value):
        print("FILTERINGGGGGGGGGGGG")
        if len(User.nodes.filter(email=value)) >= 1:
            raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, validated_data):
        print(validated_data['password'])
        print(validated_data['password'].__class__)
        password = make_password(validated_data['password'])
        print(password)
        return User(
        	firstname = validated_data['firstname'],
        	lastname = validated_data['lastname'],
        	email = validated_data['email'],
        	password = password,
        ).save()

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        return instance


@api_view(['POST'])
def user_create_view(request):
    """
    Create a user with fields
    firstname = CharField(max_length=256)
    lastname = CharField(max_length=256)
    email = EmailField()
    password = CharField()
    """
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def user_detail_view(request, uid):
    token = request.META['HTTP_AUTHORIZATION']
    print(token)

    """
    Retrieve or update a user with fields
    firstname = CharField(max_length=256)
    lastname = CharField(max_length=256)
    email = EmailField()
    password = CharField()
    """
    print(request.user)
    print ("user not found {}".format(uid))
    try:
        user = User.nodes.get(uid=uid)
    except User.DoesNotExist:
        print ("user not found {}".format(uid))
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label="Email")
    password = serializers.CharField(
        label="Password",
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)

            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs

class CustomAuthToken(ObtainAuthToken):
    serializer_class = AuthTokenSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = user.token

        return Response({
            'token': token.key,
            'user_id': user.uid,
            'email': user.email
        })