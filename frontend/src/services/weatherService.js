import api from './api';

const getPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Trình duyệt không hỗ trợ định vị.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    });
  });

export const weatherService = {
  getCurrentForDevice: async () => {
    const position = await getPosition();
    const response = await api.get('/weather/current', {
      params: {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      },
    });
    return response.data;
  },
};
