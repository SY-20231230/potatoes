import React, { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import './Homepage.css';

import Search from '../components/Search';

const Homepage = () => {
    useEffect(() => {
        // Updated API URL to point to Django backend
        fetch('http://127.0.0.1:8000/')
            .then(response => response.json())
            .then(data => {
                console.log("홈페이지", data);
            })
            .catch(error => {
                console.error("API 호출 실패:", error);
            });
    }, []);

    return (
        <div className="homepage">
            <div className="map-container">
                <Map className="map" center={{ lat: 37.713740, lng: 126.889165 }} level={3} />
                <Search />
            </div>
        </div>
    );
};

export default Homepage;
