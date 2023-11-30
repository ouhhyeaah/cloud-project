import React from 'react';
import "../css/Topbar.css";
import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import { BsPersonFill, BsHouse, BsBoxArrowInRight } from "react-icons/bs";
const TopBar = () => {

    const handleLogOut = () => {

        const [storageItems] = localStorage.getItem("email", "token" )
        console.log(storageItems)
    }

    return (
        <div className="topBar">
            <div className={"topbar-wrapper"}>
                <div className={"topbar-left"}>
                    <span className={"orange"}> GROUPE </span> 8
                </div>
                <div className={"topbar-mid"}>
                    <div className={"link-div"}>
                        <Link to={"/"} className={"link"}>
                            <BsHouse size={40}
                            />
                        </Link>
                    </div>
                    <div className={"link-div"}>
                        <Link to={"/profile"} className={"link"}
                        >
                            <BsPersonFill
                                size={40}
                            />
                        </Link>
                    </div>
                </div>
                <div className={"topbar-right"}>
                    <Link to={"/login"} onClick={handleLogOut}
                        className={"link"}
                    >
                        <BsBoxArrowInRight
                            size={40}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default TopBar;