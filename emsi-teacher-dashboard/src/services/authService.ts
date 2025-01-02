import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Changé pour le port 5000 qui est plus commun pour les backends Node.js

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
  };
}

// Configuration axios avec gestion des erreurs
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Essayons d'abord avec /api/auth/login
      try {
        const response = await axiosInstance.post('/api/auth/login', credentials);
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      } catch (firstError) {
        // Si la première tentative échoue, essayons avec /auth/login
        const response = await axiosInstance.post('/auth/login', credentials);
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état
        throw new Error(error.response.data?.message || 'Identifiants invalides');
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        throw new Error('Le serveur ne répond pas. Veuillez vérifier votre connexion.');
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        throw new Error('Erreur de configuration de la requête');
      }
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser()?.token;
  },

  getToken(): string | null {
    return this.getCurrentUser()?.token || null;
  },

  isTeacher(): boolean {
    return this.getCurrentUser()?.user.role === 'teacher';
  },

  isStudent(): boolean {
    return this.getCurrentUser()?.user.role === 'student';
  },

  isAdmin(): boolean {
    return this.getCurrentUser()?.user.role === 'admin';
  },

  getRedirectPath(): string {
    const user = this.getCurrentUser();
    if (!user) return '/login';
    
    switch (user.user.role) {
      case 'teacher':
        return '/teacher-dashboard';
      case 'student':
        return '/student-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/login';
    }
  }
};

// Intercepteur pour ajouter le token à toutes les requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authService;
