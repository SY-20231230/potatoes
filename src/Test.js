// HomeMap.js
import React, {useEffect, useRef, useState} from "react";
import GetButton from "./components/GetButton";
import TestGetButton from "./components/TestGetButton";

const Test = () => {
    const naver = window.naver;
    const mapRef = useRef(null); // HTML 요소 참조
    const mapInstance = useRef(null); // naver map 인스턴스 저장용

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
            <GetButton label="출발지 네이버"
                       endpoint={`start=127.12345,37.12345`}></GetButton>
            <TestGetButton label="테스트 버튼"
                           endpoint={`naver/proxy/goal=129.075986%2C35.179470&start=127.1058342%2C37.359708`}></TestGetButton>
        </>
    );
};

export default Test;
