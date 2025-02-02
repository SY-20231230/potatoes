import React from "react";
import './Layout.css';

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = (props: { children: React.ReactNode }) => {
    return (
        <div>
            <Sidebar />
            <Header />

            <main className="main_content">
                <div className="content">{props.children}</div>
            </main>
        </div>
    );
}

export default Layout;
