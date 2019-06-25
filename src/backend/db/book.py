from mongoengine import *

class Book(Document):
    book_name = StringField(required=True, max_length=50)
    originPrice = FloatField(required=True)
    curPrice = FloatField(required=True)
    image = ImageField(required=True)
