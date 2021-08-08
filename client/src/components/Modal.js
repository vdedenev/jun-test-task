import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-modal'
import Select from 'react-select'
import StyledInput from './StyledInput';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const ModalComp = (props) => {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState(props.rowData)
    const {loading, req, err, clearErr} = useHttp()

    //const responsibleOptions = props.responsibleOptions

    useEffect( () => {
        setForm(props.rowData)
    }, [props.rowData])

    const priorityOptions = [
        {value: 3, label: 'Высокий'},
        {value: 2, label: 'Средний'},
        {value: 1, label: 'Низкий'},
    ]

    const statusOptions = [
        {value: 4, label: 'К выполнению'},
        {value: 3, label: 'Выполняется'},
        {value: 2, label: 'Выполнено'},
        {value: 1, label: 'Отменено'},
    ]

    Modal.setAppElement(document.getElementById('modalEle'))

    const changeHandler = e => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const selectChangeHandler = (opt, ctx) => {
        setForm({...form, [ctx.name]:opt.value})
    }

    const sendButtonHandler = async () => {
        try {
            const sendData = await req(`/task/${props.buttonLnk}`, 'POST', {...form, creator: auth.userId}, {
                Authorization: `Bearer ${auth.token}`
            })
            props.rerender()
            props.onClose()
        }
        catch (e) {
            //
        }
    }

    const modalStyle = {
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

    return (
        <Modal
            id='modalEle'
            isOpen={props.visible}
            style={modalStyle}
            onRequestClose={props.onClose}
            contentLabel='myModal'>
            <div className='row' style={{display: 'inline-block', width: '100%'}}>
                <div className=''
                     style={{
                         textAlign: 'right',
                         marginTop: '-27px',
                         marginRight: '-10px',
                         fontSize: 40,
                         color: '#000000'}}>
                    <i
                        style={{cursor: 'pointer'}}
                        onClick={props.onClose}>
                        X
                    </i>
                </div>
                <h4 style={{
                    textAlign: 'left',
                    height: '100%'
                }}>{props.header}</h4>
            </div>
            <div className="input-field">
                <StyledInput
                    readOnly={props.isOwner}
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={changeHandler}
                />
                <label htmlFor="Title" className="light-blue-text active">Title</label>
            </div>
            <div className="input-field">
                <StyledInput
                    readOnly={props.isOwner}
                    id="description"
                    name="description"
                    type="text"
                    value={form.description}
                    onChange={changeHandler}
                />
                <label htmlFor="description" className="light-blue-text active">Description</label>
            </div>
            <div className="input-field">
                <StyledInput
                    readOnly={props.isOwner}
                    id="endingAt"
                    name="endingAt"
                    type="date"
                    value={form.endingAt}
                    onChange={changeHandler}
                />
                <label htmlFor="endingAt" className="light-blue-text active">Ending At</label>
            </div>
            <div className="input-field">
                <Select
                    isDisabled={props.isOwner}
                    name='priority'
                    options={priorityOptions}
                    value={priorityOptions.find(obj => obj.value === form.priority)}
                    onChange={selectChangeHandler}
                />
                <label style={{paddingBottom: 50}} htmlFor="priority" className="light-blue-text active">Priority</label>
            </div>
            <div className="input-field">
                <Select
                    name='status'
                    options={statusOptions}
                    value={statusOptions.find(obj => obj.value === form.status)}
                    onChange={selectChangeHandler}
                />
                <label style={{paddingBottom: 50}} htmlFor="status" className="light-blue-text active">Status</label>
            </div>
            <div className="input-field">
                <Select
                    isDisabled={props.isOwner}
                    name='responsible'
                    options={props.responsibleOptions}
                    value={props.responsibleOptions.find(obj => obj.value === form.responsible)}
                    onChange={selectChangeHandler}
                />
                <label style={{paddingBottom: 50}} htmlFor="responsible" className="light-blue-text active">Responsible</label>
            </div>
            <button
                style={{float: 'right'}}
                className="btn cyan darken-2"
                onClick={sendButtonHandler}
                disabled={loading}
            >Send
            </button>
        </Modal>
    )
}