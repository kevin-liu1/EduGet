from rest_framework import serializers, viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from  django.contrib.auth.hashers import check_password, make_password
from wiseturn.models import User

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
    	pass

    def create(self, validated_data):
        return User(
        	firstname = validated_data['firstname'],
        	lastname = validated_data['lastname'],
        	email = validated_data['email'],
        	password = make_password(validated_data['password']),
        ).save()

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        return instance


@api_view(['POST'])
def user_view(request):
    """
    Create a user
    """

    # if request.method == 'GET':
    #     return Response(status=status.HTTP_404_NOT_FOUND)
    #     users = User.nodes.all()
    #     serializer = UserSerializer(users, many=True)
    #     return Response(serializer.data)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def user_detail_view(request, uid):
    """
    Retrieve, update or delete a code snippet.
    """
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