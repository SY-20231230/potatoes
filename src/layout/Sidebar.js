import React from "react";
import {Link} from "react-router-dom";
import "./Sidebar.css";
import GetButton from "../components/GetButton";

// menu icon
import {FaDirections} from "react-icons/fa";
import {GiHole} from "react-icons/gi";
import {MdPlace} from "react-icons/md";

// admin icon
import {FcStatistics} from "react-icons/fc";
import {MdManageSearch} from "react-icons/md";

// session icon
import {IoIosLogIn, IoIosLogOut} from "react-icons/io";
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
            <Link to="/">
                <img src="/media/logo_Doro-See.png" alt="Logo" className="img_logo"/>
            </Link>

            <GetButton label="길찾기" icon={FaDirections} path={`/directions`} endpoint={``}/>
            <GetButton label="포트홀" icon={GiHole} path={`/porthole`} endpoint={``}/>
            <GetButton label="장소 (클릭X)" icon={MdPlace} path={`/place`} endpoint={``}/>
            <GetButton label="테스트" path={`/test`} endpoint="/test"/>
        </div>
    );

    console.log("user_id 값:", user_id);

    // 사용자별 메뉴
    const settingsMenu = master_id
        ? (
            // master_id가 있을 경우 관리자 메뉴 실행
            <div className="settings">
                <hr/>
                <GetButton label="파손 통계" icon={FcStatistics} path={`/admin/data`} endpoint={`roadreport/select`}/>
                <GetButton label="파손 관리" icon={MdManageSearch} path={`/admin/manage`} endpoint={`roadreport/all`}/>
                <GetButton label="로그아웃" icon={FaRegUserCircle} isLogout={true}/>
            </div>
        )
        : user_id
            ? (
                // master_id가 없고, user_id가 있을 경우 회원 메뉴 실행
                <div className="settings">
                    <hr/>
                    <GetButton label={truncLabel} icon={FaRegUserCircle} path={`users/info`} endpoint={``}/>
                    <GetButton label="로그아웃" icon={IoIosLogOut} isLogout={true}/>
                </div>
            )
            : (
                // 둘 다 없을 경우 비회원 메뉴 실행
                <div className="settings">
                    <hr/>
                    <GetButton label="로그인" icon={IoIosLogIn} path={`users/login`} endpoint={``}/>
                    <GetButton label="회원가입" icon={FaRegUserCircle} path={`users/signup`} endpoint={``}/>
                </div>
            );

    return (
        <div className="sidebar">
            {commonMenu}
            {settingsMenu}
        </div>
    );
};

export default Sidebar;
