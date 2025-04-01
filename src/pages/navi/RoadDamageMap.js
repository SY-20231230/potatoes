// HomeMap.js
import React, {useEffect, useRef, useState} from "react";
import MarkerOption from "../../components/MarkerOption";

const RoadDamageMap = () => {
    const naver = window.naver;
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    const [interactionOn, setInteractionOn] = useState(true);
    const [controlsOn, setControlsOn] = useState(true);

    useEffect(() => {
        const map = new naver.maps.Map(mapRef.current, {
            center: new naver.maps.LatLng(37.713955, 126.889456),
            zoom: 16,
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

        // 마커
        const potholeMarker = [
            {lat: 37.3849483, lng: 127.1229117},
            {lat: 37.643181, lng: 126.787966},
            {lat: 37.653188, lng: 126.895579},
            {lat: 37.713052, lng: 126.888185},
            {lat: 37.713862, lng: 126.878185},
            {lat: 37.712000, lng: 126.888105},
            {lat: 37.658267, lng: 126.832025},
            {lat: 37.618710, lng: 126.921693},
            {lat: 37.71361, lng: 126.88947}
        ];

        const crackMarker = [
            {lat: 37.7137, lng: 126.88939},
            {lat: 37.3849483, lng: 127.1229117},
            {lat: 37.713052, lng: 126.888735},
            {lat: 37.712270, lng: 126.888046},
            {lat: 37.711296, lng: 126.887720},
            {lat: 37.710947, lng: 126.889934},
            {lat: 37.712149, lng: 126.888831}
        ];

        potholeMarker.forEach(({lat, lng}) => {
            const potholeOptions = MarkerOption({
                lat,
                lng,
                iconImg: "/media/icon_pothole.png"
            });

            new naver.maps.Marker({
                ...potholeOptions,
                map: map,
            });
        });

        crackMarker.forEach(({lat, lng}) => {
            const crackOptions = MarkerOption({
                lat,
                lng,
                iconImg: "/media/icon_crack.png"
            });

            new naver.maps.Marker({
                ...crackOptions,
                map: map,
            });
        });

    }, []);

    return (
        <>
            <div id="map" ref={mapRef} style={{width: "93.9%", height: "100%", marginBottom: "10px"}}/>
        </>
    );
};

export default RoadDamageMap;
