import React from "react";
import {useNavigate} from "react-router-dom";
import './NaverAPIBotton.css';

const NaverAPIButton = ({label, path, start, goal}) => {
    const navigate = useNavigate();

    start = "126.888709%2C37.710999"
    goal = "126.898874%2C37.705951"


    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://192.168.0.37:8000/naver/proxy/?start=${start}&goal=${goal}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("NaverGetButton 데이터:", data);
                console.log("start, goal:", start, goal);
                navigate(path);
            } else {
                console.error("요청 실패:", response.statusText);
                console.log("start, goal:", start, goal);
                navigate(path);
            }
        } catch (error) {
            console.error("요청 중 오류 발생:", error);
            console.log("start, goal:", start, goal);
            navigate(path);
        }
    };

    return (
        <button className="comp_button" onClick={handleClick}>
            <span>{label}</span>
        </button>
    );
};

export default NaverAPIButton;
