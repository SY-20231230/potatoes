import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideButton.css";

const SideButton = ({ label, icon: Icon, endpoint, is_logout = false }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };

    const handleClick = async (event) => {
        event.preventDefault();

        if (is_logout) {
            handleLogout();
            return;
        }

        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("응답 데이터:", data);
                navigate(endpoint);
            } else {
                console.error("요청 실패:", response.statusText);
                navigate(endpoint);
            }
        } catch (error) {
            console.error("요청 중 오류 발생:", error);
            navigate(endpoint);
        }
    };

    return (
        <button className="comp_button" onClick={handleClick}>
            <span>{label}</span> {Icon && <Icon />}
        </button>
    );
};

export default SideButton;
