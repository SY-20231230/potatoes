import React from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import './HomeMap.css';

import Search from './Search';

const HomeMap = () => {
    const [loading, error] = useKakaoLoader({
        appkey: process.env.REACT_APP_KAKAOMAP_KEY,
        libraries: ['services'], // 필요시 추가
    });

    if (loading) return <div>지도를 불러오는 중입니다...</div>;
    if (error) return <div>지도를 불러오는데 실패했습니다!</div>;

    return (
        <div className="map-container">
            <Map
                className="map"
                center={{ lat: 37.713740, lng: 126.889165 }}
                level={3}
            />
            <Search />
        </div>
    );
};

export default HomeMap;
