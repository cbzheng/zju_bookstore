import bookstore
from db.book import Books
from flask import jsonify


def get_recommend_books(user_name, db):
    books = Books.objects[:bookstore.RECOMMEND_BOOK_NUM]

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
        })

    return jsonify({'recommend': [response]})

def get_book_image(timestamp, db):
    print(int(timestamp))
    book = Books.objects.get(timestamp=int(timestamp))
    if not book:
        return '', None
    else:
        return book.image_name, book.image


if __name__ == '__main__':
    db = bookstore.MongoDB()
    books = get_recommend_books('bob', db)
    for b in books:
        print(b)