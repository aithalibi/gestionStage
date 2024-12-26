import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/SidebarStyle.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/about">About</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/analytics">Analytics</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
