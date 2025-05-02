import React from "react";
import {useNavigate} from "react-router-dom";
import "./GetButton.css";

const GetButton = ({label, icon: Icon, endpoint, path, isLogout = false}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/");
        window.location.reload();
    };

    const handleClick = async (event) => {
        event.preventDefault();

        if (isLogout) {
            handleLogout();
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/` + endpoint, {
                method: "GET",
                headers: {
                    'Content-Type': `application/json`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("GetButton 데이터:", data);
                navigate(path, {state: {fetchedData: data}});
            } else {
                console.error("요청 실패:", response.statusText);
                navigate(path);
            }
        } catch (error) {
            console.error("요청 중 오류 발생:", error);
            navigate(path);
        }
    };

    return (
        <button className="comp_button" onClick={handleClick}>
            <span>{label}</span> {Icon && <Icon/>}
        </button>
    );
};

export default GetButton;
