import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import SearchAddresBar from "../../components/SearchPlaceBar";

const Directions = () => {
    const naver = window.naver;
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    const location = useLocation();
    const [map, setMap] = useState(null);
    const road_navi = location.state?.fetchedData?.route?.trafast?.[0]?.path || [];


    const start = location.state?.fetchedData?.route?.trafast?.[0]?.path?.[0] || [];
    const goal = location.state?.fetchedData?.route?.trafast?.[0]?.path?.[road_navi.length-1] || [];

    useEffect(() => {
        if (!naver || !document.getElementById("map")) return;

        const mapInstance = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(road_navi[0]?.[1] || 37.713955, road_navi[0]?.[0] || 126.889456),
            zoom: 12,
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

        const startOptions = ({
            map,
            position: start,
            icon: {
                url: "/media/icon_location.png",
            },
        });

        new naver.maps.Marker({
            ...startOptions,
        })

        const goalOptions = ({
            map,
            position: goal,
            icon: {
                url: "/media/icon_location_goal.png",
            },
        });

        new naver.maps.Marker({
            ...goalOptions,
        })

    }, [map, road_navi]);

    return (
        <div>
            <div id="map" ref={mapRef} style={{width: "93.9%", height: "725px", marginBottom: "10px"}}/>
            <SearchAddresBar/>
        </div>
    );
};

export default Directions;
