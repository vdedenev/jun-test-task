import {useState, useCallback, useEffect} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [localAuthReady, setLocalAuthReady] = useState(false) // for wait async check isAuth
    const [loginReady, setLoginReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userFirstName, setUserFirstName] = useState(null)
    const [userSecondName, setUserSecondName] = useState(null)
    const [userMiddleName, setUserMiddleName] = useState(null)

    const login = useCallback((jwtToken, id, firstName, name, midName) => {
        setToken(jwtToken)
        setUserId(id)
        setUserFirstName(firstName)
        setUserSecondName(name)
        setUserMiddleName(midName)

        localStorage.setItem('userData', JSON.stringify({
            token: jwtToken,
            userId: id,
            userFirstName: firstName,
            userSecondName: name,
            userMiddleName: midName
        }));

        setLoginReady(true)
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserFirstName(null)
        setUserSecondName(null)
        setUserMiddleName(null)
        localStorage.removeItem('userData')
        setLoginReady(false)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))

        if (data && data.token){
            login(data.token, data.userId, data.userFirstName, data.userSecondName, data.userMiddleName)
        }

        setLocalAuthReady(true)
    }, [login])


    return {login, logout, token, userId, userFirstName, userSecondName, userMiddleName, localAuthReady, loginReady}
}