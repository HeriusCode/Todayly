import mongoose from 'mongoose';
import Drink from '../models/Drink.js';
import { isConnected } from '../config/db.js';

const DEFAULT_RADIUS = 2000;
const MAX_RADIUS = 20000;
const MAX_RESULTS = 350;
const MIN_GOOGLE_CACHE_RESULTS = 80;
const GOOGLE_NEARBY_URL = 'https://places.googleapis.com/v1/places:searchNearby';

const OVERPASS_ENDPOINTS = [
  process.env.OVERPASS_URL,
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
].filter((value, index, values) => value && values.indexOf(value) === index);

const fallbackDrinkImages = {
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
  'milk-tea': 'https://images.unsplash.com/photo-1558857563-b371f32a5369?w=800&auto=format&fit=crop&q=80',
  'fruit-tea': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
  juice: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&auto=format&fit=crop&q=80',
  matcha: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
};

const getFallbackDrinkImage = (drinkType = 'coffee') => {
  return fallbackDrinkImages[drinkType] || fallbackDrinkImages.default;
};

// Classify a drink place and assign realistic signature drink
const classifyDrinkPlace = (name = '', primaryType = '', types = []) => {
  const text = `${name} ${primaryType} ${types.join(' ')}`.toLowerCase();

  // 1. Milk Tea & Boba
  if (/\b(trà sữa|milktea|milk tea|boba|bubble tea|trân châu|tocotoco|ding tea|gong cha|mixue|chagee|koi thé|bobapop|tiger sugar|yi he tang|phê la|đô đô|chato)\b/i.test(text)) {
    return {
      drinkType: 'milk-tea',
      category: 'Trà sữa & Trân châu',
      signatureDrink: /trân châu/i.test(name)
        ? `Trà sữa ${name.replace(/quán|tiệm|trà sữa/gi, '').trim() || 'Trân châu Hoàng kim'}`
        : 'Trà sữa Ô Long nướng trân châu hoàng kim',
      sugar: '50% đường (Tùy chọn)',
      workFriendly: true,
      badge: 'Best seller',
      description: 'Hương trà Ô Long nướng thơm lừng hòa quyện sữa tươi béo nhẹ cùng trân châu dẻo mềm.',
      reason: 'Bổ sung năng lượng ngọt ngào và thư giãn sau những giờ làm việc tập trung.',
    };
  }

  // 2. Fruit Tea & Cold Brew
  if (/\b(trà đào|trà dâu|trà mãng cầu|trà chanh|trà hoa quả|trà trái cây|tiệm trà|fruit tea|cold brew|trà sen|trà lài|trà vải)\b/i.test(text) || primaryType === 'tea_house') {
    return {
      drinkType: 'fruit-tea',
      category: 'Trà trái cây & Cold brew',
      signatureDrink: /đào/i.test(name)
        ? 'Trà Đào Cam Sả mật ong & nha đam'
        : /dâu/i.test(name)
          ? 'Trà Dâu tằm thanh mát hạt chia'
          : /chanh/i.test(name)
            ? 'Trà Chanh giã tay hoa nhài'
            : 'Trà trái cây nhiệt đới thanh mát',
      sugar: '30% đường (Thanh nhiệt)',
      workFriendly: true,
      badge: 'Hot trend tuần này',
      description: 'Vị chua thanh mát lành từ hoa quả tươi kết hợp nền trà hoa nhài thơm ngát và nha đam giòn sần sật.',
      reason: 'Thời tiết ấm áp rất thích hợp với đồ uống thanh nhiệt, giải khát tức thì và ít ngọt.',
    };
  }

  // 3. Juice & Smoothie Detox
  if (/\b(nước ép|sinh tố|juice|smoothie|detox|hoa quả tươi|nước mía|trái cây ép|bơ|cam ép)\b/i.test(text) || primaryType === 'juice_shop') {
    return {
      drinkType: 'juice',
      category: 'Nước ép & Sinh tố detox',
      signatureDrink: /cam/i.test(name)
        ? 'Nước cam ép tươi mật ong nguyên chất'
        : /sinh tố/i.test(name)
          ? 'Sinh tố bơ mãng cầu sánh mịn'
          : 'Nước ép xanh cần tây táo dứa detox',
      sugar: 'Không đường (100% tự nhiên)',
      workFriendly: false,
      badge: '100% Tươi mới',
      description: 'Ép tươi nguyên chất từ trái cây chọn lọc trong ngày, giàu vitamin và chất chống oxy hóa tự nhiên.',
      reason: 'Giúp bạn thanh lọc cơ thể, bù nước nhanh chóng và nạp đầy vitamin tự nhiên.',
    };
  }

  // 4. Matcha & Hojicha
  if (/\b(matcha|hojicha|trà xanh nhật|morico|fuji|kyo)\b/i.test(text)) {
    return {
      drinkType: 'matcha',
      category: 'Matcha & Hojicha',
      signatureDrink: 'Matcha Latte sữa yến mạch béo ngậy',
      sugar: 'Ít ngọt (30% đường)',
      workFriendly: true,
      badge: 'Matcha Nhật Bản',
      description: 'Bột matcha Uji nguyên chất đánh bông cùng sữa hạt sánh mịn, hậu vị ngọt thanh đậm đà.',
      reason: 'L-Theanine trong matcha giúp tinh thần tập trung cao độ mà không gây hồi hộp.',
    };
  }

  // 5. Coffee (Cà phê & Bạc xỉu)
  let sig = 'Bạc xỉu ba tầng thơm ngậy';
  if (/muối/i.test(name)) sig = 'Cà phê muối béo ngậy Cố Đô';
  else if (/highlands/i.test(name)) sig = 'Phin Sữa Đá đậm đà truyền thống';
  else if (/phúc long/i.test(name)) sig = 'Trà Đào Phúc Long & Cà phê sữa';
  else if (/the coffee house/i.test(name)) sig = 'Cà phê sữa đá & CloudFee kem sữa';
  else if (/katinat/i.test(name)) sig = 'Bơ già dừa non & Cà phê sữa';
  else if (/trứng/i.test(name)) sig = 'Cà phê trứng béo ngậy Hà Nội';
  else if (/cold brew/i.test(name)) sig = 'Cold Brew cam vàng ủ lạnh';

  return {
    drinkType: 'coffee',
    category: 'Cà phê & Bạc xỉu',
    signatureDrink: sig,
    sugar: 'Ít ngọt',
    workFriendly: true,
    badge: 'Đậm đà chuẩn vị',
    description: 'Hạt cà phê Robusta & Arabica rang mộc kết hợp cùng sữa đặc béo ngậy tạo nên hương vị bừng tỉnh tỉnh táo.',
    reason: 'Một ngụm cà phê thơm nồng giúp bạn tái tạo sự tập trung và tràn đầy năng lượng cho ngày mới.',
  };
};

const parseCoordinates = (query, res) => {
  const lat = Number.parseFloat(query.lat);
  const lon = Number.parseFloat(query.lon);
  const radius = Number.parseInt(query.radius, 10);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    res.status(400).json({ message: 'Vui lòng cung cấp tọa độ lat và lon hợp lệ.' });
    return null;
  }
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    res.status(400).json({ message: 'Tọa độ vượt giới hạn hợp lệ.' });
    return null;
  }

  const safeRadius = Number.isFinite(radius) && radius > 0
    ? Math.min(Math.max(radius, 100), MAX_RADIUS)
    : DEFAULT_RADIUS;

  return { lat, lon, radius: safeRadius };
};

const toRadians = (deg) => (deg * Math.PI) / 180;
const calculateDistanceKm = (origin, destination) => {
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(destination.lat - origin.lat);
  const deltaLon = toRadians(destination.lon - origin.lon);
  const a = Math.sin(deltaLat / 2) ** 2
    + Math.cos(toRadians(origin.lat)) * Math.cos(toRadians(destination.lat))
    * Math.sin(deltaLon / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const serializeDrink = (drink, baseUrl = '') => {
  const value = drink.toObject ? drink.toObject() : drink;
  const id = value._id?.toString() || value.id;
  const distanceKm = Number.isFinite(value.distanceMeters)
    ? Math.round((value.distanceMeters / 1000) * 100) / 100
    : value.distanceNum ?? null;

  const image = value.source === 'google_places' && value.googlePhotoRef && baseUrl
    ? `${baseUrl}/api/drinks/google-photo?ref=${encodeURIComponent(value.googlePhotoRef)}`
    : value.image || getFallbackDrinkImage(value.drinkType);

  const travelMinutes = distanceKm !== null
    ? distanceKm < 1
      ? Math.max(2, Math.round(distanceKm * 6))
      : Math.round(distanceKm * 4 + 2)
    : 5;

  return {
    ...value,
    _id: id,
    id,
    image,
    distanceNum: distanceKm,
    distance: distanceKm === null ? '' : distanceKm < 1 ? `${Math.round(distanceKm * 1000)}m` : `${distanceKm} km`,
    travelTime: `${travelMinutes} phút`,
    openHours: value.openingHours || '',
    tags: value.tags || [],
  };
};

/* =========================================================================
 * 1. GOOGLE PLACES API (NEW) - CÀO DỮ LIỆU CÁC QUÁN NƯỚC / CAFE / TRÀ SỮA
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

const getDrinkSearchAreas = (coordinates) => {
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
  const longitudeOffset = offsetMeters / (111320 * Math.cos(toRadians(coordinates.lat)));
  return [
    { lat: coordinates.lat, lon: coordinates.lon, radius: areaRadius },
    { lat: coordinates.lat + latitudeOffset, lon: coordinates.lon, radius: areaRadius },
    { lat: coordinates.lat - latitudeOffset, lon: coordinates.lon, radius: areaRadius },
    { lat: coordinates.lat, lon: coordinates.lon + longitudeOffset, radius: areaRadius },
    { lat: coordinates.lat, lon: coordinates.lon - longitudeOffset, radius: areaRadius },
  ];
};

const parseGoogleDrinkPlace = (place, userOrigin, baseUrl) => {
  const externalId = place.id;
  const storeName = place.displayName?.text?.trim();
  const lat = place.location?.latitude;
  const lon = place.location?.longitude;
  if (!externalId || !storeName || !Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const distanceKm = Math.round(calculateDistanceKm(userOrigin, { lat, lon }) * 100) / 100;
  const primaryType = place.primaryType || 'cafe';
  const types = place.types || [];

  const classification = classifyDrinkPlace(storeName, primaryType, types);

  // Price estimate
  let priceRange = '25.000 – 45.000đ';
  let minPrice = 25000;
  let maxPrice = 45000;
  if (place.priceLevel === 'PRICE_LEVEL_INEXPENSIVE') {
    priceRange = '20.000 – 35.000đ';
    minPrice = 20000;
    maxPrice = 35000;
  } else if (place.priceLevel === 'PRICE_LEVEL_MODERATE') {
    priceRange = '35.000 – 55.000đ';
    minPrice = 35000;
    maxPrice = 55000;
  } else if (place.priceLevel === 'PRICE_LEVEL_EXPENSIVE') {
    priceRange = '55.000 – 85.000đ';
    minPrice = 55000;
    maxPrice = 85000;
  }

  const openingHours = Array.isArray(place.regularOpeningHours?.weekdayDescriptions)
    ? place.regularOpeningHours.weekdayDescriptions.join(' • ')
    : '';

  const isOpen = place.currentOpeningHours?.openNow ?? null;
  const rating = Number.isFinite(place.rating) ? Math.round(place.rating * 10) / 10 : null;
  const reviewsCount = Number.isInteger(place.userRatingCount) ? place.userRatingCount : null;

  let googlePhotoRef = '';
  let image = '';
  const firstPhoto = Array.isArray(place.photos) && place.photos.length > 0 ? place.photos[0] : null;
  if (firstPhoto?.name) {
    googlePhotoRef = Buffer.from(firstPhoto.name, 'utf8').toString('base64url');
    image = baseUrl ? `${baseUrl}/api/drinks/google-photo?ref=${encodeURIComponent(googlePhotoRef)}` : '';
  }
  if (!image) {
    image = getFallbackDrinkImage(classification.drinkType);
  }

  return {
    source: 'google_places',
    externalId,
    name: storeName,
    storeName,
    category: classification.category,
    drinkType: classification.drinkType,
    sugar: classification.sugar,
    workFriendly: classification.workFriendly,
    badge: classification.badge,
    description: place.formattedAddress || classification.category,
    reason: '',
    address: place.formattedAddress || '',
    phone: place.nationalPhoneNumber || '',
    website: place.websiteUri || '',
    image,
    googlePhotoRef,
    openingHours,
    priceRange,
    minPrice,
    maxPrice,
    rating,
    reviewsCount,
    isOpen,
    tags: [classification.category, classification.badge].filter(Boolean),
    location: { type: 'Point', coordinates: [lon, lat] },
    distanceNum: distanceKm,
    distance: distanceKm < 1 ? `${Math.round(distanceKm * 1000)}m` : `${distanceKm} km`,
    sourceUrl: place.googleMapsUri || '',
    attribution: 'Google Maps',
    active: true,
    lastSyncedAt: new Date(),
    expiresAt: null, // Lưu vĩnh viễn vào MongoDB Atlas
  };
};

const fetchGooglePlaces = async (coordinates, baseUrl) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];

  const areas = getDrinkSearchAreas(coordinates);
  const drinkTypesBatch = ['cafe', 'coffee_shop', 'tea_house', 'juice_shop'];
  const placesMap = new Map();

  for (const area of areas) {
    try {
      const places = await fetchGooglePlacesBatch(area, drinkTypesBatch, 'DISTANCE', apiKey);
      for (const p of places) {
        if (p?.id && !placesMap.has(p.id)) {
          placesMap.set(p.id, p);
        }
      }
    } catch (err) {
      console.warn(`[Google Places Area Warning]: ${err.message}`);
    }
  }

  console.log(`[Google Places Drinks]: Tìm thấy tổng cộng ${placesMap.size} quán nước độc nhất xung quanh tọa độ.`);

  const results = [];
  for (const place of placesMap.values()) {
    const item = parseGoogleDrinkPlace(place, coordinates, baseUrl);
    if (item && item.distanceNum <= coordinates.radius / 1000 * 1.5) {
      results.push(item);
    }
  }

  results.sort((a, b) => a.distanceNum - b.distanceNum);
  return results.slice(0, MAX_RESULTS);
};

/* =========================================================================
 * 2. LƯU QUÁN VÀO MONGODB
 * ========================================================================= */

const saveDrinksToMongo = async (drinks) => {
  if (!isConnected || !drinks.length) return 0;
  const operations = drinks.map((d) => ({
    updateOne: {
      filter: { source: d.source, externalId: d.externalId },
      update: {
        $set: {
          name: d.name,
          storeName: d.storeName,
          category: d.category,
          drinkType: d.drinkType,
          sugar: d.sugar,
          workFriendly: d.workFriendly,
          badge: d.badge,
          description: d.description,
          reason: d.reason,
          address: d.address,
          phone: d.phone,
          website: d.website,
          image: d.image,
          googlePhotoRef: d.googlePhotoRef,
          openingHours: d.openingHours,
          priceRange: d.priceRange,
          minPrice: d.minPrice,
          maxPrice: d.maxPrice,
          rating: d.rating,
          reviewsCount: d.reviewsCount,
          isOpen: d.isOpen,
          tags: d.tags,
          location: d.location,
          sourceUrl: d.sourceUrl,
          attribution: d.attribution,
          active: true,
          lastSyncedAt: new Date(),
          expiresAt: null,
        },
        $setOnInsert: { createdAt: new Date() },
      },
      upsert: true,
    },
  }));

  const res = await Drink.bulkWrite(operations, { ordered: false });
  console.log(`[Mongo Atlas Drinks]: Đã lưu ${res.upsertedCount + res.modifiedCount} quán nước vào database!`);
  return res.upsertedCount + res.modifiedCount;
};

const findNearbyDrinks = async (coordinates) => {
  return Drink.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [coordinates.lon, coordinates.lat] },
        distanceField: 'distanceMeters',
        maxDistance: coordinates.radius,
        spherical: true,
        query: { active: true },
      },
    },
    { $sort: { distanceMeters: 1 } },
    { $limit: MAX_RESULTS },
  ]);
};

/* =========================================================================
 * 3. FALLBACK: OVERPASS OSM CHO QUÁN NƯỚC
 * ========================================================================= */

const syncNearbyOSMDrinks = async (coordinates) => {
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"~"cafe|tea|juice_bar"](around:${coordinates.radius},${coordinates.lat},${coordinates.lon});
      way["amenity"~"cafe|tea|juice_bar"](around:${coordinates.radius},${coordinates.lat},${coordinates.lon});
      node["shop"~"tea|coffee|beverages"](around:${coordinates.radius},${coordinates.lat},${coordinates.lon});
      way["shop"~"tea|coffee|beverages"](around:${coordinates.radius},${coordinates.lat},${coordinates.lon});
    );
    out center tags;
  `;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (!resp.ok) continue;
      const data = await resp.json();
      const elements = data.elements || [];
      const parsed = [];
      for (const el of elements) {
        const lat = el.lat ?? el.center?.lat;
        const lon = el.lon ?? el.center?.lon;
        const name = el.tags?.name?.trim();
        if (!name || !Number.isFinite(lat) || !Number.isFinite(lon)) continue;

        const classification = classifyDrinkPlace(name, el.tags?.amenity || '', Object.values(el.tags || {}));
        const distKm = Math.round(calculateDistanceKm(coordinates, { lat, lon }) * 100) / 100;
        parsed.push({
          source: 'openstreetmap',
          externalId: `${el.type}/${el.id}`,
          osmType: el.type,
          name: name,
          storeName: name,
          category: classification.category,
          drinkType: classification.drinkType,
          sugar: classification.sugar,
          workFriendly: classification.workFriendly,
          badge: classification.badge,
          description: el.tags['addr:street'] ? `${el.tags['addr:housenumber'] || ''} ${el.tags['addr:street']}`.trim() : classification.category,
          reason: '',
          address: el.tags['addr:street'] ? `${el.tags['addr:housenumber'] || ''} ${el.tags['addr:street']}`.trim() : '',
          phone: el.tags?.phone || '',
          website: el.tags?.website || '',
          image: getFallbackDrinkImage(classification.drinkType),
          openingHours: el.tags?.opening_hours || '',
          priceRange: '25.000 – 45.000đ',
          minPrice: 25000,
          maxPrice: 45000,
          rating: 4.6,
          reviewsCount: 88,
          isOpen: true,
          location: { type: 'Point', coordinates: [lon, lat] },
          distanceNum: distKm,
          distance: distKm < 1 ? `${Math.round(distKm * 1000)}m` : `${distKm} km`,
          attribution: '© OpenStreetMap contributors',
          active: true,
          lastSyncedAt: new Date(),
          expiresAt: null,
        });
      }
      if (parsed.length > 0) {
        await saveDrinksToMongo(parsed);
        return parsed;
      }
    } catch {
      continue;
    }
  }
  return [];
};

/* =========================================================================
 * 4. CONTROLLER HANDLERS
 * ========================================================================= */

export const getNearbyDrinks = async (req, res, next) => {
  try {
    const coordinates = parseCoordinates(req.query, res);
    if (!coordinates) return;

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const forceRefresh = req.query.refresh === 'true';

    // Check DB cache first
    if (isConnected && !forceRefresh) {
      const cachedDrinks = await findNearbyDrinks(coordinates);
      const freshCutoff = Date.now() - 12 * 60 * 60 * 1000;
      const freshGoogleCount = cachedDrinks.filter((d) => (
        d.source === 'google_places' && new Date(d.lastSyncedAt).getTime() >= freshCutoff
      )).length;

      if (freshGoogleCount >= MIN_GOOGLE_CACHE_RESULTS) {
        res.setHeader('X-Todayly-Drinks-Cache', 'HIT');
        res.setHeader('X-Todayly-Total-Drinks', String(cachedDrinks.length));
        return res.json(cachedDrinks.map((d) => serializeDrink(d, baseUrl)));
      }
    }

    // 1. Prioritize Google Places API (Cafes, Milk Tea, Juice Shops)
    if (process.env.GOOGLE_PLACES_API_KEY) {
      try {
        const googleDrinks = await fetchGooglePlaces(coordinates, baseUrl);
        if (googleDrinks && googleDrinks.length > 0) {
          const savedCount = await saveDrinksToMongo(googleDrinks);
          res.setHeader('X-Todayly-Saved-Drinks', String(savedCount));
          if (savedCount > 0) {
            const stored = await findNearbyDrinks(coordinates);
            res.setHeader('X-Todayly-Total-Drinks', String(stored.length));
            return res.json(stored.map((d) => serializeDrink(d, baseUrl)));
          }
          res.setHeader('X-Todayly-Total-Drinks', String(googleDrinks.length));
          return res.json(googleDrinks);
        }
      } catch (googleError) {
        console.error(`[Google Places Drinks Warning]: ${googleError.message}`);
      }
    }

    // 2. Fallback to MongoDB & OpenStreetMap
    if (isConnected) {
      const cached = await findNearbyDrinks(coordinates);
      if (!cached.length || forceRefresh) {
        try {
          await syncNearbyOSMDrinks(coordinates);
        } catch (osmError) {
          console.warn(`[OSM Drinks Warning]: ${osmError.message}`);
        }
      }
      const dbDrinks = await findNearbyDrinks(coordinates);
      if (dbDrinks && dbDrinks.length > 0) {
        return res.json(dbDrinks.map((d) => serializeDrink(d, baseUrl)));
      }
    }

    res.json([]);
  } catch (error) {
    next(error);
  }
};

export const getGoogleDrinkPhoto = async (req, res, next) => {
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

export const getDrinks = async (req, res, next) => {
  try {
    if (!isConnected) return res.status(503).json({ message: 'Cơ sở dữ liệu đang kết nối.' });
    const { category, type, limit = 50 } = req.query;
    const query = { active: true };
    if (category && category !== 'all') query.category = category;
    if (type && type !== 'all') query.drinkType = type;

    const drinks = await Drink.find(query).limit(Math.min(100, Number(limit))).sort({ rating: -1 });
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json(drinks.map((d) => serializeDrink(d, baseUrl)));
  } catch (error) {
    next(error);
  }
};

export const getDrinkById = async (req, res, next) => {
  try {
    if (!isConnected) return res.status(503).json({ message: 'Cơ sở dữ liệu đang kết nối.' });
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'ID quán nước không hợp lệ.' });
    }
    const drink = await Drink.findById(req.params.id);
    if (!drink) return res.status(404).json({ message: 'Không tìm thấy thức uống.' });
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json(serializeDrink(drink, baseUrl));
  } catch (error) {
    next(error);
  }
};

