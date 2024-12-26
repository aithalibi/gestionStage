import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar'; // Assurez-vous que ce composant existe
import Navbar from './Components/Navbar';  // Assurez-vous que ce composant existe
import Home from './pages/Home';
import About from './pages/About';
import './CSS/SidebarStyle.css';
import './CSS/Navbar.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
      <Sidebar className="sidebar" />
        <div className="main-content">
        <Navbar className="navbar" />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
