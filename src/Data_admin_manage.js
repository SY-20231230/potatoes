// 데이터 연결되기 전까지 테스트용 난수 생성

    const generate_random_count = () => {
        return Math.floor(Math.random() * 10000);
    };

    const ran = Array.from({ length: 13 }, generate_random_count);

const road_report = [
    {
        col1: ran[0],
        col2: 'image1.jpg',
        col3: ['크랙', '포트홀', '침수', '싱크홀', '싱크홀', '크랙', '침수'],
        col4: '보류중',
        col5: '2024-12-01 12:30',
        col6: '서울',
    },
    {
        col1: ran[1],
        col2: 'image2.jpg',
        col3: '크랙',
        col4: '처리중',
        col5: '2024-12-02 08:45',
        col6: '부산',
    },
    {
        col1: ran[2],
        col2: 'image3.jpg',
        col3: ['침수', '포트홀'],
        col4: '해결됨',
        col5: '2024-12-03 15:20',
        col6: '인천',
    },
    {
        col1: ran[3],
        col2: 'image4.jpg',
        col3: ['방해물', '포트홀'],
        col4: '보류중',
        col5: '2024-12-04 10:10',
        col6: '대구',
    },
    {
        col1: ran[4],
        col2: 'image1.jpg',
        col3: '싱크홀',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '광주',
    },
    {
        col1: ran[5],
        col2: 'image5.jpg',
        col3: '포트홀',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '광주',
    },
    {
        col1: ran[6],
        col2: 'image3.jpg',
        col3: '크랙',
        col4: '진행중',
        col5: '2024-12-02 08:45',
        col6: '인천',
    },
    {
        col1: ran[7],
        col2: 'image2.jpg',
        col3: '크랙',
        col4: '진행중',
        col5: '2024-12-02 08:45',
        col6: '부산',
    },
    {
        col1: ran[8],
        col2: 'image4.jpg',
        col3: '방해물',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '경기',
    },
    {
        col1: ran[9],
        col2: 'image5.jpg',
        col3: '싱크홀',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '서울',
    },
    {
        col1: ran[10],
        col2: 'image3.jpg',
        col3: '포트홀',
        col4: '해결됨',
        col5: '2024-12-05 09:00',
        col6: '광주',
    },
    {
        col1: ran[11],
        col2: 'image2.jpg',
        col3: '크랙',
        col4: '진행중',
        col5: '2024-12-02 08:45',
        col6: '부산',
    },
];

export default road_report;
