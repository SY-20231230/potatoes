import React from "react";
import "./CountEvent.css";

const CountEvent = ({name, count}) => {
    return (
        <div className="count_event">
            <p>{name}</p>
            <b><span>{count}</span>&nbsp;건</b>
        </div>
    )
}
export default CountEvent;