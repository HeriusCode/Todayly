import api from './api';
import { mockTasks } from '../data/mockTasks';

export const taskService = {
  getAll: async () => {
    try {
      const res = await api.get('/tasks');
      return (res.data && res.data.length > 0) ? res.data : mockTasks;
    } catch {
      return mockTasks;
    }
  },
  create: async (task) => {
    try {
      const res = await api.post('/tasks', task);
      return res.data;
    } catch {
      return { id: 't-' + Date.now(), ...task, completed: false };
    }
  },
  toggleComplete: async (id, completed) => {
    try {
      const res = await api.patch(`/tasks/${id}/toggle`, { completed });
      return res.data;
    } catch {
      return { id, completed };
    }
  },
  delete: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      return { success: true, id };
    } catch {
      return { success: true, id };
    }
  }
};
