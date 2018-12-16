import binascii, os

from neomodel import (
	StructuredNode, StringProperty, DateProperty, EmailProperty, UniqueIdProperty, DateTimeProperty,
	RelationshipFrom, RelationshipTo)

from neomodel.cardinality import *
from django_neomodel import DjangoNode


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

def generate_key():
        return binascii.hexlify(os.urandom(20)).decode()

class Token(DjangoNode):
    _user = RelationshipTo('Token', 'FOR_USER', cardinality=One)

    key = StringProperty(unique_index=True, default=generate_key)
    created = DateTimeProperty(default_now=True)

    @property
    def user(self):
        return self._user.single()

    class Meta:
        app_label = 'wiseturn'

    