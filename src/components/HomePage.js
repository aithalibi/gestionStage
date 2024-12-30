<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/course.png'; 
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content-section">
        <div className="image-section">
          <img src={studentImage} alt="Students" />
        </div>
        <div className="text-section">
          <h1>Bienvenue à EMSI PFE ET PFA</h1>
          <p>
            Cette plateforme est conçue pour la gestion des stages, PFE et PFA de l'EMSI. 
            Simplifiez la gestion académique, organisez les classes, et ajoutez des étudiants et des encadrants.
          </p>
          <button 
            className="connexion-button"
            onClick={() => navigate('/login')}
          >
            CONNEXION
          </button>
        </div>
=======
import React from "react";
import logo from "../assets/course.png"; 
import "./HomePage.css"
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

function HomePage() {
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleLoginClick = () => {
    navigate('/LoginPage'); // Redirige vers la page login
  };
  return (
    <div className="container">
      <div className="image-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="text-container">
        <h1>Welcome to EMSI PFE AND PFA</h1>
        <p>
          Cette plateforme est conçue pour la gestion des stages, PFE et PFA de l'EMSI. 
          Simplifiez la gestion académique, organisez les classes, et ajoutez des étudiants et des encadrants.  
        </p>
        <button className="login-button" onClick={handleLoginClick}>LOGIN</button>
>>>>>>> f7bbfc1153de5eb6598ef0bb6d68b67a068ed807
      </div>
    </div>
  );
}

export default HomePage;
