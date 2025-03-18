// MarkerOption.js
const MarkerOption = ({ lat, lng, iconImg}) => {
    const naver = window.naver;
    return {
        position: new naver.maps.LatLng(lat, lng).destinationPoint(90, 15),
        icon: {
            url: window.HOME_PATH || '.' + iconImg,
            size: new naver.maps.Size(32, 32),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(16, 16),
        },
    };
};

export default MarkerOption;
