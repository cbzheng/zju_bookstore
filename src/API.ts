import axios, {AxiosResponse} from 'axios'
import {async} from "q";


export async function login(username: string, password: string)  {

    axios({
        method: 'post',
        url: '/login/',
        data: {
            username: username,
            password: password
        }
    });

}

// Sign up request
export async function signup(username: string, email:string, password: string) : Promise<boolean> {

    axios.post('/signup/', {
        username: username,
        email: email,
        password: password
    }).then((response)=>{
            console.log(response.data);
            return response.data.result
        }).catch(reason => {
            return false
    });

    return false
}

export default axios;