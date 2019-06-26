from mongoengine import *


class Books(Document):
    book_name = StringField(required=True, max_length=50)
    originPrice = FloatField(required=True)
    curPrice = FloatField(required=True)
    image = FileField(required=True)
    book_class = StringField(required=True)
    description = StringField(required=True)
