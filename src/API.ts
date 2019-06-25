import axios from 'axios'
import {async} from "q";


export async function login() {

    axios({
        method: 'post',
        url: '/login/',
        data: {
            username: 'Fred',
            password: 'Flintstone'
        },
        headers:{
            "Content-Type": "application/json"
        },
    });

}

export async function signup(username: string, email:string, password: string) {

    axios.post('/signup/', {
        username: username,
        email: email,
        password: password
    })

}

export default axios;