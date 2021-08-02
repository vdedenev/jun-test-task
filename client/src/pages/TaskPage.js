import React, {useContext} from 'react'
import {AuthContext} from "../context/AuthContext";
import 'materialize-css'
import {Navbar} from "../components/Navbar";
import "../components/Dropdown";
import {useHttp} from "../hooks/http.hook";
import {MyTable} from "../components/Table";



export const TaskPage = () => {
    const auth = useContext(AuthContext)
    const {loading, req, err, clearErr} = useHttp()

    return(
        <>
        <Navbar/>
        <MyTable/>
        </>

    )
}