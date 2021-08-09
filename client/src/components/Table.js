import React, {useState, useContext} from 'react'
import {AuthContext} from "../context/AuthContext";
import dateFormat from 'dateformat';
import {ModalComp} from './Modal'
import {useMessage} from "../hooks/message.hook";


export const MyTable = (props) => {
    const auth = useContext(AuthContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState('')
    const [isOwner, setIsOwner] = useState()
    const [buttonLink, setButtonLink] = useState()
    const message = useMessage()

    const addModalContext = {
        id: null,
        title: 'Task name',
        description: 'Task description',
        priority: 'medium',
        endingAt: dateFormat(new Date(), 'yyyy-mm-dd'),
        responsible: auth.userId,
        status: 'toImplementation',
    }
    const [modalContext, setModalContext] = useState(addModalContext)

    const convertStatus = (status) => {
        switch (status) {
            case 'toImplementation':
                return 'К выполнению'
            case 'inProgress':
                return 'Выполняется'
            case 'completed':
                return 'Выполнено'
            case 'canceled':
                return 'Отменено'
            default: return
        }
    }

    const convertPriority = (priority) => {
        switch (priority) {
            case 'high':
                return 'Высокий'
            case 'medium':
                return 'Средний'
            case 'low':
                return 'Низкий'
            default: return
        }
    }

    const getStrColor = (status, endingAt) => {
        switch (status) {
            case 'completed':
                return 'green lighten-3'
            case 'inProgress':
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
            message('You have no permission')
            return
        }

        Object.keys(props.tableData).forEach(key => {
            if (Number(props.tableData[key].id) === Number(task.id)) {
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
        setModalIsOpen(true)
    }


    const renderHeader = () => {
        if (!props.tableData.length) {
            return <th>No data found</th>
        }

        return props.tableHeaders.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return !!props.tableData.length && props.tableData.map(
            ({id, title, description, priority, endingAt, updatedAt, responsible, status, creator}) => {
                const taskData = {id, title, description, priority, endingAt, updatedAt, responsible, status, creator}
                return (
                    <tr key={id} onClick={() => editTR(taskData)}
                        className={getStrColor(status, endingAt)}>
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