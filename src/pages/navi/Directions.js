import React, {useEffect, useRef, useState} from "react";
import NaverAPIButton from "../../components/NaverAPIButton";
import SearchAddresBar from "../../components/SearchAddresBar";
import {Button} from "@mui/material";

const Directions = () => {
    const naver = window.naver;
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    const start = "126.889456%2C37.713955"
    const goal = "127.1229117%2C37.3849483"

    useEffect(() => {
        const map = new naver.maps.Map(mapRef.current, {
            center: new naver.maps.LatLng(37.713955, 126.889456),
            zoom: 13,
            minZoom: 7,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT,
            },
        });

        map.setOptions("mapTypeControl", true);
        naver.maps.Event.addListener(map, "zoom_changed", (zoom) => {
            console.log("zoom:", zoom);
        });

        naver.maps.Event.once(map, "init", () => {
            console.log("지도 초기화 완료");
        });

        mapInstance.current = map;

        // 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
        }

        function onSuccessGeolocation(position) {
            const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(location);
            map.setZoom(10);
            console.log("Coordinates:", location.toString());
        }

        function onErrorGeolocation() {
            const center = map.getCenter();
        }


    }, []);

    return (
        <>
            <div id="map" ref={mapRef} style={{width: "90%", height: "600px", marginBottom: "10px"}}/>
            <SearchAddresBar/>
        </>
    );
};

export default Directions;
