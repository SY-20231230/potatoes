import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './Search.css';

const Search = () => {
    const [input_text, set_inputText] = useState("");
    const navigate = useNavigate();

    const active_button = (text) => {
        navigate(`/search?query=${encodeURIComponent(text)}`);
    };

    const enter_search = (e) => {
        if (e.key === "Enter") {
            active_button(input_text);
        }
    };

    return (
        <div id="search">
            <img src="http://127.0.0.1:8000//static/images/reading_glasses.png" alt="Search" className="img_reading_glasses" />

            <input
                type="text"
                className="search_text"
                placeholder="검색어를 입력하세요."
                onChange={(e) => set_inputText(e.target.value)}
                onKeyDown={(e) => enter_search(e)}
            />
            <button
                className="search_button"
                onClick={() => active_button(input_text)}>
                검색
            </button>
        </div>
    );
};

export default Search;
