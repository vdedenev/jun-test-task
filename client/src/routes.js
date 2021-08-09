import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {TaskPage} from "./pages/TaskPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuth => {
    if (isAuth){
        return (
            <Switch>
                <Route exact path="/task">
                        <TaskPage />
                </Route>

                <Redirect to="/task?group=3"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/auth/login">
                <AuthPage />
            </Route>
            <Redirect to="/auth/login"/>
        </Switch>
    )
}