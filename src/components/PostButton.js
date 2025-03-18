import React from "react";
import {useNavigate} from "react-router-dom";
import "./GetButton.css";

const PostButton = ({label, icon: Icon, endpoint, path, isLogout = false}) => {
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
            const response = await fetch(endpoint, {
                method: "Post",
                headers: {
                    content.type
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("응답 데이터:", data);
                navigate(path);
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

export default PostButton;
