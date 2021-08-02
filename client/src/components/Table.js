import React, {useState, useEffect, useContext, useCallback} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {useLocation} from "react-router-dom";
import dateFormat from 'dateformat';
import Modal from 'react-modal'
import {MySelect} from "./Select";


export const MyTable = () => {
    Modal.setAppElement(document.getElementById('modalEle'))
    const queryLink = useLocation().search;
    const grouping = new URLSearchParams(queryLink).get('group')
    const auth = useContext(AuthContext)
    const {req, loading} = useHttp()
    const [Tasks, setTasks] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    //const [selectValue, setSelectValue] = useState('3')
    //const [statusSelector, setStatusSelector] = useState('1')
    const [form, setForm] = useState({
        id: '',
        title: '',
        description: '',
        endingAt: '',
        priority: '',
        status: '',
        responsible: '',
        workers: [],
    })


    useEffect(() => {
        getData()
    }, [])

    const getWorkers = async () => {
        try {
            const data = await req(`/user/${auth.userId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            form.workers(data)
            console.log(`dataWorkers: ${data}`)
            console.log(`workers: ${form}`)
        } catch (e) {
        }
    }

    const getData =  async () => {
        try {
            const data = await req(`/task${queryLink}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            const data2 = await req(`/user/${auth.userId}`, 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })

            console.log(`task data: $${data}`)
            setForm({workers: data2})
            setTasks(data)
            console.log(`data_workers: ${form.workers}`)
        } catch (e) {
        }
    }





    // priority - 3 высокий, 2 средний, 1 низкий
    // status - 4 к выполнению, 3 выполняется, 2 выполнено, 1 отменено
    const convertStatus = (status_id) => {
        switch (status_id) {
            case 4:
                return 'К выполнению'
            case 3:
                return 'Выполняется'
            case 2:
                return 'Выполнено'
            case 1:
                return 'Отменено'
        }
    }

    const convertPriority = (priority_id) => {
        switch (Number(priority_id)) {
            case 3:
                return 'Высокий'
            case 2:
                return 'Средний'
            case 1:
                return 'Низкий'
        }
    }

    // const removeData = (id) => {
    //
    //     axios.delete(`${URL}/${id}`).then(res => {
    //         const del = employees.filter(employee => id !== employee.id)
    //         setEmployees(del)
    //     })
    // }

    // const renderSelect = () => {
    //     if (Workers.length === 0)
    //         return <th>No data found</th>
    //     let selectOptions = ['id', 'firstName', 'secondName', 'middleName']
    //     return Workers.map(({id, firstName, secondName, middleName}) => {
    //         return <select name={'workerSelector'} value={id}>{secondName} {middleName}</select>
    //     })
    // }



    const renderHeader = () => {
        if(Tasks.length === 0)
            return <th>No data found</th>
        let headerElement = []

        if(grouping === '3') {
            headerElement = ['title', 'description', 'priority', 'ending at', 'updated at','responsible', 'status']
        }
        else {
            headerElement = ['title', 'description','priority', 'ending at','responsible', 'status']
        }
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const getStrColor = (status, endingAt) =>{
        switch(status) {
            case 2: {
                return 'green lighten-3'
            }
            case 3:{
                if (dateFormat(Date(), 'yyyy-mm-dd') > endingAt){
                    return 'red lighten-3'
                }
                return 'grey lighten-1'
            }
            default: return 'grey lighten-1'
        }
    }
    const renderSelectOptions = () => {
        console.log(`worki: ${form.workers}`)
        if (form.workers.length === 0)
            form.workers("No data")
        console.log(`Workers: ${form.workers[0]}`)
        return form.workers && form.workers.map(({id, firstName, secondName}) => {
            return (
                <option name={id} value={id}> {secondName} {firstName}</option>
            )
        })
    }
    const renderBody = () => {
        if (Tasks.length === 0)
            return <th>No data found</th>
        else if (grouping === '3') {
            return Tasks && Tasks.map((
                {
                    id,
                    title,
                    description,
                    priority,
                    endingAt,
                    updatedAt,
                    responsible,
                    status
                }) => {
                return (
                    <tr key={id} onClick={() => editTR(id)} className={getStrColor(Number(status), endingAt)}>
                        <td key={title}>{title}</td>
                        <td key={description}>{description}</td>
                        <td key={priority}>{convertPriority(priority)}</td>
                        <td key={endingAt}>{dateFormat(endingAt, 'dd.mm.yyyy')}</td>
                        <td key={updatedAt}>{dateFormat(updatedAt, 'dd.mm.yyyy')}</td>
                        <td key={responsible}>{responsible.firstName} {responsible.secondName} {responsible.middleName}</td>
                        <td key={status}>{convertStatus(status)}</td>
                    </tr>
                )
            })
        } else {
            return Tasks && Tasks.map(({id, title, description, priority, endingAt, responsible, status}) => {
                return (
                    <tr key={id} onClick={() => editTR(id)}
                        className={getStrColor(Number(status), endingAt)}>
                        <td key={title}>{title}</td>
                        <td key={description}>{description}</td>
                        <td key={priority}>{convertPriority(priority)}</td>
                        <td key={endingAt}>{dateFormat(endingAt, 'dd.mm.yyyy')}</td>
                        <td key={responsible}>{responsible.firstName} {responsible.secondName} {responsible.middleName}</td>
                        <td key={status}>{convertStatus(status)}</td>
                    </tr>
                )
            })
        }
    }
    const customStyles = {
        content : {
            width: 750,
            height: 750,
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    }


    const editTR = (taskId) => {
        Object.keys(Tasks).forEach(key => {
            if (Number(Tasks[key].id) === Number(taskId)){
                setForm({
                    id: taskId,
                    title: Tasks[key].title,
                    description: Tasks[key].description,
                    endingAt: Tasks[key].endingAt,
                    priority: convertPriority(Tasks[key].priority),
                    status: convertStatus(Tasks[key].status),
                    responsible: Tasks[key].responsible.firstName,
                    workers: '',
                })
            }
        })
        setIsOpen(true)
    }


    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value})
        if (event.target.name === 'prioritySelector') {
          //  setSelectValue(form.priority)
        }
        else if (event.target.name === 'statusSelector'){
           // setStatusSelector(form.status)
        }
    }
    const selectChange = event =>{
       // setSelectValue(event.target.value)
    }
    if (loading) {
        return <Loader/>
    }


    return (
        <>
            <table
                style={{marginTop:5, marginLeft: 10, width: '99%'}}
                id='tasks'>
                <thead>
                <tr className="cyan darken-3">{renderHeader()}</tr>
                </thead>
                <tbody>
                {renderBody()}
                </tbody>
            </table>
            <Modal
                id='modalEle'
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={() => setIsOpen(false)}
                contentLabel='Edit task modal'>
                <div className='row' style={{display: 'inline-block', width: '100%'}}>
                    <div className=''
                         style={{
                             textAlign: 'right',
                             marginTop: '-27px',
                             marginRight: '-10px',
                             fontSize: 40,
                             color: 'gray'}}
                         onClick={ () => setIsOpen(false)}><a style={{color: '#000000'}} href=''>X</a>
                    </div>
                    <h4 style={{
                        textAlign: 'left',
                        height: '100%'
                    }}>Edit task</h4>
                </div>
                <div className="input-field">
                    <input
                        style={{paddingLeft: 5, marginTop: 5}}
                        placeholder="Title"
                        id="title"
                        name="title"
                        type="text"
                        value={form.title}
                        onChange={changeHandler}
                    />
                    <label htmlFor="Title" className="light-blue-text active">Title</label>
                </div>
                <div className="input-field">
                    <input
                        style={{paddingLeft: 5, marginTop: 5}}
                        placeholder="Description"
                        id="description"
                        name="description"
                        type="text"
                        value={form.description}
                        onChange={changeHandler}
                    />
                    <label htmlFor="description" className="light-blue-text active">Description</label>
                </div>
                <div className="input-field">
                    <input
                        style={{paddingLeft: 5, marginTop: 5}}
                        placeholder="endingat"
                        id="endingat"
                        name="endingat"
                        type="date"
                        value={form.endingAt}
                        onChange={changeHandler}
                    />
                    <label htmlFor="endingat" className="light-blue-text active">Ending At</label>
                </div>

                <div className="input-field">
                    <select
                        name='workerselector'
                        value={form.workers.id}
                        onChange={changeHandler}
                    >
                        {renderSelectOptions}
                    </select>
                    <label htmlFor="workerSelector" className="light-blue-text active">Responsible</label>
                </div>
            </Modal>
        </>
    )
}