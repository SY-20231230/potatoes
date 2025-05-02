import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {MapContext} from '../MapContext';

function Direction() {
    const naver = window.naver;
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    const location = useLocation();
    const [map, setMap] = useState(null);
    const road_navi = location.state?.fetchedData?.route?.trafast?.[0]?.path || [];


    const start = location.state?.fetchedData?.route?.trafast?.[0]?.path?.[0] || [];
    const goal = location.state?.fetchedData?.route?.trafast?.[0]?.path?.[road_navi.length - 1] || [];

    const path = location.state?.fetchedData?.route?.trafast?.[0]?.path || [];
    const guide = location.state?.fetchedData?.route?.trafast?.[0]?.guide || [];
    const departureTime = (location.state?.fetchedData?.route?.trafast?.[0]?.summary?.departureTime) || [];
    const distance = location.state?.fetchedData?.route?.trafast?.[0]?.summary?.distance || [];
    const duration = location.state?.fetchedData?.route?.trafast?.[0]?.summary?.duration || [];

    // console.log("path: ", path);
    // console.log("guide: ", guide);
    // console.log("departureTime: ", departureTime);
    // console.log("distance: ", distance);
    // console.log("duration: ", duration);

    const polylineInstance = useRef(null);
    const startMarkerInstance = useRef(null);
    const goalMarkerInstance = useRef(null);
    const guideMarkerInstance = useRef([]);


    const handleGuide = (guide) => {
        if (!map) {
            console.warn("지도 아직 로드 안됨");
            return;
        }

        try {
            const pointIndex = guide.pointIndex;
            const point = path[pointIndex];
            const latlng = new naver.maps.LatLng(point[1], point[0]);
            map.setCenter(latlng);
            map.setZoom(17);
            console.log("중심 이동 위치:", latlng.toString());
        } catch (err) {
            console.error("지도 중심 이동 오류:", err);
        }
    };


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
            // console.log("zoom:", zoom);
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
            // console.log("onSuccessGeolocation:", location);

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
                    position: naver.maps.Position.RIGHT_CENTER,
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

        guideMarkerInstance.current.forEach(marker => marker.setMap(null));
        guideMarkerInstance.current = [];

        guide.forEach((guideItem, index) => {
            const point = path[guideItem.pointIndex];
            const latlng = new naver.maps.LatLng(point[1], point[0]);

            const marker = new naver.maps.Marker({
                map,
                position: latlng,
                icon: {
                    url: "/media/free-icon-rec-190256.png",
                    size: new naver.maps.Size(16, 16),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(8, 8),
                },

                title: guideItem.instructions,
            });

            guideMarkerInstance.current.push(marker);
        });

    }, [map, road_navi]);

    const formatTime = (date) => {
        return date.toTimeString().slice(0, 5);
    };

    return (
        <MapContext.Provider value={true}>
            <div className="map-container">
                <div id="map" ref={mapRef}/>
            </div>
            <div>
                {guide.length > 0 && (
                    <div style={{
                        position: "absolute",
                        top: "8.8%",
                        width: "20%",
                        height: "91%",
                        overflowY: "scroll",
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9",
                        zIndex: "1000"
                    }}>
                        <div style={{fontWeight: "bold"}}>
                            <span>도착 예정시간: {formatTime(new Date(new Date(departureTime).getTime() + duration))}</span><br/>
                            <span>총 거리: {(distance > 1000) ? (distance / 1000).toFixed(1) + 'km' : Math.round(distance / 10) + `0m`}</span><br/>
                            <span>총 소요시간: {(duration / 60000 >= 60) ? (duration / 3600000).toFixed(1) + `시간` : Math.floor(duration / 60000) + `분`}</span>

                            {guide.map((place, index) => (
                                <div
                                    className="perResult"
                                    key={index}
                                    onClick={() => handleGuide(place)}
                                >
                                    <hr className="contour" style={{margin: "10px"}}/>
                                    <p className="resultTitle"
                                       style={{margin: "0"}}>{(place.distance >= 1000) ? (place.distance / 1000).toFixed(1) + `km` : Math.ceil(place.distance / 10) + `0m`}, {place.instructions}</p>
                                    <p className="resultAddress"
                                       style={{margin: "0"}}>{(place.duration / 1000 >= 60) ? Math.ceil(place.duration / 60000) + `분` : Math.ceil(place.duration / 1000) + `초`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </MapContext.Provider>
    );
};

export default Direction;
