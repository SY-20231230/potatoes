import React from "react";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import Admin_data from "./pages/Admin_data";
import Admin_manage from "./pages/Admin_manage";

function App() {
    console.log("App.js 들어옴");
    return (
        <Layout>
            {/*<Homepage/>*/}
            {/*<Admin_data/>*/}
            <Admin_manage/>
        </Layout>
    );
}

export default App;
