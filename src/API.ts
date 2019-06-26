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
    }).then((response)=>{
        if (response.data.result) {
            return username;
        } else {
            return ""
        }
    }).catch(error=>{
        return ""
    });

}

// Sign up request
export function signup(username: string, email:string, password: string) {

    return axios.post('/signup/', {
        username: username,
        email: email,
        password: password
    }).then((response)=>{
            console.log(response.data);
            return response.data.result
        }).catch(reason => {
            return false
    });

}

// new Product
export interface Product {
    book_name : string,
    originPrice : Number,
    curPrice : Number,
    image : File,
    book_class : string,
    description : string,
    seller: string,
    timestamp: string
}

export function uploadProductInfo(book : Product) {
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
    }).then((response)=>{
        return !!response.data.result;
    })
}

// Get Recommend books
export function getRecommendBooks(name: string) {
    if (name === ''){
        name = '__normal'
    }
    return axios.get('/recommend/' + name).then((response)=>{
        return response.data;
    })
}

// Get Book Image
export function getBookImg(timestamp: string) {
    return axios.get('/img/'+timestamp)
}

export default axios;