import React from "react";
import {useNavigate} from "react-router-dom";
import "./GetButton.css";

const TestGetButton = ({label, icon: Icon, endpoint, path, isLogout = false}) => {
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

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 2000); // 2초 안에 응답 없으면 중단

        try {
            const response = await fetch(`http://192.168.150.236:8000/` + endpoint, {
                method: "GET",
                headers: {},
                credentials: "include",
                signal: controller.signal, // 타임아웃 적용
            });

            clearTimeout(timeoutId); // 성공하면 타임아웃 클리어

            if (response.ok) {
                const data = await response.json();
                console.log("응답 데이터:", data);
                navigate(path, {state: {fetchedData: data}});
            } else {
                console.error("요청 실패:", response.statusText);
                navigate(path);
            }
        } catch (error) {
            clearTimeout(timeoutId); // 실패해도 타임아웃 클리어

            if (error.name === "AbortError") {
                console.error("요청 시간이 초과되었습니다.", error);
            } else {
                console.error("요청 중 오류 발생:", error);
            }

            navigate(path);
        }
    };


    return (
        <button className="comp_button" onClick={handleClick}>
            <span>{label}</span> {Icon && <Icon/>}
        </button>
    );
};

export default TestGetButton;
