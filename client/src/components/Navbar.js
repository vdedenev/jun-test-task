import React, {useContext, useRef, useState,} from 'react'
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import 'materialize-css'
import {useDetectOutsideClick} from "../hooks/dropmenu.hook";
import Modal from 'react-modal'

export const Navbar = () => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const onClick = () => setIsActive(!isActive);

    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/login')
    }

    const customStyles = {
        content: {
            top: '20%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper blue-grey lighten-1">
                    <button
                        style={{marginLeft: 10}}
                        onClick={onClick}
                        className="btn cyan darken-2">
                        <span>Self (endDate grouping)</span>
                    </button>
                    <nav
                        ref={dropdownRef}
                        className={`menu ${isActive ? "active" : "inactive"}`}
                    >
                        <ul>
                            <li><a
                                href='/task?grouping=self&lapse=today'>
                                Today
                            </a></li>
                            <li><a
                                href='/task?grouping=self&lapse=thisweek'>
                                This week
                            </a></li>
                            <li><a
                                href='/task?grouping=self&lapse=nextweek'>
                                Past week+
                            </a></li>
                        </ul>
                    </nav>
                    <a
                        style={{marginLeft: 10}}
                        className="btn cyan darken-2"
                        href='/task?grouping=subordinate'>
                        Subordinate
                    </a>
                    <a
                        style={{marginLeft: 10}}
                        className="btn cyan darken-2"
                        href='/task?grouping=all'>
                        All (Updated order)
                    </a>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li
                            style={{marginRight: 10}}>
                            Здравствуйте, {auth.userSecondName} {auth.userMiddleName}
                        </li>
                        <li><a
                            className="btn cyan darken-2"
                            href='/'
                            onClick={logoutHandler}>logout
                        </a></li>
                    </ul>
                </div>
            </nav>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel="Example Modal">

                <h4>Hello</h4>
                <button onClick={() => setIsOpen(false)}>close</button>
                <div>I am a modal</div>
                <form>
                    <input/>
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
    )
}