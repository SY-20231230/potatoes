import React, {useState} from "react";
import './Admin_manage.css';
import Data from "../Data_admin_manage";

const Admin_manage = () => {
    // 페이지당 데이터 수
    const per_page = 10;

    // 현재 페이지 상태
    const [current_page, set_page] = useState(1);

    // 데이터 계산
    const total_pages = Math.ceil(Data.length / per_page);
    const start_index = (current_page - 1) * per_page;
    const current_data = Data.slice(start_index, start_index + per_page);

    // 페이지 변경 함수
    const change_page = (page) => {
        set_page(page);
    };

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
                </tr>
                </thead>
                <tbody className="table_body">
                {current_data.map((row, index) => (
                    <tr key={index}>
                        <td className="no">{start_index + index + 1}</td>
                        <td className="id">{row.col1}</td>
                        <td className="image">
                            <img src="images/pothole.jpg" alt={`image ${index}`} style={{width: '50px', cursor: 'pointer'}} onClick={row.col2}/></td>
                        <td className="damage_type">{row.col3}</td>
                        <td className="status">{row.col4}</td>
                        <td className="time">{row.col5}</td>
                        <td className="region">{row.col6}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({length: total_pages}, (_, index) => (
                    <button key={index} className={`page_button ${current_page === index + 1 ? 'active' : ''}`}
                            onClick={() => change_page(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Admin_manage;
