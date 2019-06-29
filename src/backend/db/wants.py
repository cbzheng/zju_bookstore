from mongoengine import *
import time

class Wants(Document):
    timestamp = FloatField(primary_key=True, required=True)
    book_name = StringField(required=True, max_length=50)
    lowPrice = FloatField(required=True)
    highPrice = FloatField(required=True)
    book_class = StringField(required=True)
    description = StringField(required=True)

    wanter = StringField(required=True)
    giver = StringField()
