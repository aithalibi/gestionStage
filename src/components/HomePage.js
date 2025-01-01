import React from "react";
import studentImage from "../assets/course.png"; 
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // Consistent route name for login
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <img src={studentImage} alt="Logo" className="logo" />
      </div>
      <div className="text-container">
        <h1>Bienvenue à EMSI PFE ET PFA</h1>
        <p>
          Cette plateforme est conçue pour la gestion des stages, PFE et PFA de l'EMSI. 
          Simplifiez la gestion académique, organisez les classes, et ajoutez des étudiants et des encadrants.
        </p>
        <button className="login-button" onClick={handleLoginClick}>CONNEXION</button>
      </div>
    </div>
  );
}

export default HomePage;
