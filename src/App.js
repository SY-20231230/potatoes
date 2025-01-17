import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Search_result from "./pages/navi/Search_result";

import Directions from "./pages/navi/Directions";
import Porthole from "./pages/navi/Porthole";

import User_settings from "./pages/user/User_settings";
import User_like from "./pages/user/User_like";
import User_report from "./pages/user/User_report";
import User_history from "./pages/user/User_history";

import Admin_data from "./pages/admin/Admin_data";
import Admin_manage from "./pages/admin/Admin_manage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout><Homepage /></Layout>,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Layout><Signup /></Layout>,
    },
    {
        path: "/search",
        element: <Layout><Search_result /></Layout>,
    },
    {
        path: "/navi",
        element: <Layout><Directions /></Layout>,
    },
    {
        path: "/navi/porthole",
        element: <Layout><Porthole /></Layout>,
    },
    {
        path: "/user",
        element: <Layout><User_settings /></Layout>,
    },
    {
        path: "/user/like",
        element: <Layout><User_like /></Layout>,
    },
    {
        path: "/user/report",
        element: <Layout><User_report /></Layout>,
    },
    {
        path: "/user/history",
        element: <Layout><User_history /></Layout>,
    },
    {
        path: "/admin/data",
        element: <Layout><Admin_data /></Layout>,
    },
    {
        path: "/admin/manage",
        element: <Layout><Admin_manage /></Layout>,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
