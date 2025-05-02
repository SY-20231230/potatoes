import React from "react";
import {useLocation, Route, Outlet} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import routes from "../../App.js";
import sidebarImage from "../../assets/img/sidebar-3.jpg";
import {useIsMapPage} from "../../pages/MapContext";

function Layout() {
    // const [image, setImage] = React.useState(sidebarImage);
    const [color, setColor] = React.useState("black");
    const isMap = useIsMapPage();
    const location = useLocation();
    const mainPanel = React.useRef(null);

    const noPaddingPaths = [
        "/dorosee",
        "/dorosee/direction"
    ];

    const isNoPadding = noPaddingPaths.includes(location.pathname);

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainPanel.current.scrollTop = 0;
        if (
            window.innerWidth < 993 &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
            var element = document.getElementById("bodyClick");
            element.parentNode.removeChild(element);
        }
    }, [location]);

    return (
        <div className="wrapper">
            <Sidebar color={color} routes={routes}/>
            <div
                className={`main-panel ${isNoPadding ? "no-padding" : ""}`}
                ref={mainPanel}
            >
                <Header/>
                <div className="content">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Layout;
