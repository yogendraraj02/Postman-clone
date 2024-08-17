// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// import { Navbar } from 'react-bootstrap';

function Layout({ isAuthenticated, toggleSidebar, promptAuth, isSidebarOpen }) {
  return (
    <div className="app-container">
      <Sidebar
        isAuthenticated={isAuthenticated} 
        closeSidebar={toggleSidebar} 
        isOpen={isSidebarOpen} 
        promptAuth={promptAuth}
      />
      <div className="main-area">
        <Navbar onMenuClick={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;