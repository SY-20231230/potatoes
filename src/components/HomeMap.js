// HomeMap.js
import React, {useEffect, useRef, useState} from "react";
import MarkerOption from "./MarkerOption";

const HomeMap = () => {
    const naver = window.naver;
    const mapRef = useRef(null); // HTML 요소 참조
    const mapInstance = useRef(null); // naver map 인스턴스 저장용

    const [interactionOn, setInteractionOn] = useState(true);
    const [controlsOn, setControlsOn] = useState(true);

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

            // 위치 마커
            const locationMarker = MarkerOption({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                iconImg: "/media/icon_location.png"
            });
            new naver.maps.Marker({
                ...locationMarker,
                map: map,
            });
        }

        function onErrorGeolocation() {
            const center = map.getCenter();
        }

        // 지도 마커 추가
        const markerOptions = MarkerOption({
            lat: 37.3849483,
            lng: 127.1229117,
            iconImg: "/media/icon_pothole.png"
        });
        new naver.maps.Marker({
            ...markerOptions,
            map: map,
        });

        const markerOptions1 = MarkerOption({
            lat: 37.643181,
            lng: 126.787966,
            iconImg: "/media/icon_pothole.png"
        });
        new naver.maps.Marker({
            ...markerOptions1,
            map: map,
        });

        const markerOptions2 = MarkerOption({
            lat: 37.653188,
            lng: 126.895579,
            iconImg: "/media/icon_pothole.png"
        });
        new naver.maps.Marker({
            ...markerOptions2,
            map: map,
        });

        const markerOptions3 = MarkerOption({
            lat: 37.658267,
            lng: 126.832025,
            iconImg: "/media/icon_pothole.png"
        });
        new naver.maps.Marker({
            ...markerOptions3,
            map: map,
        });

        const markerOptions4 = MarkerOption({
            lat: 37.618710,
            lng: 126.921693,
            iconImg: "/media/icon_pothole.png"
        });
        new naver.maps.Marker({
            ...markerOptions4,
            map: map,
        });

        const markerOptions5 = MarkerOption({
            lat: 37.71361,
            lng: 126.88947,
            iconImg: "/media/icon_pothole.png"
        });
        new naver.maps.Marker({
            ...markerOptions5,
            map: map,
        });

    }, []);

    const toggleInteraction = () => {
        if (!mapInstance.current) return;
        const newState = !interactionOn;
        setInteractionOn(newState);
        mapInstance.current.setOptions({
            draggable: newState,
            pinchZoom: newState,
            scrollWheel: newState,
            keyboardShortcuts: newState,
            disableDoubleTapZoom: !newState,
            disableDoubleClickZoom: !newState,
            disableTwoFingerTapZoom: !newState,
        });
    };

    const toggleControls = () => {
        if (!mapInstance.current) return;
        const newState = !controlsOn;
        setControlsOn(newState);
        mapInstance.current.setOptions({
            scaleControl: newState,
            logoControl: newState,
            mapDataControl: newState,
            zoomControl: newState,
            mapTypeControl: newState,
        });
    };

    return (
        <>
            <div id="map" ref={mapRef} style={{width: "93.9%", height: "725px", marginBottom: "10px"}}/>
        </>
    );
};

export default HomeMap;
