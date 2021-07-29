import React from 'react'
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, userId, userName, userMiddleName, login, logout} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)
    return (
        <AuthContext.Provider value={{
            token,
            userId,
            userName,
            userMiddleName,
            login,
            logout,
            isAuth
        }}>
            <Router>
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>

  )
}

export default App;
