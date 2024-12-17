import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import ProfesseurCrud from "./components/ProfesseurCrud";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState(""); // État pour suivre la page active

  const handleMenuClick = (menuName) => {
    setActivePage(menuName); // Mettre à jour la page active selon le menu cliqué
    console.log(`Menu sélectionné : ${menuName}`);
  };

  return (
    <Router>
      <Routes>
        {/* Route pour HomePage */}
        <Route path="/" element={<HomePage />} />

        {/* Route pour Dashboard avec Sidebar et Navbar */}
        <Route
          path="/dashboard"
          element={
            <div>
              <Navbar />
              <div className="app-container">
                <Sidebar onMenuClick={handleMenuClick} />
                <MainContent>
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
                </MainContent>
              </div>
            </div>
          }
        />

        {/* Route pour LoginPage */}
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
