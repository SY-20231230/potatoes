import React from "react";
import './Search.css';

const Search = () => {
    return (
        <div id="search">
            <img src="images/reading_glasses.png" alt="Search" className="img_reading_glasses"/>
            &nbsp;
            <textarea className="search_text" rows="1" cols="30" spellCheck="false" placeholder="검색어를 입력하세요"/>
        </div>
    );
};

export default Search;
