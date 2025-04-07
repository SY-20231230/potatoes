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
    const goal = location.state?.fetchedData?.route?.trafast?.[0]?.path?.[road_navi.length - 1] || [];

    const polylineInstance = useRef(null);
    const startMarkerInstance = useRef(null);
    const goalMarkerInstance = useRef(null);

    useEffect(() => {
        if (!window.naver) return;
        const {naver} = window;

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
        setMap(map);

        // 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
        }

        function onSuccessGeolocation(position) {
            const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(location);
            map.setZoom(15);
            console.log("Coordinates:", location.toString());

            // 위치 마커 추가
            new naver.maps.Marker({
                position: location,
                map,
                icon: {
                    url: "/media/icon_navigation.png",
                    size: new naver.maps.Size(32, 32),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(16, 16),
                },
            });

            const locationBtnHtml =
                '<img src="/media/icon_gps.png" style="background-color: #FFFFFF; padding: 0.5vh; cursor: pointer; border: 1px solid #E81E24; border-radius: 0.5vh">';

            naver.maps.Event.once(map, "init", function () {
                const customControl = new naver.maps.CustomControl(locationBtnHtml, {
                    position: naver.maps.Position.LEFT_CENTER,
                });

                customControl.setMap(map);

                naver.maps.Event.addDOMListener(
                    customControl.getElement(),
                    "click",
                    function () {
                        map.setCenter(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));
                    }
                );

            });

        }

        function onErrorGeolocation() {
            console.error("Geolocation을 가져올 수 없습니다.");
        }

    }, []);

    useEffect(() => {
        if (!map || road_navi.length === 0) return;

        const pathData = road_navi.map(coord => new naver.maps.LatLng(coord[1], coord[0]));

        if (polylineInstance.current) {
            polylineInstance.current.setMap(null);
        }
        if (startMarkerInstance.current) {
            startMarkerInstance.current.setMap(null);
        }
        if (goalMarkerInstance.current) {
            goalMarkerInstance.current.setMap(null);
        }

        polylineInstance.current = new naver.maps.Polyline({
            map,
            path: pathData,
            strokeColor: "#E81E24",
            strokeWeight: 4,
        });

        map.setCenter(start);
        map.setZoom(16);

        startMarkerInstance.current = new naver.maps.Marker({
            map,
            position: new naver.maps.LatLng(start[1], start[0]),
            icon: {
                url: "/media/icon_location.png",
            },
        });

        goalMarkerInstance.current = new naver.maps.Marker({
            map,
            position: new naver.maps.LatLng(goal[1], goal[0]),
            icon: {
                url: "/media/icon_location_goal.png",
            },
        });

    }, [map, road_navi]);

    return (
        <div>
            <div id="map" ref={mapRef} style={{width: "93.9%", height: "725px", marginBottom: "10px"}}/>
            <SearchAddresBar/>
        </div>
    );
};

export default Directions;
