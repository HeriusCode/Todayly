import api from './api';

const DEFAULT_COORDS = { latitude: 20.9786444, longitude: 105.7828063 }; // Hà Nội
const nearbyRequests = new Map();

let cachedPosition = null;

export const clearPositionCache = () => {
  cachedPosition = null;
};

export const getDevicePosition = async (forceRefresh = false) => {
  if (cachedPosition && !forceRefresh) return cachedPosition;

  // 1. Try Browser Geolocation API
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (p) => {
            resolve({
              coords: {
                latitude: p.coords.latitude,
                longitude: p.coords.longitude,
              },
              isFallback: false,
              source: 'gps',
            });
          },
          (err) => reject(err),
          {
            enableHighAccuracy: true,
            timeout: 4500,
            maximumAge: 60000,
          }
        );
      });
      cachedPosition = pos;
      return pos;
    } catch {
      // Browser location unavailable, fall through to IP detection
    }
  }

  // 2. Try IP-based Geolocation via backend API
  try {
    const res = await api.get('/places/my-location', { timeout: 4000 });
    if (res.data?.lat && res.data?.lon) {
      const pos = {
        coords: {
          latitude: Number(res.data.lat),
          longitude: Number(res.data.lon),
        },
        isFallback: false,
        source: 'ip',
      };
      cachedPosition = pos;
      return pos;
    }
  } catch {
    // Backend IP detection unavailable
  }

  // 3. Fallback to default Hanoi coordinates
  const fallbackPos = {
    coords: DEFAULT_COORDS,
    isFallback: true,
    source: 'default',
  };
  cachedPosition = fallbackPos;
  return fallbackPos;
};

export const placeService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/places', { params });
      return Array.isArray(response.data) ? response.data : response.data?.places || [];
    } catch {
      return [];
    }
  },

  getNearby: async ({ lat, lon, radius = 5000, category = 'all', refresh = false }) => {
    const requestKey = [Number(lat).toFixed(4), Number(lon).toFixed(4), radius, category, refresh].join(':');
    if (nearbyRequests.has(requestKey)) return nearbyRequests.get(requestKey);

    const request = api
      .get('/places/nearby', {
        params: { lat, lon, radius, category, refresh },
      })
      .then((response) => {
        if (Array.isArray(response.data?.places)) return response.data.places;
        if (Array.isArray(response.data)) return response.data;
        return [];
      });

    nearbyRequests.set(requestKey, request);
    try {
      return await request;
    } finally {
      window.setTimeout(() => nearbyRequests.delete(requestKey), 1500);
    }
  },

  getNearbyForDevice: async ({ radius = 5000, category = 'all', refresh = false, forceNewPosition = false } = {}) => {
    const position = await getDevicePosition(forceNewPosition);
    return placeService.getNearby({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      radius,
      category,
      refresh,
    });
  },

  getNearbyForDeviceWithMeta: async ({
    radius = 5000,
    category = 'all',
    refresh = false,
    forceNewPosition = false,
  } = {}) => {
    const position = await getDevicePosition(forceNewPosition);
    const lat = Number(position.coords.latitude);
    const lon = Number(position.coords.longitude);

    const response = await api.get('/places/nearby', {
      params: { lat, lon, radius, category, refresh },
    });

    const places = Array.isArray(response.data?.places)
      ? response.data.places
      : Array.isArray(response.data)
      ? response.data
      : [];

    const apiCenter = response.data?.meta?.center;

    return {
      places,
      center: {
        lat: Number(apiCenter?.lat ?? lat),
        lng: Number(apiCenter?.lon ?? lon),
      },
      radius: Number(response.data?.meta?.radius ?? radius),
      usedFallbackLocation: Boolean(position.isFallback),
      source: position.source,
    };
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/places/${id}`);
      return response.data;
    } catch {
      return null;
    }
  },
};
