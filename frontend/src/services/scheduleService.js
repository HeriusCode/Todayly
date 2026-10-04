import api from './api';
import { mockSchedule } from '../data/mockSchedule';

export const scheduleService = {
  getToday: async () => {
    try {
      const res = await api.get('/schedules/today');
      return (res.data && res.data.timeline) ? res.data : mockSchedule;
    } catch {
      return mockSchedule;
    }
  },
  addItem: async (item) => {
    try {
      const res = await api.post('/schedules/items', item);
      return res.data;
    } catch {
      return { id: 'sch-' + Date.now(), ...item };
    }
  },
  deleteItem: async (id) => {
    try {
      await api.delete(`/schedules/items/${id}`);
      return { success: true, id };
    } catch {
      return { success: true, id };
    }
  }
};
