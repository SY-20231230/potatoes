import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import Dropdown from 'react-dropdown';
import './AdminManage.css';
import "react-dropdown/style.css";

const AdminManage = () => {
    const location = useLocation();
    const road_manage = location.state?.fetchedData || [];

    road_manage.forEach((road) => {
        if (road.roadreport_latlng) {
            const [lat, lng] = road.roadreport_latlng.split(",");
            road.lat = lat;
            road.lng = lng;
        } else {
            console.log(`num ${road.roadreport_num} latlng 없음`);
        }
    });

    road_manage.forEach((road) => {
        if (road.roadreport_time) {
            const [ymd, hms] = road.roadreport_time.split("T");
            road.ymd = ymd;
            road.hms = hms;
        }
    });

    const perPage = 10;

    const pagesPerGroup = 10;
    const [currentPage, setPage] = useState(1);

    const filteredData = road_manage.filter((road) => road.roadreport_image);

    const totalPages = Math.ceil(filteredData.length / perPage);
    const totalGroups = Math.ceil(totalPages / pagesPerGroup);
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);

    const groupStartPage = (currentGroup - 1) * pagesPerGroup + 1;
    const groupEndPage = Math.min(currentGroup * pagesPerGroup, totalPages);
    const startIndex = (currentPage - 1) * perPage;

    const currentData = filteredData.slice(startIndex, startIndex + perPage);

    const changePage = (page) => {
        setPage(page);
    };

    const goToPrevGroup = () => {
        if (currentGroup === 1) return;
        const prevGroupStartPage = (currentGroup - 2) * pagesPerGroup + 1;
        setPage(prevGroupStartPage);
    };

    const goToNextGroup = () => {
        if (currentGroup === totalGroups) return;
        const nextGroupStartPage = currentGroup * pagesPerGroup + 1;
        setPage(nextGroupStartPage);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const openModal = (image) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const changeStatus = async (status, report_num) => {
        console.log("변경 상태:", status.value);

        try {
            const response = await fetch(`/roadreport/delete/${report_num}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roadreport_status: status.value,
                }),
            });

            if (!response.ok) {
                throw new Error('상태 변경 실패');
            }

        } catch (error) {
            console.error('에러 발생:', error);
            alert('실패');
        }
    };

    const options = [
        {value: '접수됨', label: '접수됨'},
        {value: '처리중', label: '처리중'},
        {value: '해결됨', label: '해결됨'},
        {value: '보류중', label: '보류중'},
    ];

    return (
        <div className="admin_manage">
            <br/>
            <table className="data_table">
                <thead className="table_head">
                <tr>
                    <td>num</td>
                    <td>let,lng</td>
                    <td>image</td>
                    <td>damage_type</td>
                    <td>status</td>
                    <td>time</td>
                    <td>e.t.c</td>
                </tr>
                </thead>
                <tbody className="table_body">
                {currentData
                    .filter((road) => road.roadreport_image)
                    .map((road, index) => (
                        <tr key={index}>
                            <td className="num">{road.roadreport_num}</td>
                            <td className="id">위도: {road.lat}, <br/>경도: {road.lng}</td>
                            <td className="image">
                                <img
                                    src={`http://192.168.0.157:8000/${road.roadreport_image}`}
                                    alt={`img${startIndex + index}`}
                                    className="clickable-image"
                                    onClick={() => openModal(`http://192.168.0.157:8000/${road.roadreport_image}`)}
                                />
                            </td>
                            <td className="damage_type">{road.roadreport_damagetype}</td>
                            <td className="status">
                                <Dropdown
                                    options={options}
                                    value={road.roadreport_status}
                                    onChange={(status) => changeStatus(status, road.roadreport_num)}
                                />
                            </td>
                            <td className="time">{road.ymd + " " + road.hms}</td>
                            <td className="edit">
                                <button>위치</button>
                                <button>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={goToPrevGroup}
                    disabled={currentGroup === 1}
                >
                    &lt;
                </button>

                {Array.from(
                    {length: groupEndPage - groupStartPage + 1},
                    (_, index) => {
                        const pageNumber = groupStartPage + index;
                        return (
                            <button
                                key={pageNumber}
                                className={`page_button ${currentPage === pageNumber ? 'active' : ''}`}
                                onClick={() => changePage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        );
                    }
                )}

                <button
                    onClick={goToNextGroup}
                    disabled={currentGroup === totalGroups}
                >
                    &gt;
                </button>
            </div>

            {isModalOpen && (
                <div className="modal-background" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>X</button>
                        <img src={modalImage} alt={`img${startIndex + currentPage}`} className="modal-image"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManage;
