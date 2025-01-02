import API_BASE_URL from '../config/api.config';

export const getStages = async (type) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stages${type ? `?type=${type}` : ''}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des stages');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des stages:', error);
        throw error;
    }
};

export const createStage = async (stage) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stage)
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création du stage');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la création du stage:', error);
        throw error;
    }
};

export const updateStage = async (id, stage) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(stage)
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du stage');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la mise à jour du stage:', error);
        throw error;
    }
};

export const deleteStage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/stages/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du stage');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la suppression du stage:', error);
        throw error;
    }
};
