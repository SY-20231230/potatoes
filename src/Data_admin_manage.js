// 데이터 연결되기 전까지 테스트용 난수 생성

    const generate_random_count = () => {
        return Math.floor(Math.random() * 10000);
    };

    const ran = Array.from({ length: 5 }, generate_random_count);

const road_report = [
    {
        col1: ran[0],
        col2: 'image1.jpg',
        col3: 'Pothole',
        col4: '보류중',
        col5: '2024-12-01 12:30',
        col6: '서울',
    },
    {
        col1: ran[1],
        col2: 'image2.jpg',
        col3: 'Crack',
        col4: '처리중',
        col5: '2024-12-02 08:45',
        col6: '부산',
    },
    {
        col1: ran[2],
        col2: 'image3.jpg',
        col3: 'Flooded',
        col4: '해결됨',
        col5: '2024-12-03 15:20',
        col6: '인천',
    },
    {
        col1: ran[3],
        col2: 'image4.jpg',
        col3: 'Debris',
        col4: '보류중',
        col5: '2024-12-04 10:10',
        col6: '대구',
    },
    {
        col1: ran[4],
        col2: 'image1.jpg',
        col3: 'Sinkhole',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '광주',
    },
    {
        col1: ran[4],
        col2: 'image5.jpg',
        col3: 'Sinkhole',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '광주',
    },
    {
        col1: ran[3],
        col2: 'image3.jpg',
        col3: 'Crack',
        col4: '진행중',
        col5: '2024-12-02 08:45',
        col6: '부산',
    },
    {
        col1: ran[1],
        col2: 'image2.jpg',
        col3: 'Crack',
        col4: '진행중',
        col5: '2024-12-02 08:45',
        col6: '부산',
    },
    {
        col1: ran[4],
        col2: 'image4.jpg',
        col3: 'Sinkhole',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '광주',
    },
    {
        col1: ran[4],
        col2: 'image5.jpg',
        col3: 'Sinkhole',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '서울',
    },
    {
        col1: ran[4],
        col2: 'image3.jpg',
        col3: 'Sinkhole',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '광주',
    },
    {
        col1: ran[1],
        col2: 'image2.jpg',
        col3: 'Crack',
        col4: '진행중',
        col5: '2024-12-02 08:45',
        col6: '부산',
    },
];

export default road_report;
