import mongoengine as mg
from db.user import Users
from db.book import Books
from mongoengine.queryset.visitor import Q


class MongoDB():
    def __init__(self):
        mg.connect('bookstore')

    def add_user(self, username, email, password):
        if Users.objects(user_name=username):
            return False
        user = Users(user_name=username, email=email, password=password )
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
