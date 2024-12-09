import React from "react";
import './Footer.css';
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="company">
                <FaRegCopyright size="12px"/>
                &nbsp;
                <b>도로See</b>
            </div>

        </footer>
    );
};

export default Footer;
