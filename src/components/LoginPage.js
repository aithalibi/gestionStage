import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import studentImage from '../assets/course.png';
import { login } from '../api';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      // Rediriger vers le dashboard sans vérifier les identifiants
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img src={studentImage} alt="Students" />
        </div>
        <div className="login-form">
          <h1>Bienvenue à EMSI PFE ET PFA</h1>
          <p className="login-description">
            Cette plateforme est conçue pour la gestion des stages, PFE et PFA de l'EMSI. 
            Simplifiez la gestion académique, organisez les classes, et ajoutez des étudiants et des encadrants.
          </p>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
