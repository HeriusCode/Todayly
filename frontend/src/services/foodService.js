import api from './api';

const nearbyRequests = new Map();

const getPosition = () => new Promise((resolve, reject) => {
  if (!navigator.geolocation) {
    reject(new Error('Trình duyệt không hỗ trợ định vị.'));
    return;
  }
  navigator.geolocation.getCurrentPosition(resolve, reject, {
    enableHighAccuracy: true,
    timeout: 12000,
    maximumAge: 300000,
  });
});

export const foodService = {
  getAll: async (params = {}) => {
    const response = await api.get('/foods', { params });
    return Array.isArray(response.data) ? response.data : [];
  },

  getNearby: async ({ lat, lon, radius = 8000, refresh = false }) => {
    const requestKey = [lat.toFixed(4), lon.toFixed(4), radius, refresh].join(':');
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

  getNearbyForDevice: async ({ radius = 8000, refresh = false } = {}) => {
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
