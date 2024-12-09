import React from "react";
import Search from '../components/Search';
import Map from '../components/Map';
import './Homepage.css';

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="map-container">
                <Map />
                <Search />
            </div>
        </div>
    );
};

export default Homepage;
