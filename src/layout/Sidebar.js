import React, {useState} from "react"
import './Sidebar.css'

import Side_button from '../components/Side_button'

import {CiLocationOn} from "react-icons/ci"
import {GiHole} from "react-icons/gi";

import {IoIosLogIn} from "react-icons/io"
import {IoIosLogOut} from "react-icons/io";
import {FaRegUserCircle} from "react-icons/fa"

import {FcStatistics} from "react-icons/fc";
import {MdManageSearch} from "react-icons/md";
// 마스터로 하고싶을때 마스터 아이디로 하고 유저 아이디는 지우든지 비회원은 아무거나고
const Sidebar = ({user_id = "1", master_id}) => {

    // 공통   버튼을 누르는건 여기 있고
    const common_menu = (
        <div className="menu">
            <a href="http://127.0.0.1:8000">
                <img
                    className="img_logo"
                    src="images/logo_Doro-See.png"
                    alt="Logo"/>
            </a>

            <Side_button
                label="길찾기"
                icon={CiLocationOn}
                endpoint="http://127.0.0.1:8000/navi"/>

            <Side_button
                label="포트홀 지도"
                icon={GiHole}
                endpoint="http://127.0.0.1:8000/navi/porthole"/>
        </div>
    )

    // 비회원, 회원, 관리자 구분 메뉴
    let settings_menu

    // 관리자일 때
    if (user_id === "" && master_id !== "") {
        settings_menu = (
            <div className="settings">
                <hr/>
                <Side_button
                    label="포트홀 통계"
                    icon={FcStatistics}
                    endpoint="http://localhost:3000/admin/data"/>

                <Side_button
                    label="포트홀 관리"
                    icon={MdManageSearch}
                    endpoint="http://localhost:3000/admin/manage"/>

                <Side_button
                    label="로그아웃"
                    icon={FaRegUserCircle}
                    endpoint="http://localhost:3000/"/>
            </div>
        )
    }

    // 회원일 때
    else if (user_id !== "" && master_id === "") {
        settings_menu = (
            <div className="settings">
                <hr/>
                <Side_button
                    label={user_id}
                    icon={FaRegUserCircle}
                    endpoint="http://localhost:3000/user"/>

                <Side_button
                    label="로그아웃"
                    icon={IoIosLogOut}
                    endpoint="http://localhost:3000/"/>
            </div>
        )

    } // 비회원일 때
    else {
        settings_menu = (
            <div className="settings">
                <hr/>
                <Side_button
                    label="로그인"
                    icon={IoIosLogIn}
                    endpoint="http://localhost:3000/login"/>

                <Side_button
                    label="회원가입"
                    icon={FaRegUserCircle}
                    endpoint="http://localhost:3000/signup"/>
            </div>
        )
    }

    return (
        <div className="sidebar">
            {common_menu}
            {settings_menu}
        </div>
    )
}

export default Sidebar
