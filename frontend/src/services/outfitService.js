import api from './api';

export const outfitService = {
  getAll: async (params = {}) => {
    try {
      const res = await api.get('/outfits', { params: { limit: 100, ...params } });
      return res.data;
    } catch (error) {
      console.warn('Lỗi tải dữ liệu outfits:', error);
      return { count: 0, outfits: [], timeline: {} };
    }
  },

  getByActivity: async (activity, params = {}) => {
    try {
      const res = await api.get('/outfits', { params: { activity, ...params } });
      return res.data?.outfits || [];
    } catch {
      return [];
    }
  },

  getTimeline: async () => {
    try {
      const res = await api.get('/outfits/timeline');
      return res.data;
    } catch {
      return null;
    }
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/outfits/${id}`);
      return res.data;
    } catch {
      return null;
    }
  },

  crawlNew: async () => {
    try {
      const res = await api.post('/outfits/crawl');
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
