import api from './api';
import { cachedRequest, clearRequestCache, paramsKey } from './requestCache';

export const outfitService = {
  getAll: async (params = {}) => {
    try {
      const requestParams = { limit: 100, ...params };
      return await cachedRequest(
        `outfits:${paramsKey(requestParams)}`,
        async () => {
          const res = await api.get('/outfits', { params: requestParams });
          return res.data;
        },
        { ttl: 5 * 60_000, persist: true },
      );
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

  refreshFromDatabase: async (params = {}) => {
    clearRequestCache('outfits:');
    return outfitService.getAll(params);
  },
};
