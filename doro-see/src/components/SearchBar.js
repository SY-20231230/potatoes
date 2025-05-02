import React, {useRef, useState} from "react";
import './SearchBar.css';

import {FaMagnifyingGlass} from "react-icons/fa6";

const SearchBar = () => {
    const [inputText, setInputText] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [activeInput, setActiveInput] = useState("search");

    const inputSearchRef = useRef(null);

    const [search, setSearch] = useState("");

    const enterSearch = async (e) => {
        if (e.key === "Enter" && inputText !== "") {
            try {
                const response = await fetch(`http://localhost:8000/naver/search/?query=${inputText}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    setSearchData(data.items);
                    setActiveInput("search")
                } else {
                    console.error("요청 실패:", response.statusText);
                }
            } catch (error) {
                console.error("요청 중 오류 발생:", error);
            }
        }
    };

    const clickSearch = (e) => {

    }

    const handlePlaceClick = (place) => {
        const title = place.title.replace(/<b>|<\/b>/g, '');
        const textAddr = place.address;

        if (activeInput === "search") {
            setInputText(title);
        }

        setSearchData([]);

        if (!window.naver) {
            alert("네이버 지도 API 로드 안됨");
            return;
        }

        window.naver.maps.Service.geocode({
            query: textAddr
        }, (status, response) => {
            if (status === window.naver.maps.Service.Status.ERROR) {
                alert('주소 검색 실패');
                return;
            }

            const item = response.v2.addresses[0];
            const point = new window.naver.maps.Point(item.x, item.y);

            if (activeInput === "start") {
                setSearch(`${point.x},${point.y}`);
            }

            console.log("검색한 좌표:", point);
        });
    };

    return (
        <div id="search">
            <FaMagnifyingGlass className="img_reading_glasses"/>

            <input
                type="text"
                className="search_text"
                placeholder="검색어를 입력하세요."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={enterSearch}
                ref={inputSearchRef}
            />

            <button onClick={clickSearch}>검색</button>

            {searchData.length > 0 && (
                <div className="searchBarResult">
                    {searchData.map((item, index) => (
                        <div
                            className="perResult"
                            key={index}
                            onClick={() => handlePlaceClick(item)}
                        >
                            <p className="resultTitle">{item.title.replace(/<b>|<\/b>/g, '')}</p>
                            <p className="resultAddress">{item.address}</p>
                            <hr className="contour"/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;