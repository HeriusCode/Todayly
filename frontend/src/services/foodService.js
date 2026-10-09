import api from './api';

const nearbyRequests = new Map();

const getPosition = () => new Promise((resolve) => {
  if (!navigator.geolocation) {
    resolve({ coords: { latitude: 21.0285, longitude: 105.8542 } });
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => resolve(pos),
    () => {
      // Graceful fallback to center coordinates if user denies or times out
      resolve({ coords: { latitude: 21.0285, longitude: 105.8542 } });
    },
    {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 300000,
    }
  );
});

export const foodService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/foods', { params });
      return Array.isArray(response.data) ? response.data : [];
    } catch {
      return [];
    }
  },

  getNearby: async ({ lat, lon, radius = 10000, refresh = false }) => {
    const requestKey = [Number(lat).toFixed(4), Number(lon).toFixed(4), radius, refresh].join(':');
    if (nearbyRequests.has(requestKey)) return nearbyRequests.get(requestKey);

    const request = api.get('/foods/nearby', {
      params: { lat, lon, radius, refresh },
    }).then((response) => (Array.isArray(response.data) ? response.data : []));

    nearbyRequests.set(requestKey, request);
    try {
      return await request;
    } finally {
      window.setTimeout(() => nearbyRequests.delete(requestKey), 1500);
    }
  },

  getNearbyForDevice: async ({ radius = 10000, refresh = false } = {}) => {
    const position = await getPosition();
    return foodService.getNearby({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      radius,
      refresh,
    });
  },

  getById: async (id) => {
    const response = await api.get(`/foods/${id}`);
    return response.data;
  },
};
