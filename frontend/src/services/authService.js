import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data?.token) {
      localStorage.setItem('todayly_token', response.data.token);
      localStorage.setItem('todayly_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data?.token) {
      localStorage.setItem('todayly_token', response.data.token);
      localStorage.setItem('todayly_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    if (response.data) {
      localStorage.setItem('todayly_user', JSON.stringify(response.data));
    }
    return response.data;
  },

  updatePreferences: async (preferences) => {
    const response = await api.put('/auth/preferences', preferences);
    if (response.data) {
      localStorage.setItem('todayly_user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('todayly_token');
    localStorage.removeItem('todayly_user');
  }
};
