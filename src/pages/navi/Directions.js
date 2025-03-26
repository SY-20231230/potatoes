import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import NaverAPIButton from "../../components/NaverAPIButton";
import SearchAddresBar from "../../components/SearchAddresBar";

const Directions = () => {
    const naver = window.naver;
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    const location = useLocation();
    const [map, setMap] = useState(null);
    const road_navi = location.state?.fetchedData?.route?.trafast?.[0]?.path || [];

    const start = "126.889456%2C37.71389";
    const goal = "126.810370%2C37.632313";

    useEffect(() => {
        if (!naver || !document.getElementById("map")) return;

        const mapInstance = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(road_navi[0]?.[1] || 37.713955, road_navi[0]?.[0] || 126.889456),
            zoom: 14,
        });

        setMap(mapInstance);
    }, [naver]);

    useEffect(() => {
        if (!map || road_navi.length === 0) return;

        const pathData = road_navi.map(coord => new naver.maps.LatLng(coord[1], coord[0]));

        new naver.maps.Polyline({
            map,
            path: pathData,
            strokeColor: "#E81E24",
            strokeWeight: 4,
        });
    }, [map, road_navi]);

    return (
        <div>
            <div id="map" ref={mapRef} style={{width: "90%", height: "600px", marginBottom: "10px"}}/>
            <NaverAPIButton label="중부대 -> 대곡역" start={start} goal={goal}/>
            <SearchAddresBar/>
        </div>
    );
};

export default Directions;
