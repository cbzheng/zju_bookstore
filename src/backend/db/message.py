from mongoengine import *
import time

class Message(Document):
    time = StringField(required=True)
    content = StringField(required=True)
    sender = StringField(required=True)
    receiver = StringField(required=True)
    isRead = BooleanField(default=False)
