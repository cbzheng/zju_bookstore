import mongoengine as mg
from db.user import Users
from db.book import Books
from db.wants import Wants
from db.order import Order
from mongoengine.queryset.visitor import Q
from flask import jsonify


class MongoDB():
    def __init__(self):
        mg.connect('bookstore')

    def add_user(self, username, email, password):
        if Users.objects(user_name=username):
            return False
        user = Users(user_name=username, email=email, password=password)
        user.save()
        return True

    def check_user(self, username, password):
        if not Users.objects(Q(user_name__exact=username) & Q(password__exact=password)):
            return None
        user = Users.objects.get(user_name=username)
        return user

    def add_book(self, book_name, originPrice, curPrice, img, book_class, description, timestamp, seller):
        book = Books(book_name=book_name,
                     originPrice=originPrice,
                     curPrice=curPrice,
                     image=img,
                     book_class=book_class,
                     description=description,
                     timestamp=timestamp,
                     image_name=img.filename,
                     seller=seller)
        book.save()
        return True

    def add_want(self, book_name, lowPrice, highPrice, book_class, description, timestamp, wanter):
        book = Wants(book_name=book_name,
                     lowPrice=lowPrice,
                     highPrice=highPrice,
                     book_class=book_class,
                     description=description,
                     timestamp=timestamp,
                     wanter=wanter)
        book.save()
        return True

    # functions about orders
    def add_order(self, ot, bt, seller, buyer, price):
        if Order.objects(book_timestamp=bt, buyer=buyer):
            return False
        book = Order(order_timestamp=ot,
            book_timestamp=bt,
            seller=seller,
            buyer=buyer,
            agreePrice=price)
        book.save()
        return True

    def update_order(self, ot, isFinish, price):
        order = Order.objects.get(order_timestamp=ot)

        order.update(
            isFinish=isFinish,
            agreePrice=price
        )

    def get_order(self, ot):
        order = Order.objects.get(order_timestamp=ot)
        book = Books.objects.get(timestamp=order.book_timestamp)

        return jsonify({
            'book_name': book.book_name,
            'book_class': book.book_class,
            'order_timestamp': order.order_timestamp,
            'book_timestamp': order.book_timestamp,
            'seller': order.seller,
            'buyer': order.buyer,
            'price': order.agreePrice,
            'isFinish': order.isFinish
        })

    def get_book(self, bt):
        book = Books.objects.get(timestamp=bt)

        return jsonify({
            'book_name': book.book_name
        })

    def update_book(self, book_name, originPrice, curPrice, book_class, description, timestamp, seller):
        book = Books.objects.get(timestamp=timestamp)

        book.update(
            book_name=book_name,
            book_class=book_class,
            description=description,
            originPrice=originPrice,
            curPrice=curPrice
        )

    def get_user_sell(self, user_name):
        books = Books.objects(seller=user_name)

        # form response
        response = []
        for book in books:
            response.append({
                'timestamp': book.timestamp,
                'book_name': book.book_name,
                'originPrice': book.originPrice,
                'curPrice': book.curPrice,
                'book_class': book.book_class,
                'description': book.description,
                'seller': book.seller
            })

        return jsonify({'sell_books': [response]})

    def get_user_want(self, user_name):
        books = Wants.objects(wanter=user_name)

        # form response
        response = []
        for book in books:
            response.append({
                'timestamp': book.timestamp,
                'book_name': book.book_name,
                'lowPrice': book.lowPrice,
                'highPrice': book.highPrice,
                'book_class': book.book_class,
                'description': book.description,
                'wanter': book.wanter
            })

        return jsonify({'want': [response]})

    def get_books_by_name(self, book_name):
        books = Books.objects(book_name__icontains=book_name)

        # form response
        response = []
        for book in books:
            response.append({
                'timestamp': book.timestamp,
                'book_name': book.book_name,
                'originPrice': book.originPrice,
                'curPrice': book.curPrice,
                'book_class': book.book_class,
                'description': book.description,
                'seller': book.seller
            })

        return jsonify({'result': [response]})
