import React, {useState} from "react";
import axios from "axios";

import './Sidebar.css';
import {IoIosLogIn} from "react-icons/io";
import {FaRegUserCircle} from "react-icons/fa";
import {CiLocationOn} from "react-icons/ci";
import {CiCircleMore} from "react-icons/ci";

const Sidebar = () => {
    return (
        <sidebar className="sidebar">
            <div className="menu">
                <div>
                    <img src="images/road.jpg" className="img_logo" alt="" onClick={() => {
                        axios.post("http://localhost:8000/dorosee/", {
                            title: "Homepage",
                            content: "Search, Map"
                        })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }}>
                    </img>
                </div>
                <div>
                    <button className="login" onClick={() => {
                        axios.post("http://localhost:8000/dorosee/", {
                            title: "login",
                            content: "login"
                        })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }}>
                        <span>길찾기</span>
                        <CiLocationOn/>
                    </button>
                </div>
                <div>
                    <button className="login" onClick={() => {
                        axios.post("http://localhost:8000/dorosee/", {
                            title: "login",
                            content: "login"
                        })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }}>
                        <span>더보기</span>
                        <CiCircleMore/>
                    </button>
                </div>

            </div>
            <div className="register">
                <hr/>
                <div>
                    <button className="Admin_data" onClick={() => {
                        axios.post("http://localhost:8000/dorosee/admin/data/", {
                            title: "Admin_data",
                            content: "data of pothole"
                        })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }}>
                        <span>Admin_data</span>
                        <IoIosLogIn/>
                    </button>
                </div>
                <div>
                    <button className="Admin_manage" onClick={() => {
                        axios.post("http://localhost:8000/dorosee/admin/manage/", {
                            title: "Admin_manage",
                            content: "manage data"
                        })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    }}>
                        <span>Admin_manage</span>
                        <FaRegUserCircle/>
                    </button>
                </div>
            </div>


        </sidebar>
    )
        ;
};

export default Sidebar;
