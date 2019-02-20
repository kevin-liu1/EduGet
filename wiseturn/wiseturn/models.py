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

class WtModel(models.Model):
    '''
    WtModel is the abstract ancestor class for all models. 
    It defines __repr__ and __str__ methods which represents data in a user readable way.
    It defines an uid field which should be used to identify all objects in the front end
    '''
    class Meta:
        abstract = True # LogItModel doesn't correspond to any table in the DB

    uid = models.CharField(max_length=255, default=hex_uuid)

    def __repr__(self):
        return self.__str__()

    def __str__(self):
        return '__str__ for %s not implemented yet' % self.__class__.__name__

    def save(self, *args, **kwargs):
        # TODO: Can perform global save functionality here, like audit logs
        return super(WtModel, self).save(*args, **kwargs)

    @property
    def classname(self):
        return self.__class__.__name__


class WTUser(AbstractBaseUser, PermissionsMixin, WtModel):
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


def institution_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'institution/{0}/{1}'.format(instance.name, filename)

class Institution(WtModel):
    name = models.CharField(max_length=255, blank=False)
    dli_number = models.CharField(max_length=255, unique=True, null=True)
    founded = models.CharField(max_length=255, blank=False)
    type = models.CharField(max_length=255, blank=False)

    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=False)

    cost_of_living = models.DecimalField(max_digits=10, decimal_places=2)

    logo = models.ImageField(upload_to=institution_directory_path)

    def __str__(self):
        return self.name


class Program(WtModel):
    institution = models.ForeignKey('Institution', on_delete=models.CASCADE)

    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)
    tuition = models.DecimalField(max_digits=10, decimal_places=2)

    level = models.CharField(max_length=255, blank=False)
    discipline = models.CharField(max_length=255, blank=False)
    application_fee = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

"""
Neo4j Models to be created with post save signals
"""

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