import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        user_id: sessionStorage.getItem("user_id") || null,
        master_id: sessionStorage.getItem("master_id") || null,
    });

    // 사용자 로그인
    const handle_user = () => {
        setUser({user_id: "임시회원로그인", master_id: null});

        navigate('/')
        window.location.reload();

        sessionStorage.setItem("user_id", "임시회원로그인");
        sessionStorage.removeItem("master_id"); // 관리자 정보 제거
    };

    // 관리자 로그인
    const handle_master = () => {
        setUser({user_id: null, master_id: "1"});

        navigate('/')
        window.location.reload();

        sessionStorage.setItem("master_id", "1");
        sessionStorage.removeItem("user_id");
    };

    return (
        <div className="login_content">
            <span>login</span>
            <br/>
            <button onClick={handle_user}>회원</button>
            <button onClick={handle_master}>관리자</button>
        </div>
    );
};

export default Login;
