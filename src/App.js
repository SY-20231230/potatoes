import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import Admin_data from "./pages/Admin_data";
import Admin_manage from "./pages/Admin_manage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><Homepage/></Layout>}></Route>
                <Route path="/Admin/data" element={<Layout><Admin_data/></Layout>}></Route>
                <Route path="/Admin/manage" element={<Layout><Admin_manage/></Layout>}></Route>
            </Routes>
        </Router>


    )
        ;
}

export default App;
