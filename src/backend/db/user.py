from mongoengine import *


# the Collection Scheme of users
class Users(Document):
    user_name = StringField(max_length=20, required=True)
    email = EmailField(required=True)
    password = StringField(max_length=30, required=True)
    age = IntField()
    meta = {
        'indexes': [
            {'fields': ['user_name'], 'unique': True},
        ]
    }
