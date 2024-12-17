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
      </div>
    </div>
  );
}

export default HomePage;
