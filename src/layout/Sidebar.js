import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Side_button from "../components/Side_button";

// menu icon
import { CiLocationOn } from "react-icons/ci";
import { GiHole } from "react-icons/gi";

// admin icon
import { FcStatistics } from "react-icons/fc";
import { MdManageSearch } from "react-icons/md";

// session icon
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar = () => {
    const user_id = sessionStorage.getItem("user_id");
    const master_id = sessionStorage.getItem("master_id");

    // 공통 메뉴
    const common_menu = (
        <div className="menu">
            <Link to="/">
                <img src="/images/logo_Doro-See.png" alt="Logo" className="img_logo" />
            </Link>

            <Side_button label="길찾기" icon={CiLocationOn} endpoint="/navi" />
            <Side_button label="포트홀 지도" icon={GiHole} endpoint="/navi/porthole" />
        </div>
    );

    // 사용자별 메뉴
    const settings_menu = master_id
        ? (
            // master_id가 있을 경우 관리자 메뉴 실행
            <div className="settings">
                <hr />
                <Side_button label="포트홀 통계" icon={FcStatistics} endpoint="/admin/data" />
                <Side_button label="포트홀 관리" icon={MdManageSearch} endpoint="/admin/manage" />
                <Side_button label="로그아웃" icon={FaRegUserCircle} isLogout={true} />
            </div>
        )
        : user_id
            ? (
                // master_id가 없고, user_id가 있을 경우 회원 메뉴 실행
                <div className="settings">
                    <hr />
                    <Side_button label={user_id} icon={FaRegUserCircle} endpoint="/user" />
                    <Side_button label="로그아웃" icon={IoIosLogOut} isLogout={true} />
                </div>
            )
            : (
                // 둘 다 없을 경우 비회원 메뉴 실행
                <div className="settings">
                    <hr />
                    <Side_button label="로그인" icon={IoIosLogIn} endpoint="/login" />
                    <Side_button label="회원가입" icon={FaRegUserCircle} endpoint="/signup" />
                </div>
            );

    return (
        <div className="sidebar">
            {common_menu}
            {settings_menu}
        </div>
    );
};

export default Sidebar;
