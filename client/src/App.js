import React from 'react'
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Loader} from "./components/Loader";

function App() {
    const {token, userId, userSecondName, userMiddleName, login, logout, ready} = useAuth()
    //console.log(token)
    //console.log(!!token)
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!ready){
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token,
            userId,
            userSecondName,
            userMiddleName,
            login,
            logout,
            isAuth
        }}>
            <>
            <Router>
                    {routes}
            </Router>
            </>
        </AuthContext.Provider>

  )
}

export default App;
