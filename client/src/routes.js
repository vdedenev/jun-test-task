import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {TaskPage} from "./pages/TaskPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuth => {
    if (isAuth){
        return (
            <Switch>
                <Route path="/task">
                    <TaskPage />
                </Route>
                <Route exact path="/">
                    <TaskPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path="/auth/login">
                <AuthPage />
            </Route>
            <Redirect to="/auth/login"/>
        </Switch>
    )
}