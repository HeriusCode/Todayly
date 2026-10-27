import mongoose from 'mongoose';
import Food from '../models/Food.js';
import { isConnected } from '../config/db.js';

const DEFAULT_RADIUS = 2000;
const MAX_RADIUS = 20000;
const MAX_RESULTS = 350;
const MIN_GOOGLE_CACHE_RESULTS = 140;
const GOOGLE_CACHE_DAYS = 30;
const GOOGLE_NEARBY_URL = 'https://places.googleapis.com/v1/places:searchNearby';

const OVERPASS_ENDPOINTS = [
  process.env.OVERPASS_URL,
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
].filter((value, index, values) => value && values.indexOf(value) === index);

const fallbackImages = {
  vietnamese: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80',
  noodle: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&auto=format&fit=crop&q=80',
  sandwich: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
  bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
  seafood: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
  barbecue: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
  fast_food: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop&q=80',
  dessert: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
};

const getFallbackImage = (primaryType = '', name = '', types = []) => {
  const text = `${primaryType} ${name} ${types.join(' ')}`.toLowerCase();
  if (/bánh mì|sandwich|burger/i.test(text)) return fallbackImages.sandwich;
  if (/phở|bún|miến|hủ tiếu|mì|ramen|noodle/i.test(text)) return fallbackImages.noodle;
  if (/bánh|bakery|pastry|cake/i.test(text)) return fallbackImages.bakery;
  if (/hải sản|seafood|ốc|tôm|cua/i.test(text)) return fallbackImages.seafood;
  if (/nướng|bbq|barbecue|bò/i.test(text)) return fallbackImages.barbecue;
  if (/chè|kem|dessert|ice_cream/i.test(text)) return fallbackImages.dessert;
  if (/fast_food|gà rán|pizza/i.test(text)) return fallbackImages.fast_food;
  if (/cơm|vietnamese|món việt/i.test(text)) return fallbackImages.vietnamese;
  return fallbackImages.default;
};

// Exclude beverage / coffee / tea / bar / alcohol places strictly
const isBeveragePlace = (place) => {
  const primaryType = (place.primaryType || '').toLowerCase();
  const types = (place.types || []).map((t) => t.toLowerCase());
  const name = (place.displayName?.text || place.name || '').toLowerCase();

  const beverageTypes = [
    'cafe', 'coffee_shop', 'tea_house', 'bar', 'pub',
    'wine_bar', 'liquor_store', 'cocktail_bar', 'hookah_bar',
  ];
  if (beverageTypes.includes(primaryType)) return true;

  // Name keywords for purely drinks/coffee
  if (/\b(cà phê|cafe|café|coffee|trà sữa|milktea|milk tea|trà chanh|tiệm trà|quán nước|sinh tố|nước ép|nước mía|beer club|pub|lounge|roastery|brew)\b/i.test(name)) {
    // Only allow if it explicitly contains a main food dish (e.g. "Cơm tấm & Cafe" or "Bánh mì & Cà phê")
    if (!/\b(cơm|phở|bún|bánh mì|nhà hàng|quán ăn|mì|lẩu|nướng|hải sản)\b/i.test(name)) {
      return true;
    }
  }

  if (types.includes('coffee_shop') || types.includes('tea_house')) {
    if (!types.includes('restaurant') && !types.includes('meal_takeaway')) {
      return true;
    }
  }

  // Also filter non-food services that may leak in
  if (/clothing_store|hotel|lodging|gym|spa|bank|hospital|gas_station|convenience_store/i.test(primaryType)) {
    if (!/\b(nhà hàng|quán ăn|restaurant|bếp)\b/i.test(name)) {
      return true;
    }
  }

  return false;
};

const determineMealTypes = (types = [], name = '') => {
  const lowerName = name.toLowerCase();
  const mealTypes = new Set();

  const isBreakfast = types.some((t) => ['sandwich_shop', 'bakery'].includes(t))
    || /phở|bánh mì|bún|xôi|cháo|miến|hủ tiếu|điểm tâm/i.test(lowerName);
  const isSnack = types.some((t) => ['bakery', 'dessert_shop', 'ice_cream_shop', 'snack_bar'].includes(t))
    || /chè|kem|bánh ngọt|ăn vặt|ốc|bánh tráng|nem chua/i.test(lowerName);
  const isLunchOrDinner = types.some((t) => [
    'restaurant', 'vietnamese_restaurant', 'asian_restaurant',
    'food_court', 'fast_food_restaurant', 'seafood_restaurant',
    'barbecue_restaurant', 'pizza_restaurant',
  ].includes(t)) || /cơm|nhà hàng|quán ăn|lẩu|nướng|hải sản|quán|bếp/i.test(lowerName);

  if (isBreakfast) {
    mealTypes.add('breakfast');
    mealTypes.add('lunch');
  }
  if (isSnack) {
    mealTypes.add('snack');
  }
  if (isLunchOrDinner) {
    mealTypes.add('lunch');
    mealTypes.add('dinner');
  }

  if (mealTypes.size === 0) {
    mealTypes.add('lunch');
    mealTypes.add('dinner');
  }

  const primaryMeal = isBreakfast ? 'breakfast' : isSnack ? 'snack' : 'lunch';
  return {
    mealType: primaryMeal,
    mealTypes: Array.from(mealTypes),
  };
};

const googlePriceLabels = {
  PRICE_LEVEL_FREE: 'Miễn phí',
  PRICE_LEVEL_INEXPENSIVE: 'Giá bình dân (~20k - 50k)',
  PRICE_LEVEL_MODERATE: 'Giá vừa phải (~50k - 150k)',
  PRICE_LEVEL_EXPENSIVE: 'Giá cao (~150k - 300k)',
  PRICE_LEVEL_VERY_EXPENSIVE: 'Giá sang trọng (>300k)',
};

const parseCoordinates = (query, res) => {
  const lat = Number(query.lat);
  const lon = Number(query.lon);
  const radius = Math.min(MAX_RADIUS, Math.max(800, Number(query.radius) || DEFAULT_RADIUS));
  if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lon) || lon < -180 || lon > 180) {
    res.status(400).json({ message: 'Tọa độ lat/lon không hợp lệ.' });
    return null;
  }
  return { lat, lon, radius };
};

const cleanAddress = (value = '') => value
  .split(',')
  .map((part) => part.trim())
  .filter((part) => part
    && !/^(unnamed road|đường không tên)$/i.test(part)
    && !/^[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}$/i.test(part))
  .join(', ');

const toRadians = (value) => (value * Math.PI) / 180;
const distanceBetween = (origin, destination) => {
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(destination.lat - origin.lat);
  const deltaLon = toRadians(destination.lon - origin.lon);
  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(toRadians(origin.lat)) * Math.cos(toRadians(destination.lat))
    * Math.sin(deltaLon / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const serializeFood = (food, baseUrl = '') => {
  const value = food.toObject ? food.toObject() : food;
  const id = value._id?.toString() || value.id;
  const distanceKm = Number.isFinite(value.distanceMeters)
    ? Math.round((value.distanceMeters / 1000) * 100) / 100
    : value.distanceNum ?? null;

  const image = value.source === 'google_places' && value.googlePhotoRef && baseUrl
    ? `${baseUrl}/api/foods/google-photo?ref=${encodeURIComponent(value.googlePhotoRef)}`
    : value.image;

  return {
    ...value,
    _id: id,
    id,
    image,
    distanceNum: distanceKm,
    distance: distanceKm === null ? '' : distanceKm < 1 ? `${Math.round(distanceKm * 1000)}m` : `${distanceKm} km`,
    openHours: value.openingHours || value.openHours || '',
    tags: value.cuisines || value.tags || [],
  };
};

/* =========================================================================
 * 1. GOOGLE PLACES API (NEW) - CHỈ LẤY CÁC QUÁN ĂN (FOOD ONLY)
 * ========================================================================= */

const fetchGooglePlacesBatch = async (area, types, rankPreference, apiKey) => {
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
      includedTypes: types,
      maxResultCount: 20,
      rankPreference,
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
    throw new Error(`Google Places HTTP ${response.status}: ${detail.slice(0, 200)}`);
  }
  const payload = await response.json();
  return payload.places || [];
};

const getGoogleSearchAreas = (coordinates) => {
  const is2km = coordinates.radius <= 2500;
  if (is2km) {
    const step = 0.007; // ~750m
    const offsets = [
      [0, 0],
      [step, 0], [-step, 0], [0, step], [0, -step],
      [step * 0.7, step * 0.7], [-step * 0.7, step * 0.7],
      [step * 0.7, -step * 0.7], [-step * 0.7, -step * 0.7],
    ];
    return offsets.map(([latOffset, lonOffset]) => ({
      lat: coordinates.lat + latOffset,
      lon: coordinates.lon + lonOffset,
      radius: 1200,
    }));
  }
  const areaRadius = Math.min(5000, Math.max(3000, coordinates.radius * 0.5));
  const offsetMeters = Math.max(1800, coordinates.radius - areaRadius);
  const latitudeOffset = offsetMeters / 111320;
  const longitudeOffset = offsetMeters / (111320 * Math.max(0.2, Math.cos(toRadians(coordinates.lat))));
  return [-1, 0, 1].flatMap((latStep) => (
    [-1, 0, 1].map((lonStep) => ({
      lat: coordinates.lat + latitudeOffset * latStep,
      lon: coordinates.lon + longitudeOffset * lonStep,
      radius: areaRadius,
    }))
  ));
};

const fetchGooglePlaces = async (coordinates, baseUrl) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];

  const searchAreas = getGoogleSearchAreas(coordinates);
  const centerArea = searchAreas[0];
  const is2km = coordinates.radius <= 2500;

  const queries = is2km
    ? [
        fetchGooglePlacesBatch(centerArea, ['vietnamese_restaurant', 'noodle_restaurant'], 'POPULARITY', apiKey),
        fetchGooglePlacesBatch(centerArea, ['vietnamese_restaurant', 'noodle_restaurant'], 'DISTANCE', apiKey),
        fetchGooglePlacesBatch(centerArea, ['restaurant', 'asian_restaurant'], 'POPULARITY', apiKey),
        fetchGooglePlacesBatch(centerArea, ['restaurant', 'asian_restaurant'], 'DISTANCE', apiKey),
        fetchGooglePlacesBatch(centerArea, ['sandwich_shop', 'fast_food_restaurant', 'meal_takeaway'], 'POPULARITY', apiKey),
        fetchGooglePlacesBatch(centerArea, ['sandwich_shop', 'fast_food_restaurant', 'meal_takeaway'], 'DISTANCE', apiKey),
        fetchGooglePlacesBatch(centerArea, ['seafood_restaurant', 'barbecue_restaurant'], 'POPULARITY', apiKey),
        fetchGooglePlacesBatch(centerArea, ['seafood_restaurant', 'barbecue_restaurant'], 'DISTANCE', apiKey),
        fetchGooglePlacesBatch(centerArea, ['dessert_shop', 'bakery'], 'POPULARITY', apiKey),
        fetchGooglePlacesBatch(centerArea, ['pizza_restaurant', 'food_court'], 'POPULARITY', apiKey),
        ...searchAreas.slice(1).flatMap((area) => [
          fetchGooglePlacesBatch(area, ['vietnamese_restaurant', 'restaurant', 'sandwich_shop'], 'DISTANCE', apiKey),
          fetchGooglePlacesBatch(area, ['noodle_restaurant', 'meal_takeaway', 'seafood_restaurant'], 'DISTANCE', apiKey),
        ]),
      ]
    : [
        ...searchAreas.map((area) => fetchGooglePlacesBatch(area, ['restaurant', 'vietnamese_restaurant', 'asian_restaurant'], 'POPULARITY', apiKey)),
        fetchGooglePlacesBatch(centerArea, ['sandwich_shop', 'fast_food_restaurant', 'meal_takeaway'], 'POPULARITY', apiKey),
        fetchGooglePlacesBatch({ ...centerArea, radius: Math.min(3000, centerArea.radius) }, ['restaurant', 'vietnamese_restaurant', 'sandwich_shop'], 'DISTANCE', apiKey),
        fetchGooglePlacesBatch(centerArea, ['dessert_shop', 'bakery', 'ice_cream_shop'], 'POPULARITY', apiKey),
      ];

  const results = await Promise.allSettled(queries);
  const placesMap = new Map();

  for (const res of results) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      for (const place of res.value) {
        if (place && place.id && !placesMap.has(place.id)) {
          // STRICT FILTER: Exclude cafes, coffee shops, bubble tea, bars
          if (isBeveragePlace(place)) {
            continue;
          }
          placesMap.set(place.id, place);
        }
      }
    }
  }

  const uniquePlaces = Array.from(placesMap.values());
  if (!uniquePlaces.length) return [];

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
    const address = cleanAddress(place.formattedAddress || '');
    const name = place.displayName?.text || 'Quán ăn';

    const { mealType, mealTypes } = determineMealTypes(place.types || [], name);

    const imageUrl = photoRef
      ? `${baseUrl}/api/foods/google-photo?ref=${encodeURIComponent(photoRef)}`
      : getFallbackImage(place.primaryType, name, place.types || []);

    return {
      _id: place.id,
      id: place.id,
      externalId: place.id,
      source: 'google_places',
      name,
      category,
      mealType,
      mealTypes,
      cuisines: [category].filter(Boolean),
      tags: [category].filter(Boolean),
      description: address || category,
      address,
      phone: place.nationalPhoneNumber || '',
      website: place.websiteUri || '',
      image: imageUrl,
      googlePhotoRef: photoRef,
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

  return restaurants.sort((a, b) => (a.distanceNum ?? 99) - (b.distanceNum ?? 99)).slice(0, MAX_RESULTS);
};

/* =========================================================================
 * 2. MONGODB BACKGROUND UPSERT
 * ========================================================================= */

const savePlacesToMongo = async (places) => {
  if (!isConnected || !Array.isArray(places) || !places.length) return 0;
  try {
    const syncedAt = new Date();
    const ops = places
      .filter((place) => Array.isArray(place.location?.coordinates) && place.location.coordinates.length === 2)
      .map((place) => {
      const coords = place.location.coordinates;
      return {
        updateOne: {
          filter: { source: 'google_places', externalId: place.externalId || place.id },
          update: {
            $set: {
              name: place.name,
              category: place.category,
              mealType: place.mealType,
              mealTypes: place.mealTypes || [place.mealType],
              cuisines: place.cuisines || [],
              description: place.description || '',
              address: place.address,
              phone: place.phone,
              website: place.website,
              image: place.googlePhotoRef ? '' : place.image,
              googlePhotoRef: place.googlePhotoRef || '',
              photoAttributions: place.photoAttributions || [],
              openingHours: place.openingHours,
              priceRange: place.priceRange,
              rating: place.rating,
              reviewsCount: place.reviewsCount,
              isOpen: place.isOpen,
              location: { type: 'Point', coordinates: coords },
              sourceUrl: place.sourceUrl,
              attribution: 'Google Maps',
              rawTags: {},
              active: true,
              lastSyncedAt: syncedAt,
              expiresAt: null,
            },
            $setOnInsert: {
              source: 'google_places',
              externalId: place.externalId || place.id,
            },
          },
          upsert: true,
        },
      };
    });
    if (!ops.length) return 0;
    const result = await Food.bulkWrite(ops, { ordered: false });
    console.log(`✅ [MongoDB Saved]: Đã lưu ${ops.length} quán ăn vào database (Mới: ${result.upsertedCount}, Cập nhật: ${result.modifiedCount})`);
    return ops.length;
  } catch (err) {
    console.error('[Food Mongo Cache Error]:', err.message);
    return 0;
  }
};

/* =========================================================================
 * 3. OPENSTREETMAP (OVERPASS) FALLBACK - CHỈ QUÁN ĂN
 * ========================================================================= */

const getPoint = (element) => {
  const lat = Number(element.lat ?? element.center?.lat);
  const lon = Number(element.lon ?? element.center?.lon);
  return Number.isFinite(lat) && Number.isFinite(lon) ? { lat, lon } : null;
};

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
  if (value === 'fast_food') return 'Đồ ăn nhanh';
  if (value === 'food_court') return 'Khu ẩm thực';
  if (value === 'ice_cream') return 'Kem & tráng miệng';
  if (value === 'bakery') return 'Tiệm bánh';
  return 'Quán ăn';
};

const normalizeElement = (element, syncedAt) => {
  const point = getPoint(element);
  const tags = element.tags || {};
  const name = tags['name:vi'] || tags.name;
  if (!point || !name?.trim()) return null;
  const category = getCategory(tags);
  const { mealType, mealTypes } = determineMealTypes([tags.amenity, tags.shop].filter(Boolean), name);

  return {
    updateOne: {
      filter: { source: 'openstreetmap', externalId: `${element.type}/${element.id}` },
      update: {
        $set: {
          osmType: element.type,
          name: name.trim(),
          category,
          mealType,
          mealTypes,
          description: getAddress(tags) || category,
          address: getAddress(tags),
          phone: tags.phone || tags['contact:phone'] || '',
          website: tags.website || tags['contact:website'] || '',
          image: getFallbackImage(tags.amenity, name),
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
  const searchRadius = Math.min(3500, radius);
  const query = `[out:json][timeout:12];(
    node["amenity"~"^(restaurant|fast_food|food_court)$"](around:${searchRadius},${lat},${lon});
    way["amenity"~"^(restaurant|fast_food|food_court)$"](around:${searchRadius},${lat},${lon});
  );out center 60;`;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'User-Agent': 'Todayly/1.0',
        },
        body: new URLSearchParams({ data: query }),
        signal: controller.signal,
      });
      if (!response.ok) continue;
      const payload = await response.json();
      if (Array.isArray(payload.elements)) return payload.elements;
    } catch {
      // try next
    } finally {
      clearTimeout(timeout);
    }
  }
  return [];
};

const syncNearbyFoods = async (coordinates) => {
  const elements = await fetchOverpass(coordinates);
  if (!elements.length) return 0;
  const syncedAt = new Date();
  const operations = elements
    .map((element) => normalizeElement(element, syncedAt))
    .filter(Boolean);
  if (operations.length) await Food.bulkWrite(operations, { ordered: false });
  return operations.length;
};

const findNearby = ({ lat, lon, radius }) => Food.aggregate([
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [lon, lat] },
      distanceField: 'distanceMeters',
      maxDistance: radius,
      spherical: true,
      query: {
        active: true,
        mealType: { $ne: 'drink' },
      },
    },
  },
  { $limit: MAX_RESULTS },
]);

/* =========================================================================
 * 4. CONTROLLER HANDLERS
 * ========================================================================= */

export const getFoods = async (req, res, next) => {
  try {
    if (!isConnected) {
      return res.json([]);
    }
    const foods = await Food.find({
      active: true,
      mealType: { $ne: 'drink' },
    })
      .sort({ lastSyncedAt: -1, name: 1 })
      .limit(MAX_RESULTS);
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json(foods.map((food) => serializeFood(food, baseUrl)));
  } catch (error) {
    next(error);
  }
};

export const getNearbyFoods = async (req, res, next) => {
  try {
    const coordinates = parseCoordinates(req.query, res);
    if (!coordinates) return;

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const forceRefresh = req.query.refresh === 'true';

    if (isConnected && !forceRefresh) {
      const cachedFoods = await findNearby(coordinates);
      const freshCutoff = Date.now() - 12 * 60 * 60 * 1000;
      const freshGoogleCount = cachedFoods.filter((food) => (
        food.source === 'google_places'
        && new Date(food.lastSyncedAt).getTime() >= freshCutoff
      )).length;
      if (freshGoogleCount >= MIN_GOOGLE_CACHE_RESULTS) {
        res.setHeader('X-Todayly-Places-Cache', 'HIT');
        res.setHeader('X-Todayly-Total-Places', String(cachedFoods.length));
        return res.json(cachedFoods.map((food) => serializeFood(food, baseUrl)));
      }
    }

    // 1. Prioritize Google Places API (Food only)
    if (process.env.GOOGLE_PLACES_API_KEY) {
      try {
        const googleFoods = await fetchGooglePlaces(coordinates, baseUrl);
        if (googleFoods && googleFoods.length > 0) {
          const savedCount = await savePlacesToMongo(googleFoods);
          res.setHeader('X-Todayly-Saved-Places', String(savedCount));
          if (savedCount > 0) {
            const storedFoods = await findNearby(coordinates);
            res.setHeader('X-Todayly-Total-Places', String(storedFoods.length));
            return res.json(storedFoods.map((food) => serializeFood(food, baseUrl)));
          }
          res.setHeader('X-Todayly-Total-Places', String(googleFoods.length));
          return res.json(googleFoods);
        }
      } catch (googleError) {
        console.error(`[Google Places Warning]: ${googleError.message}`);
      }
    }

    // 2. Fallback to MongoDB & OpenStreetMap
    if (isConnected) {
      const cacheHours = Math.max(1, Number(process.env.FOOD_CACHE_HOURS) || 12);
      const cacheCutoff = new Date(Date.now() - cacheHours * 60 * 60 * 1000);
      const cachedNearby = await Food.findOne({
        active: true,
        mealType: { $ne: 'drink' },
        lastSyncedAt: { $gte: cacheCutoff },
        $or: [
          { source: 'openstreetmap' },
          { source: 'google_places', expiresAt: { $gt: new Date() } },
        ],
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [coordinates.lon, coordinates.lat] },
            $maxDistance: coordinates.radius,
          },
        },
      }).select('_id');

      if (!cachedNearby || req.query.refresh === 'true') {
        try {
          await syncNearbyFoods(coordinates);
        } catch (osmError) {
          console.warn(`[OSM Sync Warning]: ${osmError.message}`);
        }
      }

      const dbFoods = await findNearby(coordinates);
      if (dbFoods && dbFoods.length > 0) {
        return res.json(dbFoods.map((food) => serializeFood(food, baseUrl)));
      }
    }

    // 3. Fallback: Return empty array instead of 502/503
    res.json([]);
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
    url.searchParams.set('maxWidthPx', '1000');
    const response = await fetch(url, { headers: { 'X-Goog-Api-Key': apiKey } });
    if (!response.ok) throw new Error(`Google Place Photo trả về HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const image = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(image);
  } catch (error) {
    next(error);
  }
};

export const getFoodById = async (req, res, next) => {
  try {
    if (!isConnected) {
      return res.status(503).json({ message: 'Cơ sở dữ liệu đang kết nối.' });
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'ID quán ăn không hợp lệ.' });
    }
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Không tìm thấy quán ăn.' });
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json(serializeFood(food, baseUrl));
  } catch (error) {
    next(error);
  }
};
