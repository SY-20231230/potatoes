import React, {useState} from "react";
import './Admin_manage.css';
import Data from "../../Data_admin_manage";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";

// 샘플 데이터는 src/Data_admin_manage.js 위치에 있습니다.

const Admin_manage = () => {

    const per_page = 10;
    const [current_page, set_page] = useState(1);

    const total_pages = Math.ceil(Data.length / per_page);
    const start_index = (current_page - 1) * per_page;
    const current_data = Data.slice(start_index, start_index + per_page);

    const change_page = (page) => {
        set_page(page);
    };

    const [is_modal_open, set_is_modal_open] = useState(false);
    const [modal_image, set_modal_image] = useState("");

    const open_modal = (image) => {
        set_modal_image(image);
        set_is_modal_open(true);
    };

    const close_modal = () => {
        set_is_modal_open(false);
    };

    const options = [
        {value: '접수됨', label: '접수됨'},
        {value: '처리중', label: '처리중'},
        {value: '해결됨', label: '해결됨'},
        {value: '보류중', label: '보류중'},
    ];
    const defaultOption = options[0];


    return (
        <div className="admin_manage">
            <br/>
            <table className="data_table">
                <thead className="table_head">
                <tr>
                    <td>No</td>
                    <td>id</td>
                    <td>image</td>
                    <td>damage_type</td>
                    <td>status</td>
                    <td>time</td>
                    <td>region</td>
                    <td>edit</td>
                </tr>
                </thead>
                <tbody className="table_body">
                {current_data.map((roadreport, index) => (
                    <tr key={index}>
                        <td className="no">{start_index + index + 1}</td>
                        <td className="id">{roadreport.col1}</td>
                        <td className="image">
                            <img
                                src={`/images/${roadreport.col2}`}
                                alt={`image ${start_index + index}`}
                                className="clickable-image"
                                onClick={() => open_modal(`/images/${roadreport.col2}`)}
                            />
                        </td>
                        <td className="damage_type">{Array.isArray(roadreport.col3) ? roadreport.col3.join(', ') : roadreport.col3}</td>
                        <td className="status">
                            <Dropdown options={options} value={roadreport.col4} />
                        </td>
                        <td className="time">{roadreport.col5}</td>
                        <td className="region">{roadreport.col6}</td>
                        <td className="edit">
                            <button>수정</button>
                            <button>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({length: total_pages}, (_, index) => (
                    <button key={index} className={`page_button ${current_page === index + 1 ? 'active' : ''}`}
                            onClick={() => change_page(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>

            {is_modal_open && (
                <div className="modal-background" onClick={close_modal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={close_modal}>X</button>
                        <img src={modal_image} alt="Modal" className="modal-image"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin_manage;
