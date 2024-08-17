import React from 'react'

// function Navbar() {
//     return (
//       <nav className="navbar">
//         <div className="navbar-actions">
//           <span className="navbar-brand">Postman</span>
//           <button className="button">+</button>
//           <input type="text" placeholder="Search" className="search-input" />
//         </div>
//         <div className="navbar-actions">
//           <button className="button">🔔</button>
//           <button className="button">👤</button>
//         </div>
//       </nav>
//     )
//   }
  
function Navbar({onMenuClick}) {
    return (
      <nav className="navbar">
        <div className="menu-icon" onClick={onMenuClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span className="navbar-brand">Postman</span>
        <div className="navbar-actions">
          <button className="button">+</button>
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </nav>
    );
  }
export default Navbar