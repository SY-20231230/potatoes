import React from "react";
import {useNavigate} from "react-router-dom";
import './NaverAPIBotton.css';

const SearchButton = ({label, query, path}) => {
    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/naver/search/?query=${query}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("SearchButton 데이터:", data);
                navigate(path)
            } else {
                console.error("요청 실패:", response.statusText);
                navigate(path)
            }
        } catch (error) {
            console.error("요청 중 오류 발생:", error);
            navigate(path)
        }
    };

    return (
        <button className="comp_button" onClick={handleClick}>
            <span>{label}</span>
        </button>
    );
};

export default SearchButton;
