import React from "react";
import {Link} from "react-router-dom";
import "./Sidebar.css";
import GetButton from "../components/GetButton";

// menu icon
import {FaDirections} from "react-icons/fa";
import {FaRegMap} from "react-icons/fa";
// admin icon
import {FcStatistics} from "react-icons/fc";
import {MdManageSearch} from "react-icons/md";
// session icon
import {IoIosLogIn, IoIosLogOut} from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import {FaRegUserCircle} from "react-icons/fa";

const Sidebar = () => {

    const roadreport_id = "";

    const user_id = sessionStorage.getItem("user_id");
    const master_id = sessionStorage.getItem("master_id");

    // user_name 표시 간소화
    const truncLabel = user_id && user_id.length > 4 ? user_id.slice(0, 4) + ".." : user_id;

    // 공통 메뉴
    const commonMenu = (
        <div className="menu">
            <GetButton label="길찾기" icon={FaDirections} path={`/directions`}/>
            <GetButton label="파손 지도" icon={FaRegMap} path={`/damagemap`}/>
            <GetButton label="내비 구현" path={`/test`} endpoint={`roadreport/all`}/>
            <GetButton label="get테스트2" path={`/test2`} endpoint={`roadreport/all`}/>
        </div>
    );

    console.log("user_id 값:", user_id);

    // 사용자별 메뉴
    const settingsMenu = master_id
        ? (
            // master_id가 있을 경우 관리자 메뉴 실행
            <div className="settings">
                <GetButton label="파손 통계" icon={FcStatistics} path={`/admin/data`} endpoint={`roadreport/all`}/>
                <GetButton label="파손 관리" icon={MdManageSearch} path={`/admin/manage`} endpoint={`roadreport/all`}/>
                <hr/>
                <GetButton label="로그아웃" icon={FaRegUserCircle} isLogout={true}/>
            </div>
        )
        : user_id
            ? (
                // master_id가 없고, user_id가 있을 경우 회원 메뉴 실행
                <div className="settings">
                    <GetButton label="즐겨찾기" icon={FaRegStar} path={`user/like`}/>
                    <hr/>
                    <GetButton label={truncLabel} icon={FaRegUserCircle} path={`user/info`}/>
                    <GetButton label="로그아웃" icon={IoIosLogOut} isLogout={true}/>
                </div>
            )
            : (
                // 둘 다 없을 경우 비회원 메뉴 실행
                <div className="settings">
                    <hr/>
                    <GetButton label="로그인" icon={IoIosLogIn} path={`users/login`}/>
                    <GetButton label="회원가입" icon={FaRegUserCircle} path={`users/signup`}/>
                </div>
            );

    return (
        <div className="sidebar">

            <Link to="/">
                <img src="/media/logo_Doro-See.png" alt="Logo" className="img_logo"/>
            </Link>

            {commonMenu}
            {settingsMenu}
        </div>
    );
};

export default Sidebar;
