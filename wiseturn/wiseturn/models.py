from neomodel import StructuredNode, StringProperty, DateProperty, EmailProperty, UniqueIdProperty
from django_neomodel import DjangoNode

class User(DjangoNode):
    uid = UniqueIdProperty()
    firstname = StringProperty(index=True, required=True)
    lastname = StringProperty(index=True, required=True)
    email = EmailProperty(unique_index=True, required=True)
    password = StringProperty(requried=True)

    class Meta:
        app_label = 'wiseturn'