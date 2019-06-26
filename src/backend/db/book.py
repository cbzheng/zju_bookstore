from mongoengine import *
import time

class Books(Document):
    timestamp = FloatField(primary_key=True, required=True)
    book_name = StringField(required=True, max_length=50)
    originPrice = FloatField(required=True)
    curPrice = FloatField(required=True)
    image = FileField(required=True)
    image_name = StringField(required=True)
    book_class = StringField(required=True)
    description = StringField(required=True)

    seller = StringField(required=True)
    buyer = StringField()
