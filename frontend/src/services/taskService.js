import api from './api';
import { cachedRequest, clearRequestCache, paramsKey } from './requestCache';

const invalidateTasks = () => clearRequestCache('tasks:');

export const taskService = {
  getAll: async (params = {}) => {
    const token = localStorage.getItem('todayly_token');
    if (!token || token.split('.').length !== 3) return [];
    return cachedRequest(
      `tasks:${token.slice(-16)}:${paramsKey(params)}`,
      async () => {
        const response = await api.get('/tasks', { params });
        return response.data;
      },
      { ttl: 15_000 },
    );
  },

  create: async (task) => {
    const response = await api.post('/tasks', task);
    invalidateTasks();
    return response.data;
  },

  update: async (id, updates) => {
    const response = await api.put(`/tasks/${id}`, updates);
    invalidateTasks();
    return response.data;
  },

  toggleComplete: async (id, completed) => {
    const response = await api.patch(`/tasks/${id}/toggle`, { completed });
    invalidateTasks();
    return response.data;
  },

  incrementPomodoro: async (id) => {
    const response = await api.patch(`/tasks/${id}/pomodoro`);
    invalidateTasks();
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    invalidateTasks();
    return response.data;
  },
};
