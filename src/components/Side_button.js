import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Side_button.css";

const Side_button = ({ label, icon: Icon, endpoint, isLogout = false }) => {
    const navigate = useNavigate();

    const handle_logout = () => {
        if (isLogout) {
            sessionStorage.clear();
            navigate('/');
            window.location.reload();
        }
    };

    return isLogout ? (
        // 로그아웃 버튼일 경우
        <button className="comp_button" onClick={handle_logout}>
            <span>{label}</span> {Icon && <Icon />}
        </button>
    ) : (
        // 일반 버튼일 경우
        <Link to={endpoint} className="comp_button_link">
            <button className="comp_button">
                <span>{label}</span> {Icon && <Icon />}
            </button>
        </Link>
    );
};

export default Side_button;
