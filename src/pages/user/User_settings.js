import React, { useState } from "react";
import "./User_settings.css";

import Toggle from "../../components/Toggle";
import Side_button from '../../components/Side_button'

const User_settings = () => {
    const [is_on, set_is_on] = useState(false);

    return (
        <div className="settings-container">
            <div>
                <Side_button
                label="즐겨찾기"
                endpoint="http://localhost:3000/user/like"/>
                <Side_button
                label="신고 내역"
                endpoint="http://localhost:3000/user/report"/>
                <Side_button
                label="경로 기록"
                endpoint="http://localhost:3000/user/history"/>
            </div>


            <div>
                <span>알림 수신 여부</span>
                <Toggle label={is_on ? "ON" : "OFF"} is_on={is_on} set_is_on={set_is_on} />
            </div>
        </div>
    );
}

export default User_settings;
