import React, { useState, useEffect } from "react";

import "./User_settings.css";

import Toggle from "../../components/Toggle";
import Side_button from '../../components/Side_button'

const User_settings = () => {
    // 세션에서 가져온 변수값
    const [user_id, setUserId] = useState(sessionStorage.getItem("user_id"));
    const [master_id, setMasterId] = useState(sessionStorage.getItem("master_id"));

    // 알림 수신 변수
    const [is_on, set_is_on] = useState(false);

    useEffect(() => {
        setUserId(sessionStorage.getItem("user_id"));
        setMasterId(sessionStorage.getItem("master_id"));
    }, []);

    return (
        <div className="settings-container">
            <div>
                <div className="user_intro">
                    <span className="user_name">{user_id}</span>
                    <span>님의 페이지</span>
                </div>

                <p>
                    <Side_button
                        label="즐겨찾기"
                        endpoint="/user/like"/>
                </p>
                <p>
                    <Side_button
                        label="신고 내역"
                        endpoint="/user/report"/>
                </p>
                <p>
                    <Side_button
                        label="경로 기록"
                        endpoint="/user/history"/>
                </p>
            </div>

            <div>
                <p>알림 수신 여부</p>
                <Toggle label={is_on ? "ON" : "OFF"} is_on={is_on} set_is_on={set_is_on}/>
            </div>
        </div>
    );
}

export default User_settings;
