import React from "react";
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
                    <img src="images/road.jpg" className="img_logo" alt=""
                         onClick={() => window.location.href = 'Homepage'}/>
                </div>
                <div>
                    <button className="login" onClick={() => window.location.href = '#'}>
                        <span>길찾기</span>
                        <CiLocationOn/>
                    </button>
                </div>
                <div>
                    <button className="login" onClick={() => window.location.href = '#'}>
                        <span>더보기</span>
                        <CiCircleMore/>
                    </button>
                </div>

            </div>
            <div className="register">
                <hr/>
                <div>
                    <button className="login" onClick={() => window.location.href = '#'}>
                        <span>로그인</span>
                        <IoIosLogIn/>
                    </button>
                </div>
                <div>
                    <button className="join" onClick={() => window.location.href = 'Admin_data'}>
                        <span>회원가입</span>
                        <FaRegUserCircle/>
                    </button>
                </div>
            </div>


        </sidebar>
    );
};

export default Sidebar;
