import React from "react";

const NotFound = () => {

    return (
        <div className="not_found" style={{ textAlign: "center"}}>
            <div>
                <span style={{ fontSize: "3vw", fontWeight: "bold" }}>404 Not Found</span>
                <p style={{ fontSize: "2vw", fontWeight: "bold" }}>페이지를 찾을 수 없습니다.</p>
            </div>
        </div>
    );
};

export default NotFound;
