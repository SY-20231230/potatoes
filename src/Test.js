import React, {useEffect, useRef, useState} from "react";

const Test = () => {
    const naver = window.naver;
    const mapRef = useRef(null); // HTML 요소 참조
    const mapInstance = useRef(null); // naver map 인스턴스 저장용
    const infowindow = useRef(null); // 정보창

    // 상태값 관리
    const [interactionOn, setInteractionOn] = useState(true);
    const [controlsOn, setControlsOn] = useState(true);

    // 지도 초기화
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

        // zoom_changed 이벤트
        naver.maps.Event.addListener(map, "zoom_changed", (zoom) => {
            console.log("zoom:", zoom);
        });

        // init 이벤트 후에 옵션 접근
        naver.maps.Event.once(map, "init", () => {
            console.log("지도 초기화 완료");
            console.log("minZoom:", map.getOptions("minZoom"));
        });

        mapInstance.current = map; // 인스턴스 저장
        infowindow.current = new naver.maps.InfoWindow(); // 정보창 초기화

        // 위치 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
        } else {
            const center = map.getCenter();
            infowindow.current.setContent(
                `<div style="padding:20px;">
          <h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5>
        </div>`
            );
            infowindow.current.open(map, center);
        }

        // 지도 마커
        const HOME_PATH = window.HOME_PATH || '.';
        const position = new naver.maps.LatLng(37.3849483, 127.1229117);

        const markerOptions = {
            position: position.destinationPoint(90, 15),
            map: map,
            icon: {
                url: HOME_PATH + '/images/image2.jpg',
                size: new naver.maps.Size(50, 50),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(25, 25)
            }
        }

        const Marker = new naver.maps.Marker(markerOptions);

        function onSuccessGeolocation(position) {
            const location = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(location); // 지도 중심을 얻은 위치로 설정
            map.setZoom(10); // 줌 레벨 설정

            infowindow.current.setContent(`<div style="padding:20px;">geolocation.getCurrentPosition() 위치</div>`);
            infowindow.current.open(map, location);
            console.log("Coordinates:", location.toString());
        }

        function onErrorGeolocation() {
            const center = map.getCenter();
            infowindow.current.setContent(
                `<div style="padding:20px;">
          <h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>
          latitude: ${center.lat()}<br />longitude: ${center.lng()}
        </div>`
            );
            infowindow.current.open(map, center);
        }
    }, []);

    // 인터랙션 토글
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

    // 지도 컨트롤 토글
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
            <div
                id="map"
                ref={mapRef}
                style={{width: "93.9%", height: "725px", marginBottom: "10px"}}
            />
            <button onClick={toggleInteraction}>
                {interactionOn ? "Disable Interaction" : "Enable Interaction"}
            </button>
            <button onClick={toggleControls}>
                {controlsOn ? "Disable Controls" : "Enable Controls"}
            </button>
        </>
    );
};

export default Test;
