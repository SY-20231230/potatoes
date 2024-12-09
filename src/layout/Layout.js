import React from "react";
import './Layout.css'

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = (props: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <Sidebar/>
            <Header/>

            <main>
                {props.children}
            </main>

            <Footer/>
        </div>
    )
}

export default Layout