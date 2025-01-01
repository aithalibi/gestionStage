// api.js
const API_URL = 'http://localhost:5000/api';

export const getEtudiants = async () => {
    const response = await fetch(`${API_URL}/etudiants`);
    return response.json();
};

export const createEtudiant = async (etudiant) => {
    const response = await fetch(`${API_URL}/etudiants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(etudiant)
    });
    return response.json();
};

export const updateEtudiant = async (id, etudiant) => {
    const response = await fetch(`${API_URL}/etudiants/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(etudiant)
    });
    return response.json();
};

export const deleteEtudiant = async (id) => {
    const response = await fetch(`${API_URL}/etudiants/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};