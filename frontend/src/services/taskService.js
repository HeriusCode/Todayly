import api from './api';

export const taskService = {
  getAll: async (params = {}) => {
    const token = localStorage.getItem('todayly_token');
    if (!token || token.split('.').length !== 3) return [];
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  create: async (task) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  update: async (id, updates) => {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  },

  toggleComplete: async (id, completed) => {
    const response = await api.patch(`/tasks/${id}/toggle`, { completed });
    return response.data;
  },

  incrementPomodoro: async (id) => {
    const response = await api.patch(`/tasks/${id}/pomodoro`);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
