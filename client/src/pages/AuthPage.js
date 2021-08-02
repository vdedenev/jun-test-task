import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import 'materialize-css'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, req, err, clearErr} = useHttp()
    const [form, setForm] = useState({
        login: '',
        pass: ''
    })

    useEffect(() => {
        message(err)
        clearErr()
    }, [err, clearErr, message])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await req('/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.userName, data.userMiddleName)
        } catch(e){

        }
    }

    const keypressHandler = event => {
        if (event.key === 'Enter')
            loginHandler()
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s6 offset-s3">
                    <h1>Auth page</h1>
                    <div className="card blue-grey lighten-1">
                        <div className="card-content white-text">
                            <span className="card-title" style={{textAlign: "center"}}>Sign in</span>
                            <div style={{marginTop: 50}}>
                                <div className="input-field">
                                    <input
                                        style={{paddingLeft: 5, marginTop: 5}}
                                        placeholder="Login"
                                        id="login"
                                        name="login"
                                        type="text"
                                        value={form.login}
                                        onChange={changeHandler}
                                        onKeyPress={keypressHandler}
                                    />
                                        <label htmlFor="login" className="light-blue-text">Login</label>
                                </div>

                                <div className="input-field">
                                    <input
                                        placeholder="Password"
                                        id="pass"
                                        name="pass"
                                        type="password"
                                        value={form.pass}
                                        onChange={changeHandler}
                                        onKeyPress={keypressHandler}
                                    />
                                    <label htmlFor="pass" className="light-blue-text">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action" style={{textAlign: "center"}}>
                            <button
                                className="btn cyan darken-2"
                                onClick={loginHandler}
                                onKeyPress={keypressHandler}
                                disabled={loading}
                            >
                                Send form
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}