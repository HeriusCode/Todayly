import api from './api';
import { mockPlaces } from '../data/mockPlaces';

export const placeService = {
  getAll: async (params = {}) => {
    try {
      const res = await api.get('/places', { params });
      return (res.data && res.data.length > 0) ? res.data : mockPlaces;
    } catch {
      return mockPlaces;
    }
  },
  getById: async (id) => {
    try {
      const res = await api.get(`/places/${id}`);
      return res.data;
    } catch {
      return mockPlaces.find((p) => p.id === id) || mockPlaces[0];
    }
  }
};
