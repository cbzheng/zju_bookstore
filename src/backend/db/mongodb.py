import mongoengine as mg
from db.user import Users
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
