import React, {useEffect} from "react";
import Search from '../components/Search';
import Map from '../components/Map';
import './Homepage.css';

const Homepage = () => {
    useEffect(() => {
        fetch('http://localhost:8000/dorosee/homepage/')
            .then(response => response.json())
            .then(data => {
                console.log("홈페이지", data);
            })
    });

    return (
        <div className="homepage">
            <div className="map-container">
                <Map/>
                <Search/>
            </div>
        </div>
    );
};

export default Homepage;
