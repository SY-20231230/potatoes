import React from "react";
import { useNavigate } from "react-router-dom";
import './NaverAPIBotton.css';

const NaviButton = ({ label, start, goal }) => {
    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/naver/proxy/?start=${start}&goal=${goal}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("NaviButton 데이터:", data);

                if (data.route?.trafast?.[0]?.path) {
                    navigate("/directions", { state: { fetchedData: data } });
                } else {
                    console.error("길찾기 데이터 없음");
                }
            } else {
                console.error("요청 실패:", response.statusText);
            }
        } catch (error) {
            console.error("요청 중 오류 발생:", error);
        }
    };

    return (
        <button className="comp_button" onClick={handleClick}>
            <span>{label}</span>
        </button>
    );
};

export default NaviButton;
