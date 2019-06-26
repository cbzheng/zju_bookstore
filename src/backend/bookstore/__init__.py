from flask import Flask
from db.mongodb import MongoDB
from flask import request, make_response, jsonify, send_file
from bookstore.recommand import get_recommend_books, get_book_image

# Constants
RECOMMEND_BOOK_NUM = 4

def create_app(test_config=None):
    app = Flask(__name__)
    db = MongoDB()

    @app.route('/recommend/<username>', methods=['GET'])
    def recommend(username):
        print('User Name', username)
        return get_recommend_books(username, db)

    @app.route('/img/<timestamp>', methods=['GET'])
    def get_img(timestamp):
        img_name, img = get_book_image(timestamp, db)
        return send_file(img, attachment_filename=img_name)

    @app.route('/newbook/', methods=['POST'])
    def upload_book():
        data = request.form
        if db.add_book(data['book_name'],
                       data['originPrice'],
                       data['curPrice'],
                       request.files['image'],
                       data['book_class'],
                       data['description'],
                       timestamp=data['timestamp'],
                       seller=data['seller']):

            return jsonify({
                'result': True
            })

    @app.route('/login/', methods=['POST'])
    def login_store():
        data = request.get_json()
        user = db.check_user(data['username'], data['password'])

        if user is None:
            return jsonify({
                'result': False
            })
        return jsonify({
            'result': True,
            'username': user.user_name,
            # 'email': user.email
        })

    @app.route('/signup/', methods=['POST'])
    def signup_store():
        data = request.get_json()

        if db.add_user(data['username'], data['email'], data['password']):
            return jsonify({
                'result': True
            })
        else:
            return jsonify({
                'result': False
            })


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