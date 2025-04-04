import React, {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import './AdminData.css';
import CountEvent from "../../components/CountEvent";

const AdminData = () => {
    const location = useLocation();
    const road_data = location.state?.fetchedData || [];

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
            center: new naver.maps.LatLng(35.846590, 127.844377),
            zoom: 7,
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
