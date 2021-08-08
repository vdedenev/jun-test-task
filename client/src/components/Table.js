import React, {useState, useEffect, useContext, useCallback} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./Loader";
import {useLocation} from "react-router-dom";
import dateFormat from 'dateformat';
import Modal from 'react-modal'
import {MySelect} from "./Select";
import {header} from "express-validator";
import {ModalComp} from './Modal'


export const MyTable = (props) => {
    const queryLink = useLocation().search;
    const grouping = new URLSearchParams(queryLink).get('group')
    const auth = useContext(AuthContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState('')
    const [isOwner, setIsOwner] = useState()
    const [buttonLink, setButtonLink] = useState()
    const [readyData, setReadyData] = useState(false)

    const addModalContext = {
        id: null,
        title: 'Task name',
        description: 'Task description',
        priority: 2,
        endingAt: dateFormat(new Date(), 'yyyy-mm-dd'),
        responsible: auth.userId,
        status: 4,
    }
    const [modalContext, setModalContext] = useState(addModalContext)

    // useEffect(() => {
    //     getResponsible()
    // }, [queryLink])
    //
    // if (loading){
    //     return <Loader/>
    // }


    // const getWorkers = async () => {
    //     try {
    //         const data = await req(`/user/${auth.userId}`, 'GET', null, {
    //             Authorization: `Bearer ${auth.token}`
    //         })
    //         form.workers(data)
    //         console.log(`dataWorkers: ${data}`)
    //         console.log(`workers: ${form}`)
    //     } catch (e) {
    //     }
    // }

    // const getData =  async () => {
    //     try {
    //         const data = await req(`/task${queryLink}`, 'GET', null, {
    //             Authorization: `Bearer ${auth.token}`
    //         })
    //         const data2 = await req(`/user/${auth.userId}`, 'GET', null, {
    //             Authorization: `Bearer ${auth.token}`
    //         })
    //
    //         console.log(`task data: $${data}`)
    //         setForm({workers: data2})
    //         setTasks(data)
    //         console.log(`data_workers: ${form.workers}`)
    //     } catch (e) {
    //     }
    // }


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


    // const renderHeader = () => {
    //     if(Tasks.length === 0)
    //         return <th>No data found</th>
    //     let headerElement = []
    //
    //     if(grouping === '3') {
    //         headerElement = ['title', 'description', 'priority', 'ending at', 'updated at','responsible', 'status']
    //     }
    //     else {
    //         headerElement = ['title', 'description','priority', 'ending at','responsible', 'status']
    //     }
    //     return headerElement.map((key, index) => {
    //         return <th key={index}>{key.toUpperCase()}</th>
    //     })
    // }
    //
    // const getStrColor = (status, endingAt) =>{
    //     switch(status) {
    //         case 2: {
    //             return 'green lighten-3'
    //         }
    //         case 3:{
    //             if (dateFormat(Date(), 'yyyy-mm-dd') > endingAt){
    //                 return 'red lighten-3'
    //             }
    //             return 'grey lighten-1'
    //         }
    //         default: return 'grey lighten-1'
    //     }
    // }
    // const renderSelectOptions = () => {
    //     console.log(`worki: ${form.workers}`)
    //     if (form.workers.length === 0)
    //         form.workers("No data")
    //     console.log(`Workers: ${form.workers[0]}`)
    //     return form.workers && form.workers.map(({id, firstName, secondName}) => {
    //         return (
    //             <option name={id} value={id}> {secondName} {firstName}</option>
    //         )
    //     })
    // }
    // const renderBody = () => {
    //     if (Tasks.length === 0)
    //         return <th>No data found</th>
    //     else if (grouping === '3') {
    //         return Tasks && Tasks.map((
    //             {
    //                 id,
    //                 title,
    //                 description,
    //                 priority,
    //                 endingAt,
    //                 updatedAt,
    //                 responsible,
    //                 status
    //             }) => {
    //             return (
    //                 <tr key={id} onClick={() => editTR(id)} className={getStrColor(Number(status), endingAt)}>
    //                     <td key={title}>{title}</td>
    //                     <td key={description}>{description}</td>
    //                     <td key={priority}>{convertPriority(priority)}</td>
    //                     <td key={endingAt}>{dateFormat(endingAt, 'dd.mm.yyyy')}</td>
    //                     <td key={updatedAt}>{dateFormat(updatedAt, 'dd.mm.yyyy')}</td>
    //                     <td key={responsible}>{responsible.firstName} {responsible.secondName} {responsible.middleName}</td>
    //                     <td key={status}>{convertStatus(status)}</td>
    //                 </tr>
    //             )
    //         })
    //     } else {
    //         return Tasks && Tasks.map(({id, title, description, priority, endingAt, responsible, status}) => {
    //             return (
    //                 <tr key={id} onClick={() => editTR(id)}
    //                     className={getStrColor(Number(status), endingAt)}>
    //                     <td key={title}>{title}</td>
    //                     <td key={description}>{description}</td>
    //                     <td key={priority}>{convertPriority(priority)}</td>
    //                     <td key={endingAt}>{dateFormat(endingAt, 'dd.mm.yyyy')}</td>
    //                     <td key={responsible}>{responsible.firstName} {responsible.secondName} {responsible.middleName}</td>
    //                     <td key={status}>{convertStatus(status)}</td>
    //                 </tr>
    //             )
    //         })
    //     }
    // }
    // const customStyles = {
    //     content : {
    //         width: 750,
    //         height: 750,
    //         top                   : '50%',
    //         left                  : '50%',
    //         right                 : 'auto',
    //         bottom                : 'auto',
    //         marginRight           : '-50%',
    //         transform             : 'translate(-50%, -50%)'
    //     }
    // }
    //
    //
    // const editTR = (taskId) => {
    //     Object.keys(Tasks).forEach(key => {
    //         if (Number(Tasks[key].id) === Number(taskId)){
    //             setForm({
    //                 id: taskId,
    //                 title: Tasks[key].title,
    //                 description: Tasks[key].description,
    //                 endingAt: Tasks[key].endingAt,
    //                 priority: convertPriority(Tasks[key].priority),
    //                 status: convertStatus(Tasks[key].status),
    //                 responsible: Tasks[key].responsible.firstName,
    //                 workers: '',
    //             })
    //         }
    //     })
    //     setIsOpen(true)
    // }
    //
    //
    // const changeHandler = event => {
    //     setForm({...form, [event.target.name]:event.target.value})
    //     if (event.target.name === 'prioritySelector') {
    //       //  setSelectValue(form.priority)
    //     }
    //     else if (event.target.name === 'statusSelector'){
    //        // setStatusSelector(form.status)
    //     }
    // }
    // const selectChange = event =>{
    //    // setSelectValue(event.target.value)
    // }
    // if (loading) {
    //     return <Loader/>
    // }


    const renderHeader = () => {
        if (!props.tableData.length) {
            return <th>No data found</th>
        }

        return props.tableHeaders.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    //edit statuses
    const getStrColor = (status, endingAt) => {
        switch (status) {
            case 2:
                return 'green lighten-3'
            case 3:
                if (dateFormat(Date(), 'yyyy-mm-dd') > endingAt) {
                    return 'red lighten-3'
                }
                return 'grey lighten-1'
            default:
                return 'grey lighten-1'
        }
    }

    const checkIdInResponsibleArr = (resId) => {
        return props.responsible.find(obj => obj.value === resId)
    }

    const checkEditFieldsPermission = (taskCreatorId) => {
        return (taskCreatorId === auth.userId || checkIdInResponsibleArr(taskCreatorId))
    }

    const editTR = (task) => {
        if (!checkIdInResponsibleArr(task.responsible.id)) {
            //msg
            console.log('hui tam')
            return
        }

        Object.keys(props.tableData).forEach(key => {
            if (Number(props.tableData[key].id) === Number(task.id)){
                setModalContext({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    endingAt: task.endingAt,
                    responsible: task.responsible,
                    status: task.status,
                })
            }
        })
        setModalHeader(`Edit task id=${task.id}`)
        setIsOwner(!checkEditFieldsPermission(task.creator.id))
        setButtonLink(`save?id=${task.id}`)
        // console.log(modalContext)
        // console.log(modalHeader)
        // console.log(isOwner)
        // console.log(buttonLink)
        setModalIsOpen(true)
    }

    const renderBody = () => {
        return !!props.tableData.length && props.tableData.map(
            ({id, title, description, priority, endingAt, updatedAt, responsible, status, creator}) => {
                const taskData = {id, title, description, priority, endingAt, updatedAt, responsible, status, creator}
                return (
                    <tr key={id} onClick={() => editTR(taskData)}
                        className={getStrColor(Number(status), endingAt)}>
                        <td key='id'>{id}</td>
                        <td key='title'>{title}</td>
                        <td key='description'>{description}</td>
                        <td key='priority'>{convertPriority(priority)}</td>
                        <td key='endingAt'>{dateFormat(endingAt, 'dd.mm.yyyy')}</td>
                        <td key='updatedAt'>{dateFormat(updatedAt, 'dd.mm.yyyy HH:MM')}</td>
                        <td key='responsible'>{responsible.firstName} {responsible.secondName} {responsible.middleName}</td>
                        <td key='status'>{convertStatus(status)}</td>
                    </tr>
                )
            }
        )
    }

    const closeModalHandler = () => {
        setModalIsOpen(false)
    }
    //
    // useEffect( () => {
    //     setModalContext(addModalContext)
    // }, [closeModalHandler])


        return (
            <div>
                <button
                    style={{marginLeft: 10, marginTop: 10}}
                    id='addTask'
                    className="btn modal-trigger cyan darken-2"
                    onClick={() => {
                        setModalContext(addModalContext)
                        setModalHeader('Add task')
                        setIsOwner(false)
                        setButtonLink('save')
                        setModalIsOpen(true)
                    }}>
                    Add Task
                </button>

                <table
                    style={{marginTop: 5, marginLeft: 10, width: '99%'}}
                    id='tasks'>
                    <thead>
                    <tr className="cyan darken-3">{renderHeader()}</tr>
                    </thead>
                    <tbody>
                    {renderBody()}
                    </tbody>
                </table>
                <ModalComp
                    visible={modalIsOpen}
                    onClose={() => closeModalHandler()}
                    header={modalHeader}
                    isOwner={isOwner}
                    rowData={modalContext}
                    responsibleOptions={props.responsible}
                    buttonLnk={buttonLink}
                    rerender={props.rerender}
                >
                </ModalComp>
            </div>
        )
    }