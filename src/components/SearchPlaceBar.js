import React, {useState, useRef, useEffect} from "react";
import {IoIosNavigate} from "react-icons/io";

import './SearchPlaceBar.css';
import NaviButton from "./NaviButton";

const SearchPlaceBar = () => {
    const [inputStart, setInputStart] = useState("");
    const [inputGoal, setGoalInput] = useState("");
    const [searchPlace, setPlaceData] = useState([]);
    const [activeInput, setActiveInput] = useState("start");

    const [start, setStart] = useState("");
    const [goal, setGoal] = useState("");

    const inputStartRef = useRef(null);
    const inputGoalRef = useRef(null);

    useEffect(() => {
        if (!window.naver) {
            alert("네이버 지도 API 로드 안됨");
        }
    }, []);

    // 출발지 검색
    const searchStart = async (e) => {
        if (e.key === "Enter" && inputStart !== "") {
            try {
                const response = await fetch(`http://localhost:8000/naver/search/?query=${inputStart}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    setPlaceData(data.items);
                    setActiveInput("start");
                } else {
                    console.error("요청 실패:", response.statusText);
                }
            } catch (error) {
                console.error("요청 중 오류 발생:", error);
            }
        }
    };

    // 목적지 검색
    const searchGoal = async (e) => {
        if (e.key === "Enter" && inputGoal !== "") {
            try {
                const response = await fetch(`http://localhost:8000/naver/search/?query=${inputGoal}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    setPlaceData(data.items);
                    setActiveInput("goal");
                } else {
                    console.error("요청 실패:", response.statusText);
                }
            } catch (error) {
                console.error("요청 중 오류 발생:", error);
            }
        }
    };

    const handlePlaceClick = (place) => {
        const title = place.title.replace(/<b>|<\/b>/g, '');
        const textAddr = place.address;

        if (activeInput === "start") {
            setInputStart(title);
        } else {
            setGoalInput(title);
        }

        setPlaceData([]);

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
                setStart(`${point.x},${point.y}`);
            } else {
                setGoal(`${point.x},${point.y}`);
            }

            console.log("검색한 좌표:", point);
        });
    };

    return (
        <>
            <div id="search">
                <IoIosNavigate className="barIcon"/>
                <input
                    type="text"
                    id="search_start"
                    className="search_text"
                    placeholder="출발지를 입력하세요."
                    value={inputStart}
                    onChange={(e) => setInputStart(e.target.value)}
                    onKeyDown={searchStart}
                    onFocus={() => setActiveInput("start")}
                    ref={inputStartRef}
                />
                &nbsp;
                <input
                    type="text"
                    id="search_goal"
                    className="search_text"
                    placeholder="목적지를 입력하세요."
                    value={inputGoal}
                    onChange={(e) => setGoalInput(e.target.value)}
                    onKeyDown={searchGoal}
                    onFocus={() => setActiveInput("goal")}
                    ref={inputGoalRef}
                />

                <NaviButton label="길찾기" start={start} goal={goal} path={`/directions`}/>
            </div>

            {searchPlace.length > 0 && (
                <div className="searchResult">
                    {searchPlace.map((road, index) => (
                        <div
                            className="perResult"
                            key={index}
                            onClick={() => handlePlaceClick(road)}
                        >
                            <p className="resultTitle">{road.title.replace(/<b>|<\/b>/g, '')}</p>
                            <p className="resultAddress">{road.address}</p>
                            <hr className="contour"/>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default SearchPlaceBar;
