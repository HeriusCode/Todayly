import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CalendarPlus,
  ChevronDown,
  Clock3,
  Dices,
  ExternalLink,
  Globe2,
  LocateFixed,
  MapPin,
  Navigation,
  Phone,
  Search,
  SlidersHorizontal,
  SortAsc,
  Star,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlaceCard from '../../components/place/PlaceCard';
import PlaceMap from '../../components/place/PlaceMap';
import { useAuth } from '../../context/AuthContext';
import { placeService } from '../../services/placeService';
import { scheduleService } from '../../services/scheduleService';
import { weatherService } from '../../services/weatherService';
import { toDateKey } from '../../utils/dates';

const categories = [
  ['all', 'Tất cả', '✨'],
  ['cafe', 'Cafe sống ảo', '☕'],
  ['food', 'Ăn uống', '🍽️'],
  ['beach', 'Bờ hồ & Thủy cảnh', '🌊'],
  ['park', 'Công viên xanh', '🌳'],
  ['entertainment', 'Giải trí & Rạp phim', '🎬'],
  ['shopping', 'Mua sắm & TTTM', '🛍️'],
  ['checkin', 'Check-in ngắm cảnh', '📸'],
];

const categoryMatch = (place, category) => {
  if (category === 'all') return true;
  if (place.categoryKey === category) return true;
  const content = `${place.category || ''} ${(place.tags || []).join(' ')}`.toLowerCase();
  const patterns = {
    cafe: /cafe|cà phê|làm việc/,
    food: /ăn uống|ẩm thực|nhà hàng/,
    beach: /biển|bãi biển|hồ|thủy cảnh|mặt nước/,
    park: /công viên|thiên nhiên|cây xanh|sinh thái|camping/,
    entertainment: /giải trí|rạp|phim|cinema|bowling|vui chơi/,
    shopping: /mua sắm|trung tâm thương mại|mall|siêu thị/,
    checkin: /check-in|ngắm cảnh|kiến trúc|dạo đêm|văn hóa|di tích|bảo tàng/,
  };
  return patterns[category]?.test(content) || false;
};

const mapEmbedUrl = (place) => {
  const [lon, lat] = place?.location?.coordinates || [place?.longitude, place?.latitude];
  if (!Number.isFinite(Number(lon)) || !Number.isFinite(Number(lat))) return '';
  return `https://www.google.com/maps?q=${lat},${lon}&z=16&output=embed`;
};

const directionsUrl = (place) => {
  const destination =
    Number.isFinite(Number(place?.latitude)) && Number.isFinite(Number(place?.longitude))
      ? `${place.latitude},${place.longitude}`
      : place?.address || place?.name || '';
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
};

const initialSaved = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem('todayly_saved_places') || '[]'));
  } catch {
    return new Set();
  }
};

export default function Places() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [openOnly, setOpenOnly] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [savedPlaces, setSavedPlaces] = useState(initialSaved);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 20.9786444, lng: 105.7828063 });
  const [usingFallbackLocation, setUsingFallbackLocation] = useState(false);

  // Radius state
  const [radius, setRadius] = useState(5000);
  const [selectedRadiusLimit, setSelectedRadiusLimit] = useState(5);

  // Pagination / Load more
  const [visibleCount, setVisibleCount] = useState(4);

  // Detail Modal
  const [selectedPlaceModal, setSelectedPlaceModal] = useState(null);

  // Lucky wheel / Randomizer
  const [randomizing, setRandomizing] = useState(false);
  const [luckyChoice, setLuckyChoice] = useState(null);
  const [spinHistory, setSpinHistory] = useState([]);

  const loadPlaces = (targetRadius = radius, forceNewPosition = false) => {
    setLoading(true);
    placeService
      .getNearbyForDeviceWithMeta({ radius: targetRadius, refresh: false, forceNewPosition })
      .then((payload) => {
        const normalized = (Array.isArray(payload.places) ? payload.places : []).map((p) => ({
          ...p,
          id: p.id || p._id,
        }));
        setPlaces(normalized);
        if (payload.center && Number.isFinite(payload.center.lat) && Number.isFinite(payload.center.lng)) {
          setMapCenter(payload.center);
        }
        setUsingFallbackLocation(payload.usedFallbackLocation);
        if (normalized.length > 0) {
          setSelectedId(normalized[0].id);
        }
      })
      .catch(() => {
        setPlaces([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSelectRadius = (rVal) => {
    setSelectedRadiusLimit(rVal);
    const requestedRadius = rVal === 'all' ? 25000 : Number(rVal) * 1000;
    if (Number.isFinite(requestedRadius) && requestedRadius !== radius) {
      setRadius(requestedRadius);
    }
  };

  useEffect(() => {
    let active = true;
    loadPlaces(radius);

    weatherService
      .getCurrentForDevice()
      .then((data) => {
        if (active) setWeather(data);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [radius]);

  // Reset visible cards to 4 on filter change
  useEffect(() => {
    setVisibleCount(4);
  }, [activeCategory, query, sortBy, selectedRadiusLimit, openOnly]);

  const filteredPlaces = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi');
    const result = places.filter((place) => {
      if (!categoryMatch(place, activeCategory)) return false;
      if (openOnly && !place.isOpen) return false;

      // Filter by selected radius limit
      if (selectedRadiusLimit !== 'all' && selectedRadiusLimit !== null) {
        const dist = Number(place.distanceNum ?? 99);
        if (dist > Number(selectedRadiusLimit)) return false;
      }

      if (
        keyword &&
        !`${place.name} ${place.category} ${place.address} ${(place.tags || []).join(' ')}`
          .toLocaleLowerCase('vi')
          .includes(keyword)
      ) {
        return false;
      }
      return true;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
      if (sortBy === 'popular') return Number(b.reviewsCount || 0) - Number(a.reviewsCount || 0);
      return Number(a.distanceNum ?? 999) - Number(b.distanceNum ?? 999);
    });
  }, [places, activeCategory, openOnly, query, sortBy, selectedRadiusLimit]);

  const selected = filteredPlaces.find((place) => place.id === selectedId) || filteredPlaces[0] || null;

  const displayedPlaces = filteredPlaces.slice(0, visibleCount);
  const hasMore = filteredPlaces.length > visibleCount;

  // Lucky place selection
  const displayedLuckyPlace = luckyChoice || filteredPlaces[0] || places[0] || null;

  const spinWheel = () => {
    if (randomizing || !places.length) return;
    setRandomizing(true);
    let count = 0;
    const pool = filteredPlaces.length ? filteredPlaces : places;
    const interval = window.setInterval(() => {
      const item = pool[Math.floor(Math.random() * pool.length)];
      setLuckyChoice(item);
      count += 1;
      if (count > 16) {
        window.clearInterval(interval);
        const chosen = pool[Math.floor(Math.random() * pool.length)];
        setLuckyChoice(chosen);
        setRandomizing(false);
        const nameClean = chosen.name.split(' - ')[0];
        setSpinHistory((prev) => [nameClean, ...prev.filter((x) => x !== nameClean)].slice(0, 4));
      }
    }, 90);
  };

  const handleCardClick = useCallback((place) => {
    setSelectedId(place.id);
    setSelectedPlaceModal(place);
  }, []);

  const toggleSave = (id) => {
    setSavedPlaces((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('todayly_saved_places', JSON.stringify([...next]));
      return next;
    });
  };

  const addToSchedule = async (place) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await scheduleService.addItem({
        title: `Đi đến ${place.name}`,
        scheduledDate: toDateKey(),
        startTime: '16:30',
        endTime: '18:00',
        type: 'place',
        category: 'Thư giãn',
        priority: 'low',
        matrixQuadrant: 'important_not_urgent',
        location: place.address || place.name,
        note: place.description || '',
        badge: 'Gợi ý địa điểm',
        color: 'tertiary',
      });
      setMessage(`Đã thêm “${place.name}” vào lịch trình hôm nay.`);
      setTimeout(() => setMessage(''), 4000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Không thể thêm địa điểm vào lịch trình.');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div className="places-page">
      <div className="places-shell">
        {/* Hero Section: Cleaned up as requested */}
        <section className="places-hero places-enter">
          <div>
            <span className="places-weather-label">
              <LocateFixed size={15} /> Gợi ý tự động theo thời tiết · {weather?.temperature ?? 28}°C{' '}
              {weather?.condition || 'nắng nhẹ'}
            </span>
            <h1>
              Hôm nay đi đâu? <span>📍</span>
            </h1>
            <p>
              Khám phá những điểm đến, công viên, khu giải trí và check-in thật quanh bạn, phù hợp với tâm trạng ngày hôm nay.
            </p>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="places-categories places-enter places-delay-1">
          {categories.map(([id, label, icon]) => (
            <button
              type="button"
              key={id}
              className={activeCategory === id ? 'active' : ''}
              onClick={() => setActiveCategory(id)}
            >
              {label} {icon}
              {id === 'all' && ` (${places.length})`}
            </button>
          ))}
        </section>

        {/* Main Content Layout */}
        <section className="places-layout places-enter places-delay-2">
          {/* Left Column: Places Search & List */}
          <div className="places-results">
            <div className="places-search-bar">
              <label>
                <Search size={19} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tìm điểm check-in, công viên, rạp phim, TTTM..."
                />
              </label>
              <div>
                <label>
                  <SortAsc size={16} />
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <option value="distance">Gần nhất</option>
                    <option value="rating">Đánh giá cao</option>
                    <option value="popular">Phổ biến nhất</option>
                  </select>
                </label>
                <button
                  type="button"
                  className={openOnly ? 'active' : ''}
                  onClick={() => setOpenOnly((value) => !value)}
                >
                  <SlidersHorizontal size={16} /> Đang mở
                </button>
              </div>
            </div>

            <div className="places-result-summary">
              <p>
                Hiển thị <strong>{filteredPlaces.length} địa điểm thật</strong> quanh bạn (Bán kính{' '}
                {selectedRadiusLimit === 'all' ? 'toàn bộ' : `< ${selectedRadiusLimit}km`})
              </p>
              <span><i /> {openOnly ? 'Chỉ đang mở cửa' : usingFallbackLocation ? 'Đang dùng vị trí mặc định Đà Nẵng' : 'Vị trí GPS hiện tại · Google Places & OSM'}</span>
            </div>

            {message && <div className="places-message">{message}</div>}

            {/* List of Place Cards: Limited to 4 initially */}
            <div className="places-list">
              {displayedPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isSaved={savedPlaces.has(place.id)}
                  selected={selected?.id === place.id}
                  onToggleSave={toggleSave}
                  onSelect={handleCardClick}
                  onAddSchedule={addToSchedule}
                />
              ))}

              {/* Load More Button */}
              {hasMore && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                    style={{
                      background: '#3525cd',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '99px',
                      padding: '11px 24px',
                      fontWeight: 750,
                      fontSize: '12px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 16px rgba(53, 37, 205, 0.22)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'transform 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                  >
                    Xem thêm (+{Math.min(4, filteredPlaces.length - visibleCount)} địa điểm) <ChevronDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisibleCount(filteredPlaces.length)}
                    style={{
                      background: '#eff4ff',
                      color: '#3525cd',
                      border: '1px solid #d3e4fe',
                      borderRadius: '99px',
                      padding: '11px 20px',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Xem tất cả ({filteredPlaces.length})
                  </button>
                </div>
              )}

              {!loading && filteredPlaces.length === 0 && (
                <div className="places-empty">
                  <MapPin size={32} />
                  <strong>Không tìm thấy địa điểm phù hợp</strong>
                  <p>Hãy đổi danh mục hoặc chọn bán kính rộng hơn trên bản đồ.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setQuery('');
                      setSelectedRadiusLimit('all');
                      setOpenOnly(false);
                    }}
                  >
                    Xem tất cả địa điểm
                  </button>
                </div>
              )}

              {loading && (
                <div className="places-loading">
                  <span /> Đang tải dữ liệu điểm đến thật quanh bạn…
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps + Lucky Wheel underneath */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Real Map Component */}
            <PlaceMap
              places={filteredPlaces}
              selected={selected}
              onSelect={handleCardClick}
              radius={radius}
              selectedRadiusLimit={selectedRadiusLimit}
              onSelectRadius={handleSelectRadius}
              userCenter={mapCenter}
              onRefreshLocation={() => loadPlaces(radius, true)}
            />

            {/* Lucky Wheel / Randomizer Widget */}
            <article className="food-randomizer">
              <header>
                <div>
                  <span>🎲</span>
                  <h2>Không biết đi đâu?</h2>
                </div>
                <small>May mắn</small>
              </header>
              <p>Lưỡng lự chưa biết đi đâu chơi? Để vận may chọn một điểm đến thú vị quanh bạn trong một cái chạm!</p>
              <div className={`food-slot ${randomizing ? 'spinning' : ''}`} aria-live="polite">
                {displayedLuckyPlace?.image ? (
                  <img
                    key={displayedLuckyPlace.id}
                    src={displayedLuckyPlace.image}
                    alt={displayedLuckyPlace.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                ) : (
                  <div className="food-slot-placeholder">
                    <MapPin size={30} />
                  </div>
                )}
                <div className="food-slot-overlay" />
                <strong>{displayedLuckyPlace?.name || 'Đang tải danh sách địa điểm…'}</strong>
                {displayedLuckyPlace?.distance && (
                  <small>
                    <MapPin size={12} /> {displayedLuckyPlace.distance} • {displayedLuckyPlace.category}
                  </small>
                )}
              </div>
              <button
                type="button"
                disabled={randomizing || !places.length}
                onClick={spinWheel}
              >
                <Dices size={20} /> {randomizing ? 'Đang chọn điểm đến…' : 'Chọn ngẫu nhiên cho tôi'}
              </button>
              {luckyChoice && (
                <button
                  type="button"
                  onClick={() => setSelectedPlaceModal(luckyChoice)}
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    padding: '9px',
                    borderRadius: '12px',
                    background: '#eff4ff',
                    color: '#3525cd',
                    border: '1px solid #d3e4fe',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Xem chi tiết {luckyChoice.name.split(' - ')[0]} →
                </button>
              )}
              <footer>
                <span>Đã quay gần đây:</span>
                <div>
                  {spinHistory.length ? (
                    spinHistory.map((item, idx) => <small key={idx}>{item}</small>)
                  ) : (
                    <small>Chưa có lượt quay</small>
                  )}
                </div>
              </footer>
            </article>
          </div>
        </section>
      </div>

      {/* Place Detail Modal Dialog (Identical to "Hôm nay ăn gì") */}
      {selectedPlaceModal && (
        <div
          className="food-drawer-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedPlaceModal(null)}
        >
          <section
            className="food-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="place-drawer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>Thông tin địa điểm</span>
                <h2 id="place-drawer-title">{selectedPlaceModal.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlaceModal(null)}
                aria-label="Đóng"
              >
                <X size={20} />
              </button>
            </header>

            <div className="food-drawer-metrics">
              <span>
                <Star size={17} /> {selectedPlaceModal.rating ? `${selectedPlaceModal.rating} (${selectedPlaceModal.reviewsCount} ĐG)` : 'Chưa có ĐG'}
              </span>
              <i />
              <span>
                <Clock3 size={17} /> {selectedPlaceModal.openHours || 'Mở cửa cả ngày'}
              </span>
              <i />
              <span>
                <Navigation size={17} /> {selectedPlaceModal.distance || 'Gần bạn'}
              </span>
            </div>

            <div className="food-drawer-details">
              {selectedPlaceModal.address && (
                <p>
                  <MapPin size={16} />
                  <span>
                    <small>Địa chỉ</small>
                    {selectedPlaceModal.address}
                  </span>
                </p>
              )}
              <p>
                <Clock3 size={16} />
                <span>
                  <small>Trạng thái</small>
                  {selectedPlaceModal.isOpen ? 'Đang mở cửa' : 'Đang đóng cửa'}
                </span>
              </p>
              {selectedPlaceModal.phone && (
                <a href={`tel:${selectedPlaceModal.phone}`}>
                  <Phone size={16} />
                  <span>
                    <small>Điện thoại</small>
                    {selectedPlaceModal.phone}
                  </span>
                </a>
              )}
              {selectedPlaceModal.website && (
                <a href={selectedPlaceModal.website} target="_blank" rel="noreferrer">
                  <Globe2 size={16} />
                  <span>
                    <small>Website</small>
                    {selectedPlaceModal.website}
                  </span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>

            {selectedPlaceModal.description && (
              <div
                style={{
                  background: '#f8fafc',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#475569',
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ display: 'block', marginBottom: '4px', color: '#1e293b' }}>
                  Giới thiệu điểm đến
                </strong>
                {selectedPlaceModal.description}
              </div>
            )}

            {selectedPlaceModal.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedPlaceModal.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: '#eff4ff',
                      color: '#3525cd',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '99px',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Embedded Map */}
            <div className="food-drawer-map">
              <small>Bản đồ chỉ dẫn</small>
              {mapEmbedUrl(selectedPlaceModal) ? (
                <iframe
                  title={`Bản đồ ${selectedPlaceModal.name}`}
                  src={mapEmbedUrl(selectedPlaceModal)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div>
                  <MapPin size={28} />
                  <span>Chưa có tọa độ bản đồ</span>
                </div>
              )}
            </div>

            <div className="food-drawer-actions">
              <button
                type="button"
                onClick={() => {
                  addToSchedule(selectedPlaceModal);
                  setSelectedPlaceModal(null);
                }}
              >
                <CalendarPlus size={18} /> Thêm vào lịch trình hôm nay
              </button>
              <a
                href={directionsUrl(selectedPlaceModal)}
                target="_blank"
                rel="noreferrer"
              >
                <Navigation size={17} /> Dẫn đường Google Maps
              </a>
              <button
                type="button"
                onClick={() => setSelectedPlaceModal(null)}
              >
                Đóng
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
