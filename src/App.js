import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

import Layout from "./layout/Layout"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import Directions from "./pages/navi/Directions"
import Porthole from "./pages/navi/Porthole"

import User_settings from "./pages/user/User_settings"
import User_like from "./pages/user/User_like"
import User_report from "./pages/user/User_report"
import User_history from "./pages/user/User_history"

import Admin_data from "./pages/admin/Admin_data"
import Admin_manage from "./pages/admin/Admin_manage"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<Layout><Signup/></Layout>}></Route>

                {/*홈페이지*/}
                <Route path="/" element={<Layout><Homepage/></Layout>}></Route>

                {/*내비게이션*/}
                <Route path="/navi" element={<Layout><Directions/></Layout>}></Route>
                <Route path="/navi/porthole" element={<Layout><Porthole/></Layout>}></Route>

                {/*회원*/}
                <Route path="/user" element={<Layout><User_settings/></Layout>}></Route>
                <Route path="/user/like" element={<Layout><User_like/></Layout>}></Route>
                <Route path="/user/report" element={<Layout><User_report/></Layout>}></Route>
                <Route path="/user/history" element={<Layout><User_history/></Layout>}></Route>

                {/*관리자*/}
                <Route path="/admin/data" element={<Layout><Admin_data/></Layout>}></Route>
                <Route path="/admin/manage" element={<Layout><Admin_manage/></Layout>}></Route>
            </Routes>
        </Router>


    )
        ;
}

export default App
