import React from "react";
import MyNavbar from "../components/Navbar";


const MainLayout = ({children}) => {
    return (
        <div className="h-screen">
        <MyNavbar />
        {children}
        </div>
    );
};

export default MainLayout;