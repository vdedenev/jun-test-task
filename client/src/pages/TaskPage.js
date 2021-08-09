import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/AuthContext"
import 'materialize-css'
import {Navbar} from "../components/Navbar"
import "../components/Dropdown"
import {useHttp} from "../hooks/http.hook"
import {MyTable} from "../components/Table"
import {Test} from "../components/Test"
import {ModalComp} from "../components/Modal";
import dateFormat from 'dateformat'
import {Redirect, useHistory, useLocation} from "react-router-dom";
import {Loader} from "../components/Loader";
import {MyPagination, Pagination} from "../components/Pagination";


export const TaskPage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const queryLink = useLocation().search;
    const {loading, req} = useHttp()
    const [tasks, setTasks] = useState([])
    const [rerenderTable, setRerenderTable] = useState(1)
    const [responsible, setResponsible] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPages, setMaxPages] = useState(20)

    const getData = async () => {
        try {
            const data = await req(`/task${queryLink}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setTasks(data)
        } catch (e) {
            //
        }
    }

    const getResponsible = async () => {
        try {
            const data = await req(`/user/${auth.userId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            if (data.length === 0) {
                setResponsible([{value: auth.userId, label: auth.userFirstName}])
            } else {
                const resps = []
                Object.keys(data).forEach(key => {
                    resps.push({value: data[key].id, label: data[key].firstName})
                })
                setResponsible(resps)

            }
        } catch (e) {
            //
        }
    }

    const getCurrentPage = () => {
        if (queryLink) {
            const pageNum = Number(new URLSearchParams(queryLink).get('page'))
            if (pageNum) {
                pageNum > maxPages ? setCurrentPage(0) : setCurrentPage(pageNum)
            } else
                setCurrentPage(1)
        } else {
            setCurrentPage(1)
        }
    }

    useEffect(() => {
        if (!auth.loginReady)
            return <Loader/>

        console.log('useeffect render')
        getData()
        getResponsible()
        getCurrentPage()

    }, [auth.loginReady, req, rerenderTable])


    if (loading)
        return <Loader/>

    return (
        <>
            <Navbar/>
            {!loading && !!responsible.length && !!tasks && <MyTable
                tableHeaders={['id', 'title', 'description', 'priority', 'ending at', 'updated at', 'responsible', 'status']}
                tableData={tasks}
                responsible={responsible}
                rerender={() => {setRerenderTable(rerenderTable + 1)}}
            />}
            <MyPagination
                rerender={() => setRerenderTable(rerenderTable + 1)}
                maxPages={maxPages}
                currentPage={currentPage}
            />
        </>
    )
}