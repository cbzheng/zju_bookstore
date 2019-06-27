import * as React from 'react'

export interface User {
    user_name: string
    login : boolean
}

const UserContext = React.createContext({
    userName: '',
    isLogin: false
});

export default UserContext;