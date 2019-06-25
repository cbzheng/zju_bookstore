import mongoengine as mg
from db.user import Users


class MongoDB():
    def __init__(self):
        mg.connect('bookstore')

    def add_user(self, username, email, password):
        user = Users(user_name=username, email=email, password=password )
        user.save()

    def get_user_by_name(self, username):
        try:
            user = Users.objects.get(user_name = username)
            return user
        except mg.DoesNotExist:
            return None
