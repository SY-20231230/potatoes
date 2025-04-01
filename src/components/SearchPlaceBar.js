import React, { useState, useRef } from "react";
import './SearchPlaceBar.css';

import { IoIosNavigate } from "react-icons/io";
import NaviButton from "./naviButton";
import SearchButton from "./SearchButton";

const SearchPlaceBar = () => {
    const [startInput, setStartInput] = useState("");
    const [goalInput, setGoalInput] = useState("");
    const [searchData, setSearchData] = useState([]);

    const startInputRef = useRef(null);
    const goalInputRef = useRef(null);

    // 출발지 검색
    const searchStart = async (e) => {
        if (e.key === "Enter" && startInput !== "") {
            try {
                const response = await fetch(`http://192.168.0.157:8000/naver/search/?query=${startInput}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    setSearchData(data.items);
                    console.log("searchStart 데이터:", data);
                } else {
                    console.error("요청 실패:", response.statusText);
                }
            } catch (error) {
                console.error("요청 중 오류 발생:", error);
            }
        }
    }

    // 목적지 검색
    const searchGoal = async (e) => {
        if (e.key === "Enter" && goalInput !== "") {
            try {
                const response = await fetch(`http://192.168.0.157:8000/naver/search/?query=${goalInput}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    setSearchData(data.items);
                    console.log("searchGoal 데이터:", data);
                } else {
                    console.error("요청 실패:", response.statusText);
                }
            } catch (error) {
                console.error("요청 중 오류 발생:", error);
            }
        }
    }

    // 나중에 검색 데이터에서 주소를 위도, 경도로 변환하는 코드 짜면 지우기
    const start = "126.889456%2C37.71389";
    const goal = "126.810370%2C37.632313";

    return (
        <>
            <div id="search">
                <IoIosNavigate className="barIcon"/>
                <input
                    type="text"
                    id="search_start"
                    className="search_text"
                    placeholder="출발지를 입력하세요."
                    value={startInput}
                    onChange={(e) => setStartInput(e.target.value)}
                    onKeyDown={searchStart}
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
                    onKeyDown={searchGoal}
                    ref={goalInputRef}
                />

                <SearchButton label="검색" query={startInput} path={`/test2`}/>
                <NaviButton label="길찾기" start={start} goal={goal} path={`/directions`}/>
            </div>

            {searchData.length > 0 && (
                <div className={`searchResult`}>
                    {searchData.map((item, index) => (
                        <div className={`perResult`} key={index}>
                            <p className={`resultTitle`}>{item.title.replace(/<b>|<\/b>/g, '')}</p>
                            <p className={`resultAddress`}>{item.address}</p>
                            <hr className={`contour`}/>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default SearchPlaceBar;
