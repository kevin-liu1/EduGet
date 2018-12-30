import binascii, os, uuid

from neomodel import (
	StructuredNode, StringProperty, DateProperty, EmailProperty, UniqueIdProperty, DateTimeProperty,
	RelationshipFrom, RelationshipTo)

from neomodel.cardinality import *
from django_neomodel import DjangoNode

from django.contrib.auth.models import BaseUserManager, AbstractUser
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class WTUserManager(BaseUserManager):
    """
    A custom user manager to deal with emails as unique identifiers for auth
    instead of usernames. The default that's used is "UserManager"
    """
    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        print("IN CREATE USER MANAGER")
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)

def hex_uuid():
    return uuid.uuid4().hex
    
class WTUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, blank=False)
    first_name = models.CharField(max_length=255, blank=False)
    last_name = models.CharField(max_length=255, blank=False)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    uid = models.CharField(max_length=255, default=hex_uuid)
    USERNAME_FIELD = 'email'
    objects = WTUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return "{} {}".format(self.first_name, self.last_name)

    def get_short_name(self):
        return self.first_name

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class User(DjangoNode):
    uid = UniqueIdProperty()
    firstname = StringProperty(index=True, required=True)
    lastname = StringProperty(index=True, required=True)
    email = EmailProperty(unique_index=True, required=True)
    password = StringProperty(requried=True)

    _token = RelationshipTo('Token', 'OWNS_TOKEN', cardinality=One)

    class Meta:
        app_label = 'wiseturn'

    @property
    def token(self):
        return self._token.single()
    
    def post_create(self):
        token = Token().save()
        self._token.connect(token)