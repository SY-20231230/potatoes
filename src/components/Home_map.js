import React, { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import './Home_map.css';

import Search from './Search';

const Home_map = () => {

    return (
            <div className="map-container">
                <Map className="map" center={{ lat: 37.713740, lng: 126.889165 }} level={3} />
                <Search />
            </div>
    );
};

export default Home_map;
