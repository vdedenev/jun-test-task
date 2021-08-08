import {createContext} from 'react'

function nothing() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    userFirstName: null,
    userSecondName: null,
    userMiddleName: null,
    login: nothing,
    logout: nothing,
    isAuth: false,
    loginReady: false
})