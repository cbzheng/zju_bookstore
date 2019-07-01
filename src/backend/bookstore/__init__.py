from flask import Flask
from db.mongodb import MongoDB
from flask import request, make_response, jsonify, send_file
from bookstore.recommand import get_recommend_books, get_book_image

# Constants
RECOMMEND_BOOK_NUM = 4

def create_app(test_config=None):
    app = Flask(__name__)
    db = MongoDB()

    @app.route('/msg/read/', methods=['POST'])
    def readMsg():
        data = request.get_json()
        db.read_msg(data['sender'], data['receiver'])
        return jsonify({})

    # router about messages
    @app.route('/msg/send/', methods=['POST'])
    def sendMsg():
        data = request.get_json()
        db.send_msg(
            sender=data['sender'],
            receiver=data['receiver'],
            content=data['content'],
            time=data['time']
        )
        return jsonify({})

    @app.route('/msg/unread/<username>/', methods=['GET'])
    def countUnread(username):
        return db.count_unread_msg(username)

    @app.route('/msg/lookup/<username>/', methods=['GET'])
    def getAllMsg(username):
        return db.lookup_msg(username)

    @app.route('/neworder/', methods=['POST'])
    def addOrder():
        data = request.get_json()
        if db.add_order(ot=data['ot'],
                        bt=data['bt'],
                        seller=data['seller'],
                        buyer=data['buyer'],
                        price=data['price'],
                        addr=data['addr'],
                        phone=data['phone'],
                        method=data['method']
                        ):
            return jsonify({
                'result': True
            })
        else:
            return jsonify({
                'result': False
            })

    @app.route('/updata/order/', methods=['POST'])
    def updateOrder():
        data = request.get_json()
        db.update_order(ot=data['ot'],
                        isFinish=data['isFinish'],
                        price=data['price'],
                        sellerAgree=data['sellerAgree'])
        return jsonify({})

    @app.route('/get/order/<stamp>/', methods=['GET'])
    def getOrder(stamp):
        return db.get_order(stamp)

    @app.route('/user/getorder/<username>/', methods=['GET'])
    def userGetOrder(username):
        return db.get_user_order(username)

    @app.route('/user/<username>/sell/', methods=['GET'])
    def userSell(username):
        return db.get_user_sell(username)

    @app.route('/user/<username>/want/', methods=['GET'])
    def userWnat(username):
        return db.get_user_want(username)

    @app.route('/want/', methods=['GET'])
    def want():
        return db.get_all_wnat()

    @app.route('/server/search/<name>/', methods=['GET'])
    def search(name):
        return db.get_books_by_name(name)

    @app.route('/server/class/<name>/', methods=['GET'])
    def category(name):
        return db.get_books_by_class(name)

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

    @app.route('/want/', methods=['POST'])
    def upload_want():
        data = request.get_json()
        if db.add_want(book_name=data['book_name'],
                       lowPrice=data['lowPrice'],
                       highPrice=data['highPrice'],
                       book_class=data['book_class'],
                       description=data['description'],
                       timestamp=data['timestamp'],
                       wanter=data['wanter']):
            return jsonify({
                'result': True
            })

    @app.route('/update/book/', methods=['POST'])
    def update_book():
        data = request.get_json()
        db.update_book(data['book_name'],
                    data['originPrice'],
                    data['curPrice'],
                    data['book_class'],
                    data['description'],
                    timestamp=data['timestamp'],
                    seller=data['seller'])
        return jsonify({})

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
