import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Layout from "./layout/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home_map from "./components/Home_map";

import Search_result from "./pages/navi/Search_result";
import Place from "./pages/navi/Place_search";
import Directions from "./pages/navi/Directions";
import Porthole from "./pages/navi/Porthole";

import User_settings from "./pages/user/User_settings";
import User_like from "./pages/user/User_like";
import User_report from "./pages/user/User_report";
import User_history from "./pages/user/User_history";

import Admin_data from "./pages/admin/Admin_data";
import Admin_manage from "./pages/admin/Admin_manage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>

                    {/*홈페이지*/}
                    <Route path="/" element={<Layout><Home_map/></Layout>}/>

                    {/*세션 관리*/}
                    <Route path="/login" element={<Layout><Login/></Layout>}/>
                    <Route path="/signup" element={<Layout><Signup/></Layout>}/>

                    {/*내비게이션*/}
                    <Route path="/search" element={<Layout><Search_result/></Layout>}/>
                    <Route path="/place" element={<Layout><Place/></Layout>}/>

                    <Route path="/navi" element={<Layout><Directions/></Layout>}/>
                    <Route path="/navi/porthole" element={<Layout><Porthole/></Layout>}/>

                    {/*사용자*/}
                    <Route path="/user" element={<Layout><User_settings/></Layout>}/>
                    <Route path="/user/like" element={<Layout><User_like/></Layout>}/>
                    <Route path="/user/report" element={<Layout><User_report/></Layout>}/>
                    <Route path="/user/history" element={<Layout><User_history/></Layout>}/>

                    {/*관리자*/}
                    <Route path="/admin/data" element={<Layout><Admin_data/></Layout>}/>
                    <Route path="/admin/manage" element={<Layout><Admin_manage/></Layout>}/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
