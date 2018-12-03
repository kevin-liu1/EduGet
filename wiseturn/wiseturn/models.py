from neomodel import StructuredNode, StringProperty, DateProperty, EmailProperty, UniqueIdProperty

class User(StructuredNode):
    uid = UniqueIdProperty()
    firstname = StringProperty(index=True)
    lastname = StringProperty(index=True)
    email = EmailProperty()
    password = StringProperty()