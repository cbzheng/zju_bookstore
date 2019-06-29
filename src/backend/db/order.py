from mongoengine import *
import time

class Order(Document):
    order_timestamp = FloatField(primary_key=True, required=True)
    book_timestamp = FloatField(required=True)
    seller = StringField(required=True)
    buyer = StringField(required=True)
    isFinish = BooleanField(default=False)
    agreePrice = FloatField(required=True)

