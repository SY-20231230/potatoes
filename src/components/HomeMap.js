import React, {useEffect, useRef} from "react";
import Search from "../components/Search";

const HomeMap = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

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

    return (
        <>
            <div id="map" ref={mapRef} style={{width: "93.9%", height: "100%", marginBottom: "10px"}}/>
            <Search/>
        </>
    );
};

export default HomeMap;
