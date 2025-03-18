import React, {useState} from "react";
import "./Toggle.css";

const Toggle = ({label, isOn, setIsOn}) => {
    const clickToggle = () => {
        setIsOn(!isOn);
    };

    return (
        <button
            className={`toggle_button ${isOn ? "on" : "off"}`}
            onClick={clickToggle}>
            {label}
        </button>
    );
};

export default Toggle;
