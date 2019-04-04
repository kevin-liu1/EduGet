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

from django.utils import timezone

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
        abstract = True

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

    zippostal = models.CharField(max_length=255, blank=True)
    phonenumber = models.IntegerField(null=True)
    city = models.CharField(max_length=255, blank=True)
    birthday = models.DateField(null=True)
    country_of_origin = models.CharField(max_length=255, blank=True)
    education_level = models.CharField(max_length=255, blank=True)
    grade = models.IntegerField(null=True)
    school = models.CharField(max_length=255, blank=True)
    

    USERNAME_FIELD = 'email'
    objects = WTUserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return "{} {}".format(self.first_name, self.last_name)

    def get_short_name(self):
        return self.first_name

class InstitutionAdmin(WTUser):
    institution = models.ForeignKey('Institution')

def makeInstitutionAdmin(user, institution):
    admin = InstitutionAdmin(wtuser_ptr_id=user.pk, institution=institution)
    admin.__dict__.update(user.__dict__)
    admin.save()

def removeInstitutionAdmin(user):
    _user = WTUser()
    _user.__dict__.update(user.__dict__)
    user.delete()
    _user.save()


class CompanyAdmin(WTUser):
    company = models.ForeignKey('Company')

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


def institution_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'institution/{0}/{1}'.format(instance.name, filename)

class Institution(WtModel):
    name = models.CharField(max_length=255, blank=False)
    dli_number = models.CharField(max_length=255)
    founded = models.IntegerField(null=True)
    type = models.CharField(max_length=255, blank=False)

    description = models.TextField(blank=True)
    
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    postal = models.CharField(max_length=255, blank=True)
    province = models.CharField(max_length=255, blank=True)
    street = models.CharField(max_length=255, blank=True)

    cost_of_living = models.DecimalField(max_digits=10, decimal_places=2)

    logo = models.ImageField(upload_to=institution_directory_path)

    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)

    slug = models.CharField(max_length=255, unique=True)

    @property
    def location(self):
        return "{}, {}".format(self.city, self.province)

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

    slug = models.CharField(max_length=255, unique=True)
    def __str__(self):
        return self.name

class Company(WtModel):
    name = models.CharField(max_length=255, blank=False)
    size = models.IntegerField(null=True)

    description = models.TextField(blank=True)
    
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    postal = models.CharField(max_length=255, blank=True)
    province = models.CharField(max_length=255, blank=True)
    street = models.CharField(max_length=255, blank=True)

    cost_of_living = models.DecimalField(max_digits=10, decimal_places=2)

    logo = models.ImageField(upload_to=institution_directory_path)

    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)

    slug = models.CharField(max_length=255, unique=True)

    @property
    def location(self):
        return "{}, {}".format(self.city, self.province)

    def __str__(self):
        return self.name

class JobPosting(WtModel):
    company = models.ForeignKey('Company', on_delete=models.CASCADE)

    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=True)

    salary = models.DecimalField(max_digits=10, decimal_places=2)

    slug = models.CharField(max_length=255, unique=True)
    def __str__(self):
        return self.name

class Application(WtModel):
    class Meta:
        abstract = True

    user = models.ForeignKey('WtUser', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    modified = models.DateTimeField(auto_now=True)
    SUBMITTED = 'SUB'
    PENDING = 'PEN'
    REVIEW = 'REV'
    APPROVED = 'APP'
    WAITLIST = 'WAI'
    REJECTED = 'REJ'
    WITHDRAWN = 'WIT'
    ACCEPT = 'ACC'
    STATUS_CHOICES = (
        (SUBMITTED, 'Submitted'),
        (PENDING, 'Pending'),
        (REVIEW, 'Under Review'),
        (APPROVED, 'Approved'),
        (WAITLIST, 'Waitlist'),
        (REJECTED, 'Rejected')
    )

    status = models.CharField(
        max_length = 3,
        choices = STATUS_CHOICES,
        default = SUBMITTED
    )

    APPLICANT_CHOICES = (
        (ACCEPT, 'Accepted Offer'),
        (WITHDRAWN, 'Withdrawn'),
        (PENDING, 'PENDING')
    )

    applicant_status = models.CharField(
        max_length = 3,
        choices = APPLICANT_CHOICES,
        default = PENDING
    )
    
class ProgramApplication(Application):
    program = models.ForeignKey('Program', on_delete=models.CASCADE)

    def __str__(self):
        return "{} | {} ({})".format(self.user, self.program.name, self.status)

class JobApplication(Application):
    job_posting = models.ForeignKey('JobPosting', on_delete=models.CASCADE)

    def __str__(self):
        return "{} | {} ({})".format(self.user, self.job_posting.name, self.status)

"""
Neo4j Models to be created with post save signals
"""

class User(DjangoNode):
    uid = UniqueIdProperty()
    firstname = StringProperty(index=True, required=True)
    lastname = StringProperty(index=True, required=True)
    email = EmailProperty(unique_index=True, required=True)
    password = StringProperty(required=True)

    _token = RelationshipTo('Token', 'OWNS_TOKEN')

    class Meta:
        app_label = 'wiseturn'

    @property
    def token(self):
        return self._token.single()
    
    def post_create(self):
        token = Token().save()
        self._token.connect(token)
