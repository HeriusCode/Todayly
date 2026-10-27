import mongoose from 'mongoose';
import Place from '../models/Place.js';
import { isConnected } from '../config/db.js';

const DEFAULT_RADIUS = 5000;
const MAX_RADIUS = 25000;
const MAX_RESULTS = 300;
const MIN_GOOGLE_CACHE_RESULTS = 40;
const GOOGLE_NEARBY_URL = 'https://places.googleapis.com/v1/places:searchNearby';

const OVERPASS_ENDPOINTS = [
  process.env.OVERPASS_URL,
  'https://overpass-api.de/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
].filter((value, index, values) => value && values.indexOf(value) === index);

const fallbackPlaceImages = {
  park: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1000&auto=format&fit=crop&q=80',
  entertainment: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80',
  shopping: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1000&auto=format&fit=crop&q=80',
  checkin: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1000&auto=format&fit=crop&q=80',
  cafe: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&auto=format&fit=crop&q=80',
  food: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80',
};

const getFallbackPlaceImage = (categoryKey = 'checkin') => {
  return fallbackPlaceImages[categoryKey] || fallbackPlaceImages.default;
};

// Classify place category based on name and Google/OSM types
const classifyPlace = (name = '', primaryType = '', types = []) => {
  const text = `${name} ${primaryType} ${types.join(' ')}`.toLowerCase();

  // 1. Công viên & Không gian xanh
  if (
    /\b(công viên|park|vườn hoa|sinh thái|camping|thảo cầm viên|botanical|bách thảo|yên sở|cầu giấy|nghĩa đô|thống nhất)\b/i.test(text) ||
    primaryType === 'park' ||
    primaryType === 'national_park'
  ) {
    return {
      categoryKey: 'park',
      category: 'Công viên xanh & Sinh thái',
      rankLabel: 'KHÔNG GIAN XANH',
      tags: ['Công viên', 'Thiên nhiên', 'Dã ngoại', 'Không khí trong lành'],
      openHours: '05:30 – 22:00',
      description: 'Không gian xanh thoáng đãng, nhiều cây bóng mát, lý tưởng để đi dạo, tập thể dục, dã ngoại hoặc thư giãn cuối tuần.',
    };
  }

  // 2. Giải trí & Rạp chiếu phim
  if (
    /\b(cgv|bhd|lotte cinema|beta cinemas|cinemas|rạp|chiếu phim|movie_theater|bowling|amusement|game center|tiin club|khu vui chơi|vr game|billiards|karaoke)\b/i.test(text) ||
    primaryType === 'movie_theater' ||
    primaryType === 'amusement_center' ||
    primaryType === 'bowling_alley'
  ) {
    return {
      categoryKey: 'entertainment',
      category: 'Giải trí & Rạp phim',
      rankLabel: 'TOP GIẢI TRÍ',
      tags: ['Rạp chiếu phim', 'Vui chơi', 'Cuối tuần', 'Xả stress'],
      openHours: '09:00 – 23:30',
      description: 'Điểm giải trí sôi động với cụm rạp màn hình lớn, âm thanh vòm sống động cùng nhiều trò chơi thư giãn cùng bạn bè.',
    };
  }

  // 3. Mua sắm & TTTM
  if (
    /\b(vincom|aeon mall|aeon|mega mall|lotte center|lotte mall|big c|go!|top market|trung tâm thương mại|shopping mall|siêu thị|chợ đêm|tràng tiền plaza)\b/i.test(text) ||
    primaryType === 'shopping_mall' ||
    primaryType === 'department_store'
  ) {
    return {
      categoryKey: 'shopping',
      category: 'Mua sắm & TTTM',
      rankLabel: 'MUA SẮM TIỆN ÍCH',
      tags: ['TTTM', 'Mua sắm', 'Tích hợp tiện ích', 'Điều hòa mát mẻ'],
      openHours: '09:30 – 22:00',
      description: 'Trung tâm mua sắm hiện đại tích hợp đa dạng thương hiệu thời trang, khu ẩm thực, siêu thị và khu vui chơi trong nhà.',
    };
  }

  // 4. Bãi biển & Hồ nước
  if (
    /\b(hồ|lake|bãi biển|beach|ven hồ|bờ hồ|bến thuyền|suối|water_park|công viên nước|hồ tây|hồ gươm|hồ gươm|hồ văn quán|hồ linh đàm|hồ trúc bạch)\b/i.test(text) ||
    primaryType === 'water_park'
  ) {
    return {
      categoryKey: 'beach',
      category: 'Bờ hồ & Thủy cảnh',
      rankLabel: 'VIEW MẶT NƯỚC',
      tags: ['Ven hồ', 'Hóng gió', 'Hoàng hôn', 'Thoáng đãng'],
      openHours: 'Mở cửa cả ngày',
      description: 'Khung cảnh mặt nước mênh mông, lộng gió, cực kỳ lý tưởng để ngắm hoàng hôn, hóng gió và dạo bộ buổi chiều.',
    };
  }

  // 5. Cafe sống ảo & View đẹp
  if (
    /\b(cafe|cà phê|coffee|tea lounge|view đẹp|rooftop|sân vườn|chill|acoustic|studio cafe)\b/i.test(text) ||
    primaryType === 'cafe'
  ) {
    return {
      categoryKey: 'cafe',
      category: 'Cafe view đẹp',
      rankLabel: 'CHECK-IN XINH',
      tags: ['Cafe sống ảo', 'View chill', 'Check-in', 'Góc sống ảo'],
      openHours: '07:30 – 22:30',
      description: 'Quán sở hữu không gian decor tinh tế, nhiều góc chụp ảnh sống ảo nghệ thuật và menu đồ uống hấp dẫn.',
    };
  }

  // 6. Khu ẩm thực & Nhà hàng
  if (
    /\b(nhà hàng|ẩm thực|buffet|phố đi bộ|chợ đêm ẩm thực|food court|food street|lẩu|nướng)\b/i.test(text) ||
    primaryType === 'restaurant'
  ) {
    return {
      categoryKey: 'food',
      category: 'Ẩm thực & Phố ẩm thực',
      rankLabel: 'ĐẶC SẢN PHỐ',
      tags: ['Ẩm thực', 'Ăn ngon', 'Tụ tập', 'Đa dạng món'],
      openHours: '10:00 – 22:30',
      description: 'Khu ẩm thực náo nhiệt với nhiều món ngon đặc sắc, không gian ấm cúng phù hợp tụ tập cùng bạn bè và gia đình.',
    };
  }

  // 7. Check-in, Bảo tàng & Di tích
  return {
    categoryKey: 'checkin',
    category: 'Check-in & Điểm tham quan',
    rankLabel: 'ĐIỂM ĐẾN NỔI BẬT',
    tags: ['Check-in', 'Khám phá', 'Văn hóa', 'Di tích'],
    openHours: '08:00 – 21:00',
    description: 'Điểm đến có kiến trúc độc đáo, giá trị văn hóa lịch sử hoặc cảnh quan ấn tượng, rất thích hợp để lưu giữ kỷ niệm.',
  };
};

// Calculate Haversine distance in meters
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

const formatDistance = (meters) => {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
};

// Serialize Place document for API response
const serializePlace = (place, originLat = null, originLon = null, baseUrl = '') => {
  const plain = place.toObject ? place.toObject() : { ...place };
  const [longitude, latitude] = plain.location?.coordinates || [place.longitude, place.latitude];

  let distanceInMeters = null;
  if (originLat !== null && originLon !== null && latitude && longitude) {
    distanceInMeters = calculateDistance(Number(originLat), Number(originLon), Number(latitude), Number(longitude));
  }

  let finalImage = plain.image;
  if (plain.googlePhotoRef && baseUrl) {
    finalImage = `${baseUrl}/api/places/google-photo?ref=${encodeURIComponent(plain.googlePhotoRef)}`;
  } else if (!finalImage) {
    finalImage = getFallbackPlaceImage(plain.categoryKey);
  }

  return {
    id: plain._id?.toString() || plain.id,
    _id: plain._id?.toString(),
    source: plain.source,
    externalId: plain.externalId,
    name: plain.name,
    category: plain.category,
    categoryKey: plain.categoryKey,
    rankLabel: plain.rankLabel || 'Đề xuất',
    description: plain.description,
    address: plain.address,
    phone: plain.phone,
    website: plain.website,
    image: finalImage,
    openHours: plain.openHours || '08:00 – 22:00',
    openingHours: plain.openingHours || plain.openHours || '',
    priceRange: plain.priceRange,
    rating: plain.rating ? Number(plain.rating.toFixed(1)) : 4.5,
    reviewsCount: plain.reviewsCount || Math.floor(Math.random() * 200 + 50),
    isOpen: plain.isOpen ?? true,
    badge: plain.badge || '',
    tags: plain.tags?.length ? plain.tags : ['Điểm đến', 'Khám phá'],
    distance: distanceInMeters !== null ? formatDistance(distanceInMeters) : 'Gần bạn',
    distanceNum: distanceInMeters !== null ? Number((distanceInMeters / 1000).toFixed(2)) : 1.0,
    latitude: Number(latitude),
    longitude: Number(longitude),
    location: plain.location,
    updatedAt: plain.updatedAt,
  };
};

// Generate multi-point grid for broad area coverage
const generateGridPoints = (centerLat, centerLon, radiusMeters) => {
  const points = [{ lat: centerLat, lon: centerLon }];
  const rMeters = Math.min(radiusMeters, 15000);
  const kmPerDegreeLat = 111.32;
  const kmPerDegreeLon = 111.32 * Math.cos((centerLat * Math.PI) / 180);

  const ring1DistKm = (rMeters * 0.5) / 1000;
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    points.push({
      lat: centerLat + (ring1DistKm * Math.cos(angle)) / kmPerDegreeLat,
      lon: centerLon + (ring1DistKm * Math.sin(angle)) / kmPerDegreeLon,
    });
  }

  if (radiusMeters > 3000) {
    const ring2DistKm = (rMeters * 0.85) / 1000;
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      points.push({
        lat: centerLat + (ring2DistKm * Math.cos(angle)) / kmPerDegreeLat,
        lon: centerLon + (ring2DistKm * Math.sin(angle)) / kmPerDegreeLon,
      });
    }
  }

  return points;
};

// Fetch real places from Google Places API (New)
const fetchGooglePlaces = async (lat, lon, radius = DEFAULT_RADIUS) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ [PlaceController] GOOGLE_PLACES_API_KEY chưa cấu hình.');
    return [];
  }

  const gridPoints = generateGridPoints(lat, lon, radius);
  const pointRadius = Math.max(1500, Math.min(radius * 0.6, 5000));

  // Destination categories to crawl
  const typeBatches = [
    ['tourist_attraction', 'park', 'museum', 'historical_landmark', 'national_park'],
    ['movie_theater', 'shopping_mall', 'amusement_center', 'bowling_alley', 'water_park'],
    ['cultural_center', 'art_gallery', 'book_store', 'cafe'],
  ];

  const fieldMask = [
    'places.id',
    'places.displayName',
    'places.formattedAddress',
    'places.location',
    'places.rating',
    'places.userRatingCount',
    'places.currentOpeningHours',
    'places.primaryType',
    'places.types',
    'places.photos',
    'places.websiteUri',
    'places.nationalPhoneNumber',
  ].join(',');

  const allPlaces = [];
  const seenIds = new Set();

  for (const point of gridPoints) {
    for (const batch of typeBatches) {
      try {
        const body = {
          includedTypes: batch,
          maxResultCount: 20,
          locationRestriction: {
            circle: {
              center: { latitude: point.lat, longitude: point.lon },
              radius: pointRadius,
            },
          },
        };

        const res = await fetch(GOOGLE_NEARBY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': fieldMask,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.warn(`⚠️ [Google Places New] Lỗi ${res.status}: ${errText.slice(0, 120)}`);
          continue;
        }

        const data = await res.json();
        const items = data.places || [];
        for (const p of items) {
          if (!p.id || seenIds.has(p.id)) continue;
          seenIds.add(p.id);

          const name = p.displayName?.text || '';
          if (!name) continue;

          const primaryType = p.primaryType || (p.types && p.types[0]) || '';
          const classification = classifyPlace(name, primaryType, p.types || []);

          let photoRef = '';
          if (p.photos && p.photos.length > 0) {
            photoRef = p.photos[0].name || '';
          }

          let openHours = classification.openHours;
          let isOpen = null;
          if (p.currentOpeningHours) {
            isOpen = p.currentOpeningHours.openNow ?? null;
            if (p.currentOpeningHours.weekdayDescriptions?.length) {
              openHours = p.currentOpeningHours.weekdayDescriptions[0].replace(/^[^:]+:\s*/, '') || openHours;
            }
          }

          allPlaces.push({
            source: 'google_places',
            externalId: p.id,
            name,
            category: classification.category,
            categoryKey: classification.categoryKey,
            rankLabel: classification.rankLabel,
            description: classification.description,
            address: p.formattedAddress || '',
            phone: p.nationalPhoneNumber || '',
            website: p.websiteUri || '',
            googlePhotoRef: photoRef,
            photoAttributions: p.photos?.[0]?.authorAttributions || [],
            image: photoRef ? '' : getFallbackPlaceImage(classification.categoryKey),
            openHours,
            openingHours: openHours,
            rating: p.rating || null,
            reviewsCount: p.userRatingCount || null,
            isOpen,
            tags: classification.tags,
            location: {
              type: 'Point',
              coordinates: [p.location?.longitude || lon, p.location?.latitude || lat],
            },
            sourceUrl: `https://www.google.com/maps/place/?q=place_id:${p.id}`,
            attribution: 'Google Maps',
            active: true,
            lastSyncedAt: new Date(),
            expiresAt: null, // Permanent storage
          });
        }
      } catch (err) {
        console.warn('⚠️ [Google Places Search] Gặp lỗi:', err.message);
      }
    }
  }

  return allPlaces;
};

// Fallback crawler via OpenStreetMap Overpass
const fetchOsmPlaces = async (lat, lon, radius = DEFAULT_RADIUS) => {
  const query = `
    [out:json][timeout:25];
    (
      node["leisure"="park"](around:${radius},${lat},${lon});
      way["leisure"="park"](around:${radius},${lat},${lon});
      node["tourism"~"attraction|museum|theme_park|zoo|viewpoint"](around:${radius},${lat},${lon});
      way["tourism"~"attraction|museum|theme_park|zoo|viewpoint"](around:${radius},${lat},${lon});
      node["amenity"="cinema"](around:${radius},${lat},${lon});
      node["shop"="mall"](around:${radius},${lat},${lon});
      way["shop"="mall"](around:${radius},${lat},${lon});
      node["historic"~"monument|memorial|archaeological_site"](around:${radius},${lat},${lon});
      node["natural"="water"](around:${radius},${lat},${lon});
    );
    out center tags;
  `;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (!res.ok) continue;

      const data = await res.json();
      const elements = data.elements || [];

      return elements
        .filter((el) => el.tags && el.tags.name)
        .map((el) => {
          const name = el.tags.name;
          const pLat = el.lat || el.center?.lat || lat;
          const pLon = el.lon || el.center?.lon || lon;
          const tags = el.tags;
          const osmTypeKey = tags.leisure || tags.tourism || tags.amenity || tags.shop || tags.historic || '';
          const classification = classifyPlace(name, osmTypeKey, Object.keys(tags));

          return {
            source: 'openstreetmap',
            externalId: `osm_${el.type}_${el.id}`,
            osmType: el.type,
            name,
            category: classification.category,
            categoryKey: classification.categoryKey,
            rankLabel: classification.rankLabel,
            description: classification.description,
            address: tags['addr:street'] ? `${tags['addr:housenumber'] || ''} ${tags['addr:street']}`.trim() : '',
            phone: tags.phone || tags['contact:phone'] || '',
            website: tags.website || tags['contact:website'] || '',
            googlePhotoRef: '',
            image: getFallbackPlaceImage(classification.categoryKey),
            openHours: tags.opening_hours || classification.openHours,
            openingHours: tags.opening_hours || classification.openHours,
            rating: 4.4 + Math.round(Math.random() * 5) / 10,
            reviewsCount: Math.floor(Math.random() * 150 + 20),
            isOpen: true,
            tags: classification.tags,
            location: {
              type: 'Point',
              coordinates: [pLon, pLat],
            },
            sourceUrl: `https://www.openstreetmap.org/${el.type}/${el.id}`,
            attribution: 'OpenStreetMap contributors',
            rawTags: tags,
            active: true,
            lastSyncedAt: new Date(),
            expiresAt: null, // Permanent storage
          };
        });
    } catch {
      // Try next endpoint
    }
  }

  return [];
};

// Upsert places into MongoDB Atlas
const upsertPlaces = async (places) => {
  if (!places.length || !isConnected) return 0;
  let count = 0;
  for (const item of places) {
    try {
      await Place.findOneAndUpdate(
        { externalId: item.externalId, source: item.source },
        { $set: item },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      count++;
    } catch (e) {
      // Ignore individual duplicate key errors
    }
  }
  return count;
};

export const refreshPlaceDatabase = async ({
  lat = 16.0544,
  lon = 108.2022,
  radius = DEFAULT_RADIUS,
} = {}) => {
  if (!isConnected) throw new Error('MongoDB chưa kết nối.');
  const parsedLat = Number(lat);
  const parsedLon = Number(lon);
  const parsedRadius = Math.min(MAX_RADIUS, Math.max(500, Number(radius) || DEFAULT_RADIUS));
  let places = await fetchGooglePlaces(parsedLat, parsedLon, parsedRadius);
  const googleCount = places.length;
  let osmCount = 0;

  if (places.length < MIN_GOOGLE_CACHE_RESULTS) {
    const osmPlaces = await fetchOsmPlaces(parsedLat, parsedLon, parsedRadius);
    osmCount = osmPlaces.length;
    places = [...places, ...osmPlaces];
  }

  const totalSaved = await upsertPlaces(places);
  return { googleCount, osmCount, totalSaved };
};

// Main Nearby Endpoint
export const getNearbyPlaces = async (req, res, next) => {
  try {
    if (!isConnected) {
      return res.status(503).json({ message: 'Cơ sở dữ liệu đang kết nối, vui lòng thử lại sau.' });
    }

    const {
      lat,
      lon,
      lng,
      radius = DEFAULT_RADIUS,
      category = 'all',
      limit = MAX_RESULTS,
    } = req.query;

    const parsedLat = Number(lat || 16.0544);
    const parsedLon = Number(lon || lng || 108.2022);
    const parsedRadius = Math.min(MAX_RADIUS, Math.max(500, Number(radius)));
    const baseGeoQuery = {
      active: true,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parsedLon, parsedLat],
          },
          $maxDistance: parsedRadius,
        },
      },
    };

    if (category && category !== 'all') {
      baseGeoQuery.categoryKey = category;
    }

    let refreshState = 'refreshed';
    try {
      await refreshPlaceDatabase({ lat: parsedLat, lon: parsedLon, radius: parsedRadius });
    } catch (refreshError) {
      refreshState = 'stale-fallback';
      console.warn('[Place on-demand sync]', refreshError.message);
    }
    const cachedPlaces = await Place.find(baseGeoQuery).limit(Number(limit)).lean();

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const serialized = cachedPlaces.map((p) => serializePlace(p, parsedLat, parsedLon, baseUrl));

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Todayly-Data-Source', `mongodb-${refreshState}`);
    res.json({
      count: serialized.length,
      places: serialized,
      meta: {
        radius: parsedRadius,
        center: { lat: parsedLat, lon: parsedLon },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Proxy Google Place Photos securely
export const getGooglePlacePhoto = async (req, res, next) => {
  try {
    const { ref } = req.query;
    if (!ref) {
      return res.status(400).json({ message: 'Thiếu photo reference.' });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return res.redirect(fallbackPlaceImages.default);
    }

    const url = `https://places.googleapis.com/v1/${encodeURI(ref)}/media?maxHeightPx=800&maxWidthPx=1200&skipHttpRedirect=true`;
    const checkRes = await fetch(url, { headers: { 'X-Goog-Api-Key': apiKey } });

    if (!checkRes.ok) {
      return res.redirect(fallbackPlaceImages.default);
    }

    const data = await checkRes.json();
    if (data.photoUri) {
      return res.redirect(data.photoUri);
    }

    return res.redirect(fallbackPlaceImages.default);
  } catch (error) {
    next(error);
  }
};

export const getPlaces = async (req, res, next) => {
  try {
    if (!isConnected) return res.status(503).json({ message: 'Cơ sở dữ liệu đang kết nối.' });
    const { category, limit = 50 } = req.query;
    const query = { active: true };
    if (category && category !== 'all') query.categoryKey = category;

    const places = await Place.find(query).limit(Math.min(100, Number(limit))).sort({ rating: -1 }).lean();
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    res.setHeader('X-Todayly-Data-Source', 'mongodb');
    res.json(places.map((p) => serializePlace(p, null, null, baseUrl)));
  } catch (error) {
    next(error);
  }
};

export const getPlaceById = async (req, res, next) => {
  try {
    if (!isConnected) return res.status(503).json({ message: 'Cơ sở dữ liệu đang kết nối.' });
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'ID địa điểm không hợp lệ.' });
    }
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: 'Không tìm thấy địa điểm.' });
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json(serializePlace(place, null, null, baseUrl));
  } catch (error) {
    next(error);
  }
};

export const getMyLocation = async (req, res) => {
  try {
    const ipRes = await fetch('http://ip-api.com/json', { signal: AbortSignal.timeout(3000) });
    if (ipRes.ok) {
      const data = await ipRes.json();
      if (data.status === 'success' && Number.isFinite(data.lat) && Number.isFinite(data.lon)) {
        return res.json({
          lat: data.lat,
          lon: data.lon,
          city: data.city || 'Hanoi',
          country: data.country || 'Vietnam',
        });
      }
    }
  } catch {
    // fallback
  }

  return res.json({
    lat: 16.0544,
    lon: 108.2022,
    city: 'Hanoi',
    country: 'Vietnam',
  });
};


