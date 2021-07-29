import {useState, useCallback, useEffect} from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userSecondName, setUserSecondName] = useState(null)
    const [userMiddleName, setUserMiddleName] = useState(null)

    const login = useCallback((jwtToken, id, name, midName) => {
        setToken(jwtToken)
        setUserId(id)
        setUserSecondName(name)
        setUserMiddleName(midName)

        localStorage.setItem('userData', JSON.stringify({
            token: jwtToken,
            userId: id,
            userSecondName: name,
            userMiddleName: midName
        }));
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserSecondName(null)
        setUserMiddleName(null)
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))

        if (data && data.token){
            login(data.token, data.userId, data.userSecondName, data.userMiddleName)
        }
    }, [login])


    return {login, logout, token, userId, userSecondName, userMiddleName}
}