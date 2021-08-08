import React, {useState} from 'react'
import {B} from "react-select/dist/index-4bd03571.esm";


export const Test = (props) => {
    const [name, setName] = useState(props.startval)

    const changeHandler = event => {
        setName(event.target.value)
    }

    return (
        <>
            <h1>hello, {name}</h1>
            <input
                style={{paddingLeft: 5, marginTop: 5}}
                placeholder="Title"
                id="title"
                name="title"
                type="text"
                onChange={changeHandler}
            />
        </>
    )

}