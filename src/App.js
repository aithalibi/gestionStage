import React, { useState } from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
>>>>>>> f7bbfc1153de5eb6598ef0bb6d68b67a068ed807
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import ProfesseurCrud from "./components/ProfesseurCrud";
<<<<<<< HEAD
import StudentCrud from "./components/StudentCrud";
import TemplateViewer from "./components/TemplateViewer";
import ExaminateurCrud from "./components/ExaminateurCrud";
import RapporteurCrud from "./components/RapporteurCrud";
import EncadrantCrud from "./components/EncadrantCrud";
import StageCrud from "./components/StageCrud";
import Dashboard from "./components/Dashboard";
=======
>>>>>>> f7bbfc1153de5eb6598ef0bb6d68b67a068ed807

import "./App.css";

function App() {
<<<<<<< HEAD
  const [activePage, setActivePage] = useState("Dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleMenuClick = (menuName) => {
    setActivePage(menuName);
=======
  const [activePage, setActivePage] = useState(""); // État pour suivre la page active

  const handleMenuClick = (menuName) => {
    setActivePage(menuName); // Mettre à jour la page active selon le menu cliqué
    console.log(`Menu sélectionné : ${menuName}`);
>>>>>>> f7bbfc1153de5eb6598ef0bb6d68b67a068ed807
  };

  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/*"
          element={
            <div className="dashboard-container">
=======
        {/* Route pour HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Route pour Dashboard avec Sidebar et Navbar */}
        <Route
          path="/dashboard"
          element={
            <div>
>>>>>>> f7bbfc1153de5eb6598ef0bb6d68b67a068ed807
              <Navbar />
              <div className="app-container">
                <Sidebar onMenuClick={handleMenuClick} />
                <MainContent>
<<<<<<< HEAD
                  {activePage === "Dashboard" && <Dashboard />}
                  {activePage === "NosProfesseurs" && <ProfesseurCrud />}
                  {activePage === "NosEtudiants" && <StudentCrud />}
                  {activePage === "Templates" && <TemplateViewer />}
                  {activePage === "Examinateurs" && <ExaminateurCrud />}
                  {activePage === "Rapporteurs" && <RapporteurCrud />}
                  {activePage === "Encadrants" && <EncadrantCrud />}
                  {activePage === "NosStages" && <StageCrud />}
=======
                  {/* Affichage dynamique du contenu */}
                  {activePage === "NosProfesseurs" && <ProfesseurCrud />}
                  {activePage === "" && (
                    <>
                      <h1>Welcome, Yasmine Ait Halibi!</h1>
                      <p>
                        Emsi Donnons à nos élèves ingénieurs une formation de qualité et des expériences
                        qui les préparent au succès dans leurs carrières.
                      </p>
                      <div className="details">
                        <div>
                          <h3>1000%</h3>
                          <p>Totale des stages</p>
                        </div>
                        <div>
                          <h3>200%</h3>
                          <p>Total des professeurs</p>
                        </div>
                        <div>
                          <h3>300%</h3>
                          <p>Total des étudiants</p>
                        </div>
                      </div>
                    </>
                  )}
>>>>>>> f7bbfc1153de5eb6598ef0bb6d68b67a068ed807
                </MainContent>
              </div>
            </div>
          }
        />
<<<<<<< HEAD
=======

        {/* Route pour LoginPage */}
        <Route path="/LoginPage" element={<LoginPage />} />
>>>>>>> f7bbfc1153de5eb6598ef0bb6d68b67a068ed807
      </Routes>
    </Router>
  );
}

export default App;
