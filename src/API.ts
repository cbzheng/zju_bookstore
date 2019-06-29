import axios, {AxiosResponse} from 'axios'
import {async, timeout} from "q";


export function login(username: string, password: string) {

    return axios({
        method: 'post',
        url: '/login/',
        data: {
            username: username,
            password: password
        }
    }).then((response) => {
        if (response.data.result) {
            return username;
        } else {
            return ""
        }
    }).catch(error => {
        return ""
    });

}

// Sign up request
export function signup(username: string, email: string, password: string) {

    return axios.post('/signup/', {
        username: username,
        email: email,
        password: password
    }).then((response) => {
        console.log(response.data);
        return response.data.result
    }).catch(reason => {
        return false
    });

}

// new Product
export interface Product {

    book_name: string,
    originPrice: Number,
    curPrice: Number,
    image: File,
    book_class: string,
    description: string,
    seller: string,
    timestamp: string
}

export interface updateProduct {
    book_name: string,
    originPrice: Number,
    curPrice: Number,
    book_class: string,
    description: string,
    seller: string,
    timestamp: string
}

export function uploadProductInfo(book: Product) {
    let formData = new FormData();
    formData.append("image", book.image);
    formData.append('book_name', book.book_name);
    formData.append('originPrice', book.originPrice.toString());
    formData.append('curPrice', book.curPrice.toString());
    formData.append('book_class', book.book_class);
    formData.append('description', book.description);
    formData.append('timestamp', book.timestamp);
    formData.append('seller', book.seller);

    return axios.post('/newbook/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        return !!response.data.result;
    })
}

// API related to orders
export interface Order {
    ot: string,
    bt: string,
    seller: string,
    buyer: string,
    price: string
}

export function uploadOrder(o: Order) {
    return axios.post('/neworder/', {
        ot: o.ot,
        bt: o.bt,
        seller: o.seller,
        buyer: o.buyer,
        price: o.price
    }).then((response) => {
        return response.data.result
    })
}

export function updateOrder(ot: string, isFinish: boolean, price: number) {
    return axios.post('/update/order/', {
        ot: ot,
        isFinish: isFinish,
        price: price
    })
}

export function getOrder(ot: string) {
    return axios.get('/get/order/' + ot + '/')
        .then((data) => {
            return data.data
        })
}

export interface WantBook {
    book_name: string,
    lowPrice: Number,
    highPrice: Number,
    book_class: string,
    description: string,
    wanter: string,
    timestamp: string
}

// Want book
export function uploadWants(w: WantBook) {

    return axios.post('/want/', {
        book_name: w.book_name,
        lowPrice: w.lowPrice,
        highPrice: w.highPrice,
        book_class: w.book_class,
        description: w.description,
        wanter: w.wanter,
        timestamp: w.timestamp
    }).then((response) => {
        console.log(response.data);
        return response.data.result
    }).catch(reason => {
        return false
    });

}

export function updateBook(book: updateProduct) {

    console.log(book);
    axios.post('/update/book/', {
        book_name: book.book_name,
        originPrice: book.originPrice,
        curPrice: book.curPrice,
        book_class: book.book_class,
        description: book.description,
        timestamp: book.timestamp,
        seller: book.seller
    }).then((response) => {
        console.log(response.data);
    }).catch(reason => {
    });

}

// Get Recommend books
export function getRecommendBooks(name: string) {
    if (name === '') {
        name = '__normal'
    }
    return axios.get('/recommend/' + name).then((response) => {
        return response.data;
    })
}

// Get Recommend books
export function getOnSell(name: string) {
    if (name === '') {
        name = '__normal'
    }
    return axios.get('/user/' + name + '/sell/').then((response) => {
        return response.data;
    })
}

// Get user want books
export function getUserWant(name: string) {
    if (name === '') {
        name = '__normal'
    }
    return axios.get('/user/' + name + '/want/').then((response) => {
        return response.data;
    })
}

export function getUserOrder(name: string) {
    if (name === '') {
        name = '__normal'
    }
    return axios.get('/user/getorder/' + name + '/').then((response) => {
        return response.data;
    })
}

// Get Recommend books
export function getSearchResult(name: string) {
    if (name === '') {
        name = '__normal'
    }
    return axios.get('/server/search/' + name + '/').then((response) => {
        return response.data;
    })
}

// Get Book Image
export function getBookImg(timestamp: string) {
    return axios.get('/img/' + timestamp)
}

export default axios;