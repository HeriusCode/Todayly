import axios from 'axios';

const normalizeApiUrl = (value) => {
  const url = String(value || '').trim().replace(/\/+$/, '');
  if (!url) return '';
  return /\/api$/i.test(url) ? url : `${url}/api`;
};

const configuredApiUrl = normalizeApiUrl(import.meta.env.VITE_API_URL);
const productionUsesLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(configuredApiUrl);

if (import.meta.env.PROD && (!configuredApiUrl || productionUsesLocalhost)) {
  throw new Error('VITE_API_URL production phải trỏ tới backend Render, không được dùng localhost.');
}

const api = axios.create({
  baseURL: configuredApiUrl || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Render free instances can need extra time to wake up before the first request.
  timeout: 90000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('todayly_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn
      localStorage.removeItem('todayly_token');
      localStorage.removeItem('todayly_user');
    }
    return Promise.reject(error);
  }
);

export default api;
