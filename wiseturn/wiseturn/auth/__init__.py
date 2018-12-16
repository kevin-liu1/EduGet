import binascii
from wiseturn.models import User, Token

from django.contrib.auth.hashers import check_password, make_password

from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication

class NodeBackend(object):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.nodes.get(email=email)
        except User.DoesNotExist:
            pass
        else:
            if check_password(password, user.password):
                return user

    def get_user(self, user_id):
        try:
            user = User.nodes.get(uid=uid)
        except User.DoesNotExist:
            return None
        return user

class TokenAuthentication(TokenAuthentication):
    model = Token

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.nodes.get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token.')

        return (token.user, token)