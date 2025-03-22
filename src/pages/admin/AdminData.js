import React from "react";
import './AdminData.css';

import CountEvent from "../../components/CountEvent";
import {useLocation} from "react-router-dom";

const AdminData = () => {

    // 데이터 연결되기 전까지 테스트용 난수 생성한 것 
    // 변수 넘기면 주석 처리하고 확인해주세요
    const generateRandomCount = () => {
        return Math.floor(Math.random() * 1000000).toLocaleString();
    };

    const location = useLocation();
    const roadData = location.state?.fetchedData || [];

    console.log("AdminData 데이터: ", roadData);

    const count = Array.from({length: 13}, generateRandomCount);
    return (
        <div className="admin_data">
            <div className="stack_event">
                <br/>
                <span>누적 발생 현황</span>
                <br/>
                <br/>
                <div className="event_container">
                    <CountEvent name={"전체"} count={count[0]}/>
                    <CountEvent name={"대기중"} count={count[1]}/>
                    <CountEvent name={"처리중"} count={count[2]}/>
                    <CountEvent name={"완료"} count={count[3]}/>
                </div>
            </div>
            <hr/>
            <div className="event">
                <h3>시간별 발생 건수</h3>
                <div className="event_container">
                    <CountEvent name={"오늘"} count={count[4]}/>
                    <CountEvent name={"최근 1주"} count={count[5]}/>
                    <CountEvent name={"최근 1달"} count={count[6]}/>
                </div>
            </div>
            <div className="event">
                <h3>지역별 발생 건수</h3>
                <div className="event_container">
                    <CountEvent name={"서울"} count={count[7]}/>
                    <CountEvent name={"수도권"} count={count[8]}/>
                    <CountEvent name={"지방"} count={count[9]}/>
                </div>
            </div>
            <div className="event">
                <h3>유형별 발생 건수</h3>
                <div className="event_container">
                    <CountEvent name={"포트홀"} count={count[10]}/>
                    <CountEvent name={"크랙"} count={count[11]}/>
                    <CountEvent name={"기타"} count={count[12]}/>
                </div>
            </div>
        </div>
    );
};

export default AdminData;
