import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './Search.css';

import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    const activeButton = (text) => {
        navigate(`/search?query=${encodeURIComponent(text)}`);
    };

    const enterSearch = (e) => {
        if (e.key === "Enter" && inputText !== "") {
            activeButton(inputText);
        }
    };

    return (
        <div id="search">
            <FaMagnifyingGlass className="img_reading_glasses"/>

            <input
                type="text"
                className="search_text"
                placeholder="검색어를 입력하세요."
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => enterSearch(e)}
            />
        </div>
    );
};

export default Search;
