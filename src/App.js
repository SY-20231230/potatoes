import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavermapsProvider} from 'react-naver-maps';

import Layout from "./layout/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeMap from "./components/HomeMap";

import SearchResult from "./pages/navi/SearchResult";

import Directions from "./pages/navi/Directions";
import RoadDamageMap from "./pages/navi/RoadDamageMap";

import UserInfo from "./pages/user/UserInfo";
import UserLike from "./pages/user/UserLike";
import UserReport from "./pages/user/UserReport";
import UserHistory from "./pages/user/UserHistory";

import AdminData from "./pages/admin/AdminData";
import AdminManage from "./pages/admin/AdminManage";

import NotFound from "./pages/NotFound";

import Test from "./Test";
import Test2 from "./Test2";

function App() {
    const naverMapClientId = process.env.REACT_APP_NAVER_MAP_API_KEY;

    console.log('네이버 맵 클라이언트 아이디:', naverMapClientId);

    return (
        <NavermapsProvider
            ncpClientId={naverMapClientId}
        >
            <BrowserRouter>
                <Routes>
                    {/* 홈페이지 */}
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomeMap/>}/>

                        {/* 세션 관리 */}
                        <Route path="users/login" element={<Login/>}/>
                        <Route path="users/signup" element={<Signup/>}/>

                        {/* 내비게이션 */}
                        <Route path="search/result" element={<SearchResult/>}/>

                        <Route path="directions" element={<Directions/>}/>
                        <Route path="damagemap" element={<RoadDamageMap/>}/>

                        {/* 사용자 */}
                        <Route path="user/info" element={<UserInfo/>}/>
                        <Route path="user/like" element={<UserLike/>}/>
                        <Route path="user/report" element={<UserReport/>}/>
                        <Route path="user/history" element={<UserHistory/>}/>

                        {/* 관리자 */}
                        <Route path="admin/data" element={<AdminData/>}/>
                        <Route path="admin/manage" element={<AdminManage/>}/>

                        {/* 404 오류 페이지 */}
                        <Route path="*" element={<NotFound/>}/>

                        {/* 테스트 페이지 */}
                        <Route path="test" element={<Test/>}/>
                        <Route path="test2" element={<Test2/>}/>

                    </Route>
                </Routes>
            </BrowserRouter>
        </NavermapsProvider>


    );
}

export default App;
