// HomeMap.js
import React, {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

const RoadDamageMap = () => {
    const naver = window.naver;
    const location = useLocation();

    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    const road_data = location.state?.fetchedData || [];

    const filteredData = road_data.filter(road => road.roadreport_image);

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

        filteredData.forEach((road, index) => {
            if (road.roadreport_latlng) {
                const [lng, lat] = road.roadreport_latlng.split(",").map(coord => parseFloat(coord.trim()));

                new naver.maps.Marker({
                    position: new naver.maps.LatLng(lat, lng),
                    map: map,
                    icon: {
                        url: road.roadreport_damagetype === "pothole"
                            ? "/media/icon_pothole.png"
                            : "/media/icon_crack.png",
                        size: new naver.maps.Size(32, 32),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(16, 16)
                    }
                });
            } else {
                console.log(`num ${road.roadreport_num} latlng 없음`);
            }
        });

    }, [filteredData]);

    return (
        <>
            <div id="map" ref={mapRef} style={{width: "93.9%", height: "100%", marginBottom: "10px"}}/>
        </>
    );
};

export default RoadDamageMap;
