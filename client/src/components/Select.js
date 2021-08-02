import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react'
import Select from 'react-select';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "./Loader";


export const MySelect = (params) => {
    const [owner, setOwner] = useState()
    const {req, loading} = useHttp()
    const auth = useContext(AuthContext)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    function handleClick() {
        forceUpdate();
    }

    const getWorkers = useCallback( async () => {
        try {
            const data = await req(`/user/${auth.userId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setOwner(data)
            console.log('123')
            if (data.length === 0)
                return {value: "No data", label: "No data"}
            return data && data.map(({id, firstName, secondName}) => {
                return (
                    {value: id, label: `${firstName} ${secondName}`}
                )
            })
        } catch (e) {
        }
    },[])



    if (loading) {
        return <Loader/>
    }

    const options = () => {
        console.log(`owneris : ${owner}`)
        if (owner.length === 0)
            setOwner("No data")
        return owner && owner.map(({id, firstName, secondName}) => {
            return (
                {value: id, label: `${firstName} ${secondName}`}
            )
        })
    }

    const handleChange = selectedOption => {
        setOwner(selectedOption)
    }

    return (
        <Select
            value={owner}
            onChange={handleChange}
            options={getWorkers()}
        />
    )
}