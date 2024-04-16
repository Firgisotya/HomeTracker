import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Main = ({children}) => {
  return (
    <>
      {/* Layout wrapper */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          {/* Menu */}
          <Sidebar />
          {/* / Menu */}
          {/* Layout container */}
          <div className="layout-page">
            {/* Navbar */}
            <Navbar />
            {/* / Navbar */}
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                {children}
              </div>
              {/* / Content */}
              {/* Footer */}
              <Footer />
              {/* / Footer */}
              <div className="content-backdrop fade" />
            </div>
            {/* Content wrapper */}
          </div>
          {/* / Layout page */}
        </div>
        {/* Overlay */}
        <div className="layout-overlay layout-menu-toggle" />
      </div>
      {/* / Layout wrapper */}
    </>
  );
};

export default Main;
