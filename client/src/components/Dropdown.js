import React, { useRef } from "react";
import {useDetectOutsideClick} from "../hooks/dropmenu.hook";

export const Dropdown = () => {

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div className="container">
            <div className="menu-container">
                <button onClick={onClick} className="menu-trigger">
                    <span>text</span>
                </button>
                <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                >
                    <ul>
                        <li>
                            <a href="#">Messages</a>
                        </li>
                        <li>
                            <a href="#">Trips</a>
                        </li>
                        <li>
                            <a href="#">Saved</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}