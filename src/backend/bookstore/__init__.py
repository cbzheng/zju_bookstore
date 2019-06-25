from flask import Flask
from db.mongodb import MongoDB
from flask import request, make_response, json


def create_app(test_config=None):
    app = Flask(__name__)
    db = MongoDB()

    @app.route('/login/', methods=['POST', 'GET'])
    def login_store():
        print('hei')

        if request.method == 'POST':
            data = request.get_json()
            print(data)

    @app.route('/signup/', methods=['POST'])
    def signup_store():
        data = request.get_json()
        db.add_user(data['username'], data['email'], data['password'])
        return 'hi'


    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app


def login(username, password, db):
    user = db.get_user_by_name(username=username)

def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
