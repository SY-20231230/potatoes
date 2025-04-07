import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        user_id: sessionStorage.getItem("user_id") || null,
        master_id: sessionStorage.getItem("master_id") || null,
    });

    // 사용자 로그인
    const handleUser = () => {
        setUser({user_id: "임시회원로그인", master_id: null});

        navigate('/')
        window.location.reload();

        sessionStorage.setItem("user_id", "임시회원로그인");
        sessionStorage.removeItem("master_id"); // 관리자 정보 제거
    };

    // 관리자 로그인
    const handleMaster = () => {
        setUser({user_id: null, master_id: "1"});

        navigate('/')
        window.location.reload();

        sessionStorage.setItem("master_id", "1");
        sessionStorage.removeItem("user_id");
    };

    return (
        <div className="login_content">
            <div className={`title`}>login</div>
            <div className={`button_group`}>
                <button className={`user_button`} onClick={handleUser}>회원</button>
                <button className={`admin_button`} onClick={handleMaster}>관리자</button>
            </div>
        </div>
    );
};

export default Login;
