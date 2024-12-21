import React, {useEffect} from "react";
import {Map} from "react-kakao-maps-sdk";
import './Homepage.css';

import Search from '../components/Search';

const Homepage = () => {
    useEffect(() => {
        fetch('https://localhost:3000/')
            .then(response => response.json())
            .then(data => {
                console.log("홈페이지", data);
            })
    });

    return (
        <div className="homepage">
            <div className="map-container">
                <Map className="map" center={{lat: 37.713740, lng: 126.889165}} level={3}/>
                <Search/>
            </div>
        </div>
    );
};

export default Homepage;
