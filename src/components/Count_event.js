import React from "react";
import "./Count_event.css";

const Count_event = ({name, count}) => {
    return (
        <div className="count_event">
            <p>{name}</p>
            <b><span>{count}</span>&nbsp;건</b>
        </div>
    )
}
export default Count_event;