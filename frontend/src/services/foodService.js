import api from './api';
import { mockFoods } from '../data/mockFoods';

export const foodService = {
  getAll: async (params = {}) => {
    try {
      const res = await api.get('/foods', { params });
      return (res.data && res.data.length > 0) ? res.data : mockFoods;
    } catch {
      return mockFoods;
    }
  },
  getById: async (id) => {
    try {
      const res = await api.get(`/foods/${id}`);
      return res.data;
    } catch {
      return mockFoods.find((f) => f.id === id) || mockFoods[0];
    }
  }
};
