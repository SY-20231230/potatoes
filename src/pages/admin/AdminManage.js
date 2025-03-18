import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import Dropdown from 'react-dropdown';
import './AdminManage.css';
import "react-dropdown/style.css";

const AdminManage = () => {

    const location = useLocation();
    const reports = location.state?.fetchedData || [];

    console.log("AdminManage 데이터: ", reports);

    const perPage = 10;
    const [currentPage, setPage] = useState(1);

    const totalPages = Math.ceil(reports.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const currentData = reports.slice(startIndex, startIndex + perPage);

    const changePage = (page) => {
        setPage(page);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const open_modal = (image) => {
        setModalImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                    <td>region</td>
                    <td>e.t.c</td>
                </tr>
                </thead>
                <tbody className="table_body">
                {currentData.map((road, index) => (
                    <tr key={index}>
                        <td className="num">{road.roadreport_num}</td>
                        <td className="id">{road.roadreport_id}</td>
                        <td className="image">
                            <img
                                src={road.roadreport_image}
                                alt={`image ${startIndex + index}`}
                                className="clickable-image"
                                onClick={() => open_modal(road.roadreport_image)}
                            />
                        </td>
                        <td className="damage_type">{road.roadreport_damagetype}</td>
                        <td className="status">
                            <Dropdown options={options} value={road.roadreport_status}/>
                        </td>
                        <td className="time">{road.roadreport_time}</td>
                        <td className="region">{road.roadreport_region || '-'}</td>
                        <td className="edit">
                            <button>위치</button>
                            <button>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({length: totalPages}, (_, index) => (
                    <button key={index} className={`page_button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => changePage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-background" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>X</button>
                        <img src={modalImage} alt="Modal" className="modal-image"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminManage;
