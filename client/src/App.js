import React from 'react'
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Loader} from "./components/Loader";

function App() {
    const {
        token,
        userId,
        userFirstName,
        userSecondName,
        userMiddleName,
        login,
        logout,
        localAuthReady,
        loginReady
    } = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!localAuthReady) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token,
            userId,
            userFirstName,
            userSecondName,
            userMiddleName,
            login,
            logout,
            isAuth,
            loginReady
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
