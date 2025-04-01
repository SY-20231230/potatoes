import React, {useEffect, useRef, useState, useMemo} from "react";
import {useLocation} from "react-router-dom";
import './AdminData.css';
import CountEvent from "../../components/CountEvent";
import MarkerOption from "../../components/MarkerOption";

const AdminData = () => {
    const location = useLocation();
    const road_data = location.state?.fetchedData || [];

    // 이미지 있는 데이터만 필터링
    const filteredData = road_data.filter(road => road.roadreport_image);

    const naver = window.naver;
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    // 시간 형식 맞추기
    const road_date = new Date();
    const now_ymd = `${road_date.getFullYear()}-${(road_date.getMonth() + 1).toString().padStart(2, "0")}-${road_date.getDate().toString().padStart(2, "0")}`;

    const agoWeek = new Date(road_date);
    agoWeek.setDate(road_date.getDate() - 7);
    const roadWeek = road_date.getDate() < 8 ? (`${road_date.getFullYear()}-${(road_date.getMonth()).toString().padStart(2, "0")}-${agoWeek.getDate().toString().padStart(2, "0")}`) :
        (`${road_date.getFullYear()}-${(road_date.getMonth() + 1).toString().padStart(2, "0")}-${agoWeek.getDate().toString().padStart(2, "0")}`);

    const agoMonth = new Date(road_date);
    agoMonth.setDate(road_date.getDate() - 30);
    const roadMonth = `${road_date.getFullYear()}-${(agoMonth.getMonth() + 1).toString().padStart(2, "0")}-${agoMonth.getDate().toString().padStart(2, "0")}`;

    console.log("현재 연월일: ", now_ymd);
    console.log("roadWeek: ", roadWeek);
    console.log("roadMonth: ", roadMonth);

    filteredData.forEach((road) => {
        if (road.roadreport_time) {
            const [ymd, hms] = road.roadreport_time.split("T");
            road.ymd = ymd;
            road.hms = hms;
        } else {
            console.log(`num ${road.roadreport_num} time 없음`);
        }
    });

    // 지도
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

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
        }

        function onSuccessGeolocation(position) {
            const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(location);
            map.setZoom(10);
            console.log("Coordinates:", location.toString());

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
            console.warn("Geolocation error");
        }

        const markers = [
            {lat: 37.3849483, lng: 127.1229117},
            {lat: 37.643181, lng: 126.787966},
            {lat: 37.653188, lng: 126.895579},
            {lat: 37.658267, lng: 126.832025},
            {lat: 37.618710, lng: 126.921693},
            {lat: 37.71361, lng: 126.88947}
        ];

        markers.forEach(({lat, lng}) => {
            const markerOptions = MarkerOption({
                lat,
                lng,
                iconImg: "/media/icon_pothole.png"
            });

            new naver.maps.Marker({
                ...markerOptions,
                map: map,
            });
        });

    }, [filteredData]);

    return (
        <div className="admin_data">
            <div className="data_info">

                <div className="stack_event">
                    <br/>
                    <span>도로파손 발생 통계</span>
                    <br/><br/>
                    <div className="event_container">
                        <CountEvent name={"전체"} count={filteredData.length}/>
                        <CountEvent name={"접수됨"}
                                    count={filteredData.filter(road => ["접수됨", null].includes(road.roadreport_status)).length}/>
                        <CountEvent name={"처리중"}
                                    count={filteredData.filter(road => road.roadreport_status === "처리중").length}/>
                        <CountEvent name={"해결됨"}
                                    count={filteredData.filter(road => road.roadreport_status === "해결됨").length}/>
                        <CountEvent name={"보류중"}
                                    count={filteredData.filter(road => road.roadreport_status === "보류중").length}/>
                        <CountEvent name={"미분류"}
                                    count={filteredData.filter(road => !["접수됨", "처리중", "해결됨", "보류중", null].includes(road.roadreport_status)).length}/>
                    </div>
                </div>

                <hr/>

                <div className="event">
                    <h3>시간별 발생 건수</h3>
                    <div className="event_container">
                        <CountEvent name={"금일"} count={filteredData.filter(road => road.ymd === now_ymd).length}/>
                        <CountEvent name={"주간"}
                                    count={filteredData.filter(road => road.ymd >= roadWeek && road.ymd < now_ymd).length}/>
                        <CountEvent name={"월간"}
                                    count={filteredData.filter(road => road.ymd >= roadMonth && road.ymd < roadWeek).length}/>
                        <CountEvent name={"이전"}
                                    count={filteredData.filter(road => road.ymd < roadMonth).length}/>
                    </div>
                </div>

                <div className="event">
                    <h3>유형별 발생 건수</h3>
                    <div className="event_container">
                        <CountEvent name={"포트홀"}
                                    count={filteredData.filter(road => road.roadreport_damagetype === "pothole").length}/>
                        <CountEvent name={"크랙"}
                                    count={filteredData.filter(road => road.roadreport_damagetype === "crack").length}/>
                        <CountEvent name={"기타"}
                                    count={filteredData.filter(road => !["pothole", "crack"].includes(road.roadreport_damagetype)).length}/>
                    </div>
                </div>
            </div>

            <div className="map_container">
                <div id="map" ref={mapRef} style={{width: "100%", height: "720px", marginBottom: "10px"}}/>
            </div>
        </div>
    );
};

export default AdminData;
