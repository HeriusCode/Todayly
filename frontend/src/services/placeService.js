import { mockPlaces } from '../data/mockPlaces';

export const placeService = {
  getAll: async () => mockPlaces,
  getById: async (id) => mockPlaces.find((place) => place.id === id) || null,
};
