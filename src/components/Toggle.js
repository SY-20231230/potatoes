import React, {useState} from "react";
import "./Toggle.css";

const Toggle = ({label, is_on, set_is_on}) => {
    const click_toggle = () => {
        set_is_on(!is_on);
    };

    return (
        <button
            className={`toggle_button ${is_on ? "on" : "off"}`}
            onClick={click_toggle}>
            {label}
        </button>
    );
};

export default Toggle;
