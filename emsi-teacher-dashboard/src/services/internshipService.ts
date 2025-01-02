import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface Encadrant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  departement: string;
}

export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  filiere: string;
}

export interface Stage {
  id: number;
  sujet: string;
  description: string;
  type: 'PFE' | 'PFA';
  dateDebut: string;
  dateFin: string;
  status: 'EN_COURS' | 'TERMINE' | 'EN_ATTENTE';
  etudiant?: Etudiant;
  encadrant?: Encadrant;
}

const stageService = {
  // Obtenir tous les stages
  async getStages(type?: 'PFE' | 'PFA'): Promise<Stage[]> {
    try {
      const response = await axiosInstance.get('/stages', {
        params: { type }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des stages:', error);
      throw error;
    }
  },

  // Obtenir un stage spécifique
  async getStage(id: number): Promise<Stage> {
    try {
      const response = await axiosInstance.get(`/stages/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du stage:', error);
      throw error;
    }
  },

  // Créer un nouveau stage
  async createStage(stageData: Partial<Stage>): Promise<Stage> {
    try {
      const response = await axiosInstance.post('/stages', stageData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du stage:', error);
      throw error;
    }
  },

  // Mettre à jour un stage
  async updateStage(id: number, stageData: Partial<Stage>): Promise<Stage> {
    try {
      const response = await axiosInstance.put(`/stages/${id}`, stageData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stage:', error);
      throw error;
    }
  },

  // Supprimer un stage
  async deleteStage(id: number): Promise<void> {
    try {
      await axiosInstance.delete(`/stages/${id}`);
    } catch (error) {
      console.error('Erreur lors de la suppression du stage:', error);
      throw error;
    }
  },

  // Assigner un étudiant à un stage
  async assignerEtudiant(stageId: number, etudiantId: number): Promise<Stage> {
    try {
      const response = await axiosInstance.post(`/stages/${stageId}/etudiant/${etudiantId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'assignation de l\'étudiant:', error);
      throw error;
    }
  },

  // Assigner un encadrant à un stage
  async assignerEncadrant(stageId: number, encadrantId: number): Promise<Stage> {
    try {
      const response = await axiosInstance.post(`/stages/${stageId}/encadrant/${encadrantId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'assignation de l\'encadrant:', error);
      throw error;
    }
  }
};

export default stageService;
