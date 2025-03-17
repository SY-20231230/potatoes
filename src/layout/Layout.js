import React from "react";
import { Outlet } from "react-router-dom";  // ★ 추가
import './Layout.css';

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
    return (
        <div>
            <Sidebar />
            <Header />

            <main className="main_content">
                <div className="content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
