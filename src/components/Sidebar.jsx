import React from 'react'
import { NavLink } from 'react-router-dom';

// function Sidebar() {
//     return (
//       <div className="sidebar">
//         <h2 className="sidebar-title">Postman</h2>
//         <ul className="sidebar-menu">
//           <li>Dashboard</li>
//           <li>Collections</li>
//           <li>Environments</li>
//           <li>Favorites</li>
//           <li>Settings</li>
//         </ul>
//       </div>
//     )
//   }

// function Sidebar({ isOpen ,closeSidebar}) {
//     return (
//       <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//         {/* Sidebar content */}
//         <div className="sidebar-header">
//         <h2 className="sidebar-title">Postman</h2>
//         <span onClick={closeSidebar}>X</span>
//         </div>
//         <ul className="sidebar-menu">
//            <li>Dashboard</li>
//            <li>Collections</li>
//            <li>Environments</li>
//            <li>Favorites</li>
//            <li>Settings</li>
//          </ul>
//       </div>
//     );
//   }
function Sidebar({ isOpen, closeSidebar, isAuthenticated, promptAuth }) {
    const handleItemClick = (item) => {
        if (item === 'Collections' || item === 'Favorites' || item == "Environments") {
          if (isAuthenticated) {
            console.log(`Navigating to ${item}`);
          } else {
            promptAuth();
          }
        } else {
          console.log(`Navigating to ${item}`);
        }
      };
    return (
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar content */}
        {/* <div className="sidebar-header">
          <h2 className="sidebar-title">Postman</h2>
          <span onClick={closeSidebar}>X</span>
        </div>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li onClick={() => isAuthenticated ? console.log('Collections') : promptAuth()}>Collections</li>
          <li>Environments</li>
          <li onClick={() => isAuthenticated ? console.log('Favorites') : promptAuth()}>Favorites</li>
          <li>Settings</li>
        </ul> */}

        <div className="sidebar-header p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold sidebar-title">Postman</h2>
                <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">X</button>
            </div>
            <ul className="sidebar-menu p-4">
                {/* <li className="mb-2 cursor-pointer" onClick={() => handleItemClick('Dashboard')}>Dashboard</li> */}
                <li>
          {/* <NavLink to="" className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink> */}
        </li>
                <li className="mb-2 cursor-pointer" onClick={() => handleItemClick('Collections')}>Collections</li>
                <li className="mb-2 cursor-pointer" onClick={() => handleItemClick('Environments')}>Environments</li>
                <li className="mb-2 cursor-pointer" onClick={() => handleItemClick('Favorites')}>Favorites</li>
                <li className="mb-2 cursor-pointer" onClick={() => handleItemClick('Settings')}>Settings</li>
            </ul>
      </div>
    );
  }
export default Sidebar