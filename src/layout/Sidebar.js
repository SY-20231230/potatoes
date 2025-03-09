import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import SideButton from "../components/SideButton";

// menu icon
import { FaDirections } from "react-icons/fa";
import { GiHole } from "react-icons/gi";
import { MdPlace } from "react-icons/md";

// admin icon
import { FcStatistics } from "react-icons/fc";
import { MdManageSearch } from "react-icons/md";

// session icon
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar = () => {
    const user_id = sessionStorage.getItem("user_id");
    const master_id = sessionStorage.getItem("master_id");

    // user_name 표시 간소화
    const trunc_label = user_id && user_id.length > 4 ? user_id.slice(0, 4) + ".." : user_id;

    // 공통 메뉴
    const common_menu = (
        <div className="menu">
            <Link to="/">
                <img src="/images/logo_Doro-See.png" alt="Logo" className="img_logo" />
            </Link>

            <SideButton label="길찾기" icon={FaDirections} endpoint="/directions" />
            <SideButton label="포트홀" icon={GiHole} endpoint="/porthole" />
            <SideButton label="장소 (클릭X)" icon={MdPlace} endpoint="/place" />
        </div>
    );

    // 사용자별 메뉴
    const settings_menu = master_id
        ? (
            // master_id가 있을 경우 관리자 메뉴 실행
            <div className="settings">
                <hr />
                <SideButton label="파손 통계" icon={FcStatistics} endpoint="/admin/data" />
                <SideButton label="파손 관리" icon={MdManageSearch} endpoint="/admin/manage" />
                <SideButton label="로그아웃" icon={FaRegUserCircle} is_logout={true} />
            </div>
        )
        : user_id
            ? (
                // master_id가 없고, user_id가 있을 경우 회원 메뉴 실행
                <div className="settings">
                    <hr />
                    <SideButton label={trunc_label} icon={FaRegUserCircle} endpoint={`/user/settings?user_id=${user_id}`} />
                    <SideButton label="로그아웃" icon={IoIosLogOut} is_logout={true} />
                </div>
            )
            : (
                // 둘 다 없을 경우 비회원 메뉴 실행
                <div className="settings">
                    <hr />
                    <SideButton label="로그인" icon={IoIosLogIn} endpoint="/login" />
                    <SideButton label="회원가입" icon={FaRegUserCircle} endpoint="/signup" />
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
