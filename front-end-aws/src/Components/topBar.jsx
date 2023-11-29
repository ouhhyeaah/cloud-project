import React from 'react';
import "../css/Topbar.css";
import {Link} from 'react-router-dom';
import { BsPersonFill, BsHouse, BsBoxArrowInRight } from "react-icons/bs";
const topBar = () => {


    return (
        <div className="topBar">
            <div className={"topbar-wrapper"}>
                <div className={"topbar-left"}>
                    <span className={"orange"}> GROUPE </span> 8
                </div>
                <div className={"topbar-mid"}>
                    <div>
                        <Link to={"/"}>
                            <BsHouse size={40}/>
                        </Link>

                    </div>
                    <div>
                        <Link to={"/profile"}>
                            <BsPersonFill
                                size={40}
                            />
                        </Link>
                    </div>
                </div>
                <div className={"topbar-right"}>
                    <Link to={"/login"}>
                        <BsBoxArrowInRight
                            size={40}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default topBar;