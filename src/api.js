// api.js

// Auth routes
export const login = async (credentials) => {
    try {
        console.log('Tentative de connexion avec:', credentials);
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur de connexion');
        }
        
        return response.json();
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error;
    }
};

// Student routes
export const getEtudiants = async () => {
    const response = await fetch('/api/etudiants');
    if (!response.ok) {
        throw new Error('Erreur de récupération des étudiants');
    }
    return response.json();
};

export const createEtudiant = async (etudiant) => {
    const response = await fetch('/api/etudiants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(etudiant)
    });
    if (!response.ok) {
        throw new Error('Erreur de création d\'étudiant');
    }
    return response.json();
};

export const updateEtudiant = async (id, etudiant) => {
    const response = await fetch(`/api/etudiants/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(etudiant)
    });
    if (!response.ok) {
        throw new Error('Erreur de mise à jour d\'étudiant');
    }
    return response.json();
};

export const deleteEtudiant = async (id) => {
    const response = await fetch(`/api/etudiants/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Erreur de suppression d\'étudiant');
    }
    return response.json();
};