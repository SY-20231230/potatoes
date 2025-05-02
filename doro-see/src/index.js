import React from "react";
import ReactDOM from "react-dom/client";

import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/styles/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Layout from "./components/Layout/Layout.js";
import DamageMap from "./pages/DamageMap";
import Direction from "./pages/navi/Direction";
import AdminData from "./pages/admin/AdminData";
import AdminManage from "./pages/admin/AdminManage";
import User from "./pages/UserProfile";
import DoroseeLoader from "./pages/DoroseeLoader";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<DoroseeLoader />}/>

            <Route path="/dorosee" element={<Layout/>}>
                <Route path="loader" element={<DoroseeLoader />}/>

                <Route path="" element={<DamageMap/>}/>
                <Route path="direction" element={<Direction/>}/>

                <Route path="admin/data" element={<AdminData/>}/>
                <Route path="admin/manage" element={<AdminManage/>}/>

                <Route path="user/info" element={<User/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
);
