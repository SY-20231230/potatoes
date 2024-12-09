import React, {useEffect} from "react";
import './Map.css'

const Map = () => {
    useEffect(() => {
        const {kakao} = window;
        const container = document.getElementById("map");
        const options = {
            center: new kakao.maps.LatLng(37.713739, 126.889173), // 지도 중심 좌표
            level: 3, // 지도 확대 레벨
        };

        // 카카오 맵 생성
        new kakao.maps.Map(container, options);
    }, []);

    return (
        <div id="map"></div>
    );
};

export default Map;
