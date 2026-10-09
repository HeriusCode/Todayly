import mongoose from 'mongoose';
import Food from '../models/Food.js';
import { isConnected } from '../config/db.js';

const DEFAULT_RADIUS = 8000;
const MAX_RADIUS = 15000;
const MAX_RESULTS = 100;
const GOOGLE_NEARBY_URL = 'https://places.googleapis.com/v1/places:searchNearby';
const OVERPASS_ENDPOINTS = [
  process.env.OVERPASS_URL,
  'https://overpass-api.de/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
].filter((value, index, values) => value && values.indexOf(value) === index);

const cuisineLabels = {
  vietnamese: 'Món Việt',
  regional: 'Đặc sản địa phương',
  noodle: 'Món sợi',
  noodles: 'Món sợi',
  seafood: 'Hải sản',
  coffee_shop: 'Cà phê',
  coffee: 'Cà phê',
  bakery: 'Bánh ngọt',
  burger: 'Burger',
  pizza: 'Pizza',
  chicken: 'Món gà',
  asian: 'Món Á',
  vegetarian: 'Món chay',
  ice_cream: 'Kem',
};

const requireDatabase = (res) => {
  if (isConnected) return true;
  res.status(503).json({
    message: 'MongoDB chưa kết nối nên chưa thể lưu dữ liệu quán ăn. Hãy kiểm tra MONGO_URI.',
  });
  return false;
};

const parseCoordinates = (query, res) => {
  const lat = Number(query.lat);
  const lon = Number(query.lon);
  const radius = Math.min(MAX_RADIUS, Math.max(500, Number(query.radius) || DEFAULT_RADIUS));
  if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lon) || lon < -180 || lon > 180) {
    res.status(400).json({ message: 'Tọa độ lat/lon không hợp lệ.' });
    return null;
  }
  return { lat, lon, radius };
};

const getPoint = (element) => {
  const lat = Number(element.lat ?? element.center?.lat);
  const lon = Number(element.lon ?? element.center?.lon);
  return Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon } : null;
};

const cleanAddress = (value = '') => value
  .split(',')
  .map((part) => part.trim())
  .filter((part) => part
    && !/^(unnamed road|đường không tên)$/i.test(part)
    && !/^[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}$/i.test(part))
  .join(', ');

const getAddress = (tags = {}) => {
  if (tags['addr:full']) return cleanAddress(tags['addr:full']);
  const street = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' ');
  return cleanAddress([
    street,
    tags['addr:neighbourhood'] || tags['addr:quarter'],
    tags['addr:suburb'] || tags['addr:district'],
    tags['addr:city'] || tags['addr:town'] || tags['addr:village'],
    tags['addr:province'],
  ].filter(Boolean).join(', '));
};

const getCategory = (tags = {}) => {
  const value = tags.amenity || tags.shop;
  if (value === 'cafe') return 'Cà phê';
  if (value === 'fast_food') return 'Đồ ăn nhanh';
  if (value === 'food_court') return 'Khu ẩm thực';
  if (value === 'ice_cream') return 'Kem & tráng miệng';
  if (value === 'bakery') return 'Tiệm bánh';
  return 'Quán ăn';
};

const getMealType = (tags = {}) => {
  const value = tags.amenity || tags.shop;
  if (value === 'cafe') return 'drink';
  if (value === 'ice_cream' || value === 'bakery') return 'snack';
  return 'lunch';
};

const getCuisines = (tags = {}) => (tags.cuisine || '')
  .split(/[;,]/)
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean)
  .map((value) => cuisineLabels[value] || value.replaceAll('_', ' '));

const getImage = (tags = {}) => {
  const value = tags.image || '';
  return /^https?:\/\//i.test(value) ? value : '';
};

const normalizeElement = (element, syncedAt) => {
  const point = getPoint(element);
  const tags = element.tags || {};
  const name = tags['name:vi'] || tags.name;
  if (!point || !name?.trim()) return null;
  const cuisines = getCuisines(tags);
  const category = getCategory(tags);
  return {
    updateOne: {
      filter: { source: 'openstreetmap', externalId: `${element.type}/${element.id}` },
      update: {
        $set: {
          osmType: element.type,
          name: name.trim(),
          category,
          mealType: getMealType(tags),
          cuisines,
          description: cuisines.length ? `${category} · ${cuisines.join(', ')}` : category,
          address: getAddress(tags),
          phone: tags.phone || tags['contact:phone'] || '',
          website: tags.website || tags['contact:website'] || '',
          image: getImage(tags),
          openingHours: tags.opening_hours || '',
          priceRange: tags.charge || '',
          location: { type: 'Point', coordinates: [point.lon, point.lat] },
          sourceUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
          attribution: '© OpenStreetMap contributors',
          rawTags: tags,
          active: true,
          lastSyncedAt: syncedAt,
        },
        $setOnInsert: { source: 'openstreetmap', externalId: `${element.type}/${element.id}` },
      },
      upsert: true,
    },
  };
};

const fetchOverpass = async ({ lat, lon, radius }) => {
  const query = `[out:json][timeout:25];(
    nwr["amenity"~"^(restaurant|fast_food|food_court)$"](around:${radius},${lat},${lon});
  );out center;`;
  const errors = [];

  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'User-Agent': `Todayly/1.0 (${process.env.OVERPASS_CONTACT || 'local-development'})`,
        },
        body: new URLSearchParams({ data: query }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      return Array.isArray(payload.elements) ? payload.elements : [];
    } catch (error) {
      errors.push(`${endpoint}: ${error.name === 'AbortError' ? 'timeout' : error.message}`);
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(errors.join(' | '));
};

const syncNearbyFoods = async (coordinates) => {
  const elements = await fetchOverpass(coordinates);
  const syncedAt = new Date();
  const operations = elements
    .map((element) => normalizeElement(element, syncedAt))
    .filter(Boolean);
  if (operations.length) await Food.bulkWrite(operations, { ordered: false });
  return operations.length;
};

const toRadians = (value) => value * Math.PI / 180;
const distanceBetween = (origin, destination) => {
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(destination.lat - origin.lat);
  const deltaLon = toRadians(destination.lon - origin.lon);
  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(toRadians(origin.lat)) * Math.cos(toRadians(destination.lat))
    * Math.sin(deltaLon / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const googlePriceLabels = {
  PRICE_LEVEL_FREE: 'Miễn phí',
  PRICE_LEVEL_INEXPENSIVE: 'Giá bình dân',
  PRICE_LEVEL_MODERATE: 'Giá vừa phải',
  PRICE_LEVEL_EXPENSIVE: 'Giá cao',
  PRICE_LEVEL_VERY_EXPENSIVE: 'Giá rất cao',
};

const getGoogleMealType = (types = []) => {
  if (types.includes('cafe') || types.includes('coffee_shop')) return 'drink';
  if (types.includes('bakery') || types.includes('ice_cream_shop') || types.includes('dessert_shop')) return 'snack';
  return 'lunch';
};

const getGoogleAddress = (place) => {
  const formatted = cleanAddress(place.formattedAddress || '');
  if (!/\+/.test(place.formattedAddress || '')) return formatted;

  const components = place.addressComponents || [];
  const getComponent = (...types) => components.find((component) => (
    types.some((type) => component.types?.includes(type))
  ))?.longText;
  const street = [
    getComponent('street_number'),
    getComponent('route'),
  ].filter(Boolean).join(' ');
  const parts = [
    street,
    getComponent('neighborhood', 'sublocality_level_2', 'sublocality_level_1'),
    getComponent('administrative_area_level_2', 'locality'),
    getComponent('administrative_area_level_1'),
    getComponent('postal_code'),
  ].filter(Boolean);
  return [...new Map(parts.map((part) => [part.toLocaleLowerCase('vi'), part])).values()].join(', ') || formatted;
};

const getGoogleSearchAreas = (coordinates) => {
  const pageRadius = Math.min(5000, Math.max(2500, coordinates.radius * 0.6));
  const offsetMeters = Math.max(1200, coordinates.radius - pageRadius);
  const latitudeOffset = offsetMeters / 111320;
  const longitudeOffset = offsetMeters / (111320 * Math.max(0.2, Math.cos(toRadians(coordinates.lat))));
  return [
    { lat: coordinates.lat, lon: coordinates.lon, radius: pageRadius },
    { lat: coordinates.lat + latitudeOffset, lon: coordinates.lon, radius: pageRadius },
    { lat: coordinates.lat - latitudeOffset, lon: coordinates.lon, radius: pageRadius },
    { lat: coordinates.lat, lon: coordinates.lon + longitudeOffset, radius: pageRadius },
    { lat: coordinates.lat, lon: coordinates.lon - longitudeOffset, radius: pageRadius },
  ];
};

const fetchGooglePlacesPage = async (area, apiKey) => {
  const response = await fetch(GOOGLE_NEARBY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.primaryType',
        'places.primaryTypeDisplayName',
        'places.types',
        'places.formattedAddress',
        'places.addressComponents',
        'places.location',
        'places.googleMapsUri',
        'places.rating',
        'places.userRatingCount',
        'places.priceLevel',
        'places.currentOpeningHours',
        'places.regularOpeningHours',
        'places.nationalPhoneNumber',
        'places.websiteUri',
        'places.photos',
      ].join(','),
    },
    body: JSON.stringify({
      includedPrimaryTypes: ['restaurant'],
      maxResultCount: 20,
      rankPreference: 'DISTANCE',
      languageCode: 'vi',
      regionCode: 'VN',
      locationRestriction: {
        circle: {
          center: { latitude: area.lat, longitude: area.lon },
          radius: area.radius,
        },
      },
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Places HTTP ${response.status}: ${detail.slice(0, 300)}`);
  }
  const payload = await response.json();
  return payload.places || [];
};

const fetchGooglePlaces = async (coordinates, baseUrl) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];
  const pageResults = await Promise.allSettled(getGoogleSearchAreas(coordinates).map((area) => (
    fetchGooglePlacesPage(area, apiKey)
  )));
  const pages = pageResults
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);
  if (!pages.length) throw pageResults[0]?.reason || new Error('Google Places không trả về dữ liệu.');
  const uniquePlaces = [...new Map(pages.flat().map((place) => [place.id, place])).values()];
  const restaurants = uniquePlaces.map((place) => {
    const lat = Number(place.location?.latitude);
    const lon = Number(place.location?.longitude);
    const distanceNum = Number.isFinite(lat) && Number.isFinite(lon)
      ? Math.round(distanceBetween(coordinates, { lat, lon }) * 100) / 100
      : null;
    const photo = place.photos?.[0];
    const photoRef = photo?.name ? Buffer.from(photo.name).toString('base64url') : '';
    const category = place.primaryTypeDisplayName?.text || 'Quán ăn';
    const openingHours = place.currentOpeningHours || place.regularOpeningHours;
    const address = getGoogleAddress(place);
    return {
      _id: place.id,
      id: place.id,
      externalId: place.id,
      source: 'google_places',
      name: place.displayName?.text || 'Địa điểm ăn uống',
      category,
      mealType: getGoogleMealType(place.types),
      cuisines: [],
      description: address,
      address,
      phone: place.nationalPhoneNumber || '',
      website: place.websiteUri || '',
      image: photoRef ? `${baseUrl}/api/foods/google-photo?ref=${encodeURIComponent(photoRef)}` : '',
      photoAttributions: photo?.authorAttributions || [],
      openingHours: openingHours?.weekdayDescriptions?.join(' · ') || '',
      openHours: openingHours?.weekdayDescriptions?.join(' · ') || '',
      isOpen: typeof place.currentOpeningHours?.openNow === 'boolean' ? place.currentOpeningHours.openNow : null,
      priceRange: googlePriceLabels[place.priceLevel] || '',
      rating: place.rating ?? null,
      reviewsCount: place.userRatingCount ?? null,
      location: Number.isFinite(lat) && Number.isFinite(lon)
        ? { type: 'Point', coordinates: [lon, lat] }
        : null,
      sourceUrl: place.googleMapsUri || '',
      attribution: 'Google Maps',
      distanceNum,
      distance: distanceNum === null ? '' : distanceNum < 1 ? `${Math.round(distanceNum * 1000)}m` : `${distanceNum} km`,
    };
  }).filter((food) => food.distanceNum === null || food.distanceNum <= coordinates.radius / 1000);
  const completeRestaurants = restaurants.filter((food) => food.image && food.address);
  return completeRestaurants.length >= 4
    ? completeRestaurants.sort((a, b) => a.distanceNum - b.distanceNum).slice(0, MAX_RESULTS)
    : restaurants.sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image))).slice(0, MAX_RESULTS);
};

const serializeFood = (food) => {
  const value = food.toObject ? food.toObject() : food;
  const id = value._id?.toString() || value.id;
  const distanceKm = Number.isFinite(value.distanceMeters)
    ? Math.round((value.distanceMeters / 1000) * 100) / 100
    : null;
  return {
    ...value,
    _id: id,
    id,
    distanceNum: distanceKm,
    distance: distanceKm === null ? '' : distanceKm < 1 ? `${Math.round(distanceKm * 1000)}m` : `${distanceKm} km`,
    openHours: value.openingHours || '',
    tags: value.cuisines || [],
  };
};

const findNearby = ({ lat, lon, radius }) => Food.aggregate([
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [lon, lat] },
      distanceField: 'distanceMeters',
      maxDistance: radius,
      spherical: true,
      query: { active: true, mealType: { $in: ['breakfast', 'lunch', 'dinner'] } },
    },
  },
  { $limit: MAX_RESULTS },
]);

export const getFoods = async (req, res, next) => {
  try {
    if (!requireDatabase(res)) return;
    const foods = await Food.find({
      active: true,
      mealType: { $in: ['breakfast', 'lunch', 'dinner'] },
    }).sort({ lastSyncedAt: -1, name: 1 }).limit(MAX_RESULTS);
    res.json(foods.map(serializeFood));
  } catch (error) {
    next(error);
  }
};

export const getNearbyFoods = async (req, res, next) => {
  try {
    if (!requireDatabase(res)) return;
    const coordinates = parseCoordinates(req.query, res);
    if (!coordinates) return;

    const cacheHours = Math.max(1, Number(process.env.FOOD_CACHE_HOURS) || 12);
    const cacheCutoff = new Date(Date.now() - cacheHours * 60 * 60 * 1000);
    const cachedNearby = await Food.findOne({
      active: true,
      lastSyncedAt: { $gte: cacheCutoff },
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [coordinates.lon, coordinates.lat] },
          $maxDistance: coordinates.radius,
        },
      },
    }).select('_id');

    let syncError = null;
    if (!cachedNearby || req.query.refresh === 'true') {
      try {
        await syncNearbyFoods(coordinates);
      } catch (error) {
        syncError = error;
      }
    }

    const foods = await findNearby(coordinates);
    if (!foods.length && syncError) {
      res.status(502);
      throw new Error(`Không lấy được dữ liệu OpenStreetMap: ${syncError.message}`);
    }
    if (syncError) res.setHeader('X-Todayly-Data-Stale', 'true');
    if (process.env.GOOGLE_PLACES_API_KEY) {
      try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const googleFoods = await fetchGooglePlaces(coordinates, baseUrl);
        if (googleFoods.length) return res.json(googleFoods);
      } catch (error) {
        res.setHeader('X-Todayly-Google-Places-Error', 'true');
        console.error(`[Google Places]: ${error.message}`);
      }
    }
    res.json(foods.map(serializeFood));
  } catch (error) {
    next(error);
  }
};

export const getGoogleFoodPhoto = async (req, res, next) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) return res.status(503).json({ message: 'GOOGLE_PLACES_API_KEY chưa được cấu hình.' });
    let photoName = '';
    try {
      photoName = Buffer.from(String(req.query.ref || ''), 'base64url').toString('utf8');
    } catch {
      return res.status(400).json({ message: 'Mã ảnh Google Places không hợp lệ.' });
    }
    if (!/^places\/[A-Za-z0-9_-]+\/photos\/[A-Za-z0-9_-]+$/.test(photoName)) {
      return res.status(400).json({ message: 'Tham chiếu ảnh Google Places không hợp lệ.' });
    }
    const url = new URL(`https://places.googleapis.com/v1/${photoName}/media`);
    url.searchParams.set('maxWidthPx', '1200');
    const response = await fetch(url, { headers: { 'X-Goog-Api-Key': apiKey } });
    if (!response.ok) throw new Error(`Google Place Photo trả về HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const image = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'private, no-store');
    res.send(image);
  } catch (error) {
    next(error);
  }
};

export const getFoodById = async (req, res, next) => {
  try {
    if (!requireDatabase(res)) return;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'ID quán ăn không hợp lệ.' });
    }
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Không tìm thấy quán ăn.' });
    res.json(serializeFood(food));
  } catch (error) {
    next(error);
  }
};
