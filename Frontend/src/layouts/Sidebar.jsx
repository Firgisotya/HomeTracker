import {React, useState} from 'react'
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const handleActive = (menuPath) => {
    setActive(menuPath);
  };

  return (
    <>
        <aside
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
          >
            <div className="app-brand demo">
              <a className="app-brand-link">
                <span className="app-brand-logo demo">
                <img src="/assets/img/icons/hi.png" className="avatar" alt="Brand Logo" />
                </span>
                <span className="app-brand-text demo menu-text fw-bolder ms-2">
                  HomeTracker
                </span>
              </a>
              <a
                href="javascript:void(0);"
                className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
              >
                <i className="bx bx-chevron-left bx-sm align-middle" />
              </a>
            </div>
            <div className="menu-inner-shadow" />
            <ul className="menu-inner py-1">
              {/* Dashboard */}
              <li className={`menu-item ${active === "/dashboard" ? "active" : ""}`}>
                <Link to={'/dashboard'} className="menu-link" onClick={() => handleActive("/dashboard")}>
                  <i className="menu-icon tf-icons bx bx-home-circle" />
                  <div data-i18n="Analytics">Dashboard</div>
                </Link>
              </li>
              {/* Master */}
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Master</span>
              </li>
              <li className={`menu-item ${active === "/penghuni" ? "active" : ""}`}>
                <Link to={'/penghuni'} className="menu-link" onClick={() => handleActive("/penghuni")}>
                  <i className="menu-icon tf-icons bx bx-user" />
                  <div data-i18n="Analytics">Penghuni</div>
                </Link>
              </li>
              <li className={`menu-item ${active === "/rumah" ? "active" : ""}`}>
                <Link to={'/rumah'} className="menu-link" onClick={() => handleActive("/rumah")}>
                  <i className="menu-icon tf-icons bx bx-home" />
                  <div data-i18n="Analytics">Rumah</div>
                </Link>
              </li>
              {/* <li className={`menu-item ${active === "/penghuni_rumah" ? "active" : ""}`}>
                <Link to={'/penghuni_rumah'} className="menu-link" onClick={() => handleActive("/penghuni_rumah")}>
                  <i className="menu-icon tf-icons bx bx-home-heart" />
                  <div data-i18n="Analytics">Penghuni Rumah</div>
                </Link>
              </li> */}
              {/* End Master */}
              {/* Report */}
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Report</span>
              </li>
              <li className={`menu-item ${active === "/report_summary" ? "active" : ""}`}>
                <Link to={'/report_summary'} className="menu-link" onClick={() => handleActive("/report_summary")}>
                  <i className="menu-icon tf-icons bx bx-bar-chart-square" />
                  <div data-i18n="Analytics">Report Summary</div>
                </Link>
              </li>
              {/* End Report */}
              {/* Transaction */}
              <li className="menu-header small text-uppercase">
                <span className="menu-header-text">Transaction</span>
              </li>
              <li className={`menu-item ${active === "/pembayaran" ? "active" : ""}`}>
                <Link to={'/pembayaran'} className="menu-link" onClick={() => handleActive("/pembayaran")}>
                  <i className="menu-icon tf-icons bx bx-wallet" />
                  <div data-i18n="Analytics">Pembayaran</div>
                </Link>
              </li>
              <li className={`menu-item ${active === "/pengeluaran" ? "active" : ""}`}>
                <Link to={'/pengeluaran'} className="menu-link" onClick={() => handleActive("/pengeluaran")}>
                  <i className="menu-icon tf-icons bx bx-wallet" />
                  <div data-i18n="Analytics">Pengeluaran</div>
                </Link>
              </li>
              {/* End Transaction */}
            </ul>
          </aside>
    </>
  )
}

export default Sidebar