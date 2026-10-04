import api from './api';
import { mockOutfits } from '../data/mockOutfits';

export const outfitService = {
  getAll: async () => {
    try {
      const res = await api.get('/outfits');
      return (res.data && res.data.length > 0) ? res.data : mockOutfits;
    } catch {
      return mockOutfits;
    }
  }
};
