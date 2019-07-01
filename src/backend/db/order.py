from mongoengine import *
import time

class Order(Document):
    order_timestamp = FloatField(primary_key=True, required=True)
    book_timestamp = FloatField(required=True)
    seller = StringField(required=True)
    buyer = StringField(required=True)
    isFinish = BooleanField(default=False)
    sellerAgree = BooleanField(default=False)

    offLine = BooleanField(default=True)
    mail = BooleanField(default=False)

    address = StringField()
    phone = StringField()

    agreePrice = FloatField(required=True)

