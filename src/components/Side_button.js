import React from "react";
import axios from "axios";
import "./Side_button.css";

const Side_button = ({ label, icon: Icon, endpoint }) => {
    const handleClick = () => {
        const data = label === "로그아웃" ? { member_id: "0" } : { action: label };

        // Updated endpoint to include Django API URL if not provided
        const finalEndpoint = endpoint || "http://127.0.0.1:8000/api/action/";

        axios.post(finalEndpoint, data)
            .then((response) => {
                console.log("응답 성공:", response.data);
                if (label === "로그아웃") {
                    window.location.href = "/";
                }
            })
            .catch((error) => {
                console.error("응답 실패:", error);
            });
    };

    return (
        <button className="comp_button" onClick={handleClick}>
            <span>{label}</span> {Icon && <Icon />}
        </button>
    );
};

export default Side_button;
