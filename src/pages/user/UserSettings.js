import React, {useState, useEffect} from "react";

import "./UserSettings.css";

import Toggle from "../../components/Toggle";
import GetButton from '../../components/GetButton'

const UserSettings = () => {
    // 세션에서 가져온 변수값
    const [user_id, setUserId] = useState(sessionStorage.getItem("user_id"));

    // 알림 수신 변수
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        setUserId(sessionStorage.getItem("user_id"));
    }, []);

    return (
        <div className="settings-container">
            <div>
                <div className="user_intro">
                    <span className="user_name">{user_id}</span>
                    <span>님의 페이지</span>
                </div>

                <p>
                    <GetButton
                        label="즐겨찾기"
                        endpoint="/user/like"/>
                </p>
                <p>
                    <GetButton
                        label="신고 내역"
                        endpoint="/user/report"/>
                </p>
                <p>
                    <GetButton
                        label="경로 기록"
                        endpoint="/user/history"/>
                </p>
            </div>

            <div>
                <p>알림 수신 여부</p>
                <Toggle label={isOn ? "ON" : "OFF"} isOn={isOn} setIsOn={setIsOn}/>
            </div>
        </div>
    );
}

export default UserSettings;
