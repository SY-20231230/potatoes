import React from "react";
import './Admin_data.css';

import Count_event from "../components/Count_event";

const Admin_data = () => {

    // 데이터 연결되기 전까지 테스트용 난수 생성
    const generate_random_count = () => {
        return Math.floor(Math.random() * 1000000).toLocaleString();
    };

    const count = Array.from({length: 13}, generate_random_count);
    return (
        <div className="admin_data">
            <div className="stack_event">
                <br/>
                <span>누적 발생 현황</span>
                <br/>
                <br/>
                <div className="event_container">
                    <Count_event name={"전체"} count={count[0]}/>
                    <Count_event name={"대기중"} count={count[1]}/>
                    <Count_event name={"처리중"} count={count[2]}/>
                    <Count_event name={"완료"} count={count[3]}/>
                </div>
            </div>

            <hr/>

            <div className="event">
                <h3>시간별 발생 건수</h3>
                <div className="event_container">
                    <Count_event name={"오늘"} count={count[4]}/>
                    <Count_event name={"최근 1주"} count={count[5]}/>
                    <Count_event name={"최근 1달"} count={count[6]}/>
                </div>
            </div>
            <div className="event">
                <h3>지역별 발생 건수</h3>
                <div className="event_container">
                    <Count_event name={"서울"} count={count[7]}/>
                    <Count_event name={"수도권"} count={count[8]}/>
                    <Count_event name={"지방"} count={count[9]}/>
                </div>
            </div>
            <div className="event">
                <h3>유형별 발생 건수</h3>
                <div className="event_container">
                    <Count_event name={"포트홀"} count={count[10]}/>
                    <Count_event name={"크랙"} count={count[11]}/>
                    <Count_event name={"기타"} count={count[12]}/>
                </div>
            </div>
        </div>
    );
};

export default Admin_data;
