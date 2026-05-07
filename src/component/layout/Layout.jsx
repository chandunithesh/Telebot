import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app-layout">
      
      {!hideNavbar && <Navbar />}

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;