import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="toolbar">
        <h6 className="navbar-title">Gestion des PFE/PFA</h6>
        <div className="navbar-actions">
          <FontAwesomeIcon icon={faBell} className="notification-icon" />
          <button className="btn-login">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
