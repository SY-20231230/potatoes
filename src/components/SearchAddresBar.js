import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './SearchAddressBar.css';

import { IoIosNavigate } from "react-icons/io";
import NaverAPIButton from "./NaverAPIButton";

const SearchAddressBar = () => {
    const [startInput, setStartInput] = useState("");
    const [goalInput, setGoalInput] = useState("");
    const startInputRef = useRef(null);
    const goalInputRef = useRef(null);
    const navigate = useNavigate();

    const activeButton = (text) => {
        navigate(`/search?query=${encodeURIComponent(text)}`);
    };

    const enterSearch = (e, type) => {
        if (e.key === "Enter") {
            if (type === "start") {
                if (startInput !== "") {
                    goalInputRef.current.focus();
                }
            } else if (type === "goal") {
                if (startInput !== "" && goalInput !== "") {
                    const combinedAddress = `${startInput}, ${goalInput}`;
                    activeButton(combinedAddress);
                }
            }
        }
    };

    return (
        <div id="search">
            <IoIosNavigate className="barIcon" />

            <input
                type="text"
                id="search_start"
                className="search_text"
                placeholder="출발지를 입력하세요."
                value={startInput}
                onChange={(e) => setStartInput(e.target.value)}
                onKeyDown={(e) => enterSearch(e, "start")}
                ref={startInputRef}
            />
            &nbsp;
            <input
                type="text"
                id="search_goal"
                className="search_text"
                placeholder="목적지를 입력하세요."
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                onKeyDown={(e) => enterSearch(e, "goal")}
                ref={goalInputRef}
            />
            <NaverAPIButton label="api 요청" start={startInput} goal={goalInput} path={`/directions`} />
        </div>
    );
};

export default SearchAddressBar;
