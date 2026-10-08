import { mockFoods } from '../data/mockFoods';

export const foodService = {
  getAll: async () => mockFoods,
  getById: async (id) => mockFoods.find((food) => food.id === id) || null,
};
