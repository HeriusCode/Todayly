import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CalendarPlus,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CloudSun,
  Dices,
  ExternalLink,
  Globe2,
  Leaf,
  MapPin,
  Navigation,
  SearchX,
  Star,
  Phone,
  Utensils,
  WalletCards,
  X,
  ChevronRight,
} from 'lucide-react';
import { foodService } from '../../services/foodService';
import { scheduleService } from '../../services/scheduleService';
import { weatherService } from '../../services/weatherService';
import FoodCard from '../../components/food/FoodCard';
import FeaturedFood from '../../components/food/FeaturedFood';

const mealTabs = [
  ['all', 'Tất cả món'],
  ['breakfast', 'Ăn sáng 🍳'],
  ['lunch', 'Ăn trưa 🍜'],
  ['dinner', 'Ăn tối 🍲'],
  ['snack', 'Ăn vặt 🥟'],
];

const idOf = (food) => food?.id || food?._id || food?.name;
const mapEmbedUrl = (food) => {
  const [lon, lat] = food?.location?.coordinates || [];
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return '';
  if (food?.source === 'google_places') {
    return `https://www.google.com/maps?q=${lat},${lon}&z=16&output=embed`;
  }
  const delta = 0.008;
  const bbox = [lon - delta, lat - delta, lon + delta, lat + delta].join(',');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lon}`;
};
const directionsUrl = (food) => {
  const [lon, lat] = food?.location?.coordinates || [];
  const destination = Number.isFinite(lon) && Number.isFinite(lat)
    ? `${lat},${lon}`
    : food?.address || food?.name || '';
  const params = new URLSearchParams({ api: '1', destination });
  if (food?.source === 'google_places' && food?.externalId) {
    params.set('destination_place_id', food.externalId);
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
};
const localDate = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
};

const matchesMeal = (food, meal) => {
  if (meal === 'all') return true;
  if (Array.isArray(food.mealTypes) && food.mealTypes.includes(meal)) return true;
  if (food.mealType === meal) return true;

  const desc = `${food.category || ''} ${food.name || ''} ${food.description || ''}`.toLowerCase();
  if (meal === 'breakfast' && /phở|bún|bánh mì|xôi|cháo|miến|hủ tiếu|điểm tâm/i.test(desc)) {
    return true;
  }
  if (meal === 'lunch' && (food.mealType === 'dinner' || /quán|nhà hàng|cơm|bún|phở|lẩu|mì|gà|bò/i.test(desc))) {
    return true;
  }
  if (meal === 'dinner' && (food.mealType === 'lunch' || /quán|nhà hàng|cơm|lẩu|nướng|hải sản|bò|gà|bún|phở/i.test(desc))) {
    return true;
  }
  if (meal === 'snack' && /chè|kem|bánh|ốc|ăn vặt|nem/i.test(desc)) {
    return true;
  }
  return false;
};

export default function Food() {
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [foodError, setFoodError] = useState('');
  const [activeMeal, setActiveMeal] = useState('all');
  const [criteria, setCriteria] = useState({ distance: false, price: false, rating: false, open: false });
  const [sortBy, setSortBy] = useState('distance');
  const [showAllNearby, setShowAllNearby] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [weather, setWeather] = useState(null);
  const [savedIds, setSavedIds] = useState(() => new Set());
  const [randomizing, setRandomizing] = useState(false);
  const [luckyChoice, setLuckyChoice] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  const showToast = (message) => {
    window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(''), 2800);
  };

  useEffect(() => {
    let active = true;
    foodService.getNearbyForDevice({ radius: 10000 }).then((data) => {
      if (!active) return;
      setFoods(Array.isArray(data) ? data : []);
      setFoodError('');
    }).catch((error) => {
      if (!active) return;
      setFoodError(error.response?.data?.message || error.message || 'Không tải được dữ liệu quán ăn gần đây.');
    }).finally(() => {
      if (active) setLoadingFoods(false);
    });

    weatherService.getCurrentForDevice().then((data) => {
      if (active) setWeather(data);
    }).catch(() => {
      if (active) setWeather(null);
    });

    return () => {
      active = false;
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  const filteredFoods = useMemo(() => {
    const result = foods.filter((food) => {
      if (!matchesMeal(food, activeMeal)) return false;
      if (criteria.distance && Number(food.distanceNum ?? 99) > 2) return false;
      if (criteria.price && (Number(food.minPrice || 0) < 30000 || Number(food.minPrice || 0) > 80000)) return false;
      if (criteria.rating && Number(food.rating || 0) < 4.0) return false;
      if (criteria.open && food.isOpen === false) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'rating') return Number(b.rating || 0) - Number(a.rating || 0);
      if (sortBy === 'price') return Number(a.minPrice || 0) - Number(b.minPrice || 0);
      return Number(a.distanceNum ?? 99) - Number(b.distanceNum ?? 99);
    });
  }, [activeMeal, criteria, foods, sortBy]);

  const availableFoods = filteredFoods.length ? filteredFoods : foods;
  const preferredFood = availableFoods.find((food) => food.isFeatured);
  const featuredPool = preferredFood
    ? [preferredFood, ...availableFoods.filter((food) => idOf(food) !== idOf(preferredFood))]
    : availableFoods;
  const featured = featuredPool.length
    ? featuredPool[featuredIndex % featuredPool.length]
    : null;

  const nearbyPreview = filteredFoods.filter((food) => idOf(food) !== idOf(featured));
  const nearbyFoods = showAllNearby ? nearbyPreview : nearbyPreview.slice(0, visibleCount);

  const hasRatings = foods.some((food) => Number.isFinite(Number(food.rating)));
  const hasPrices = foods.some((food) => Boolean(food.priceRange));
  const usesGooglePlaces = foods.some((food) => food.source === 'google_places');

  const toggleCriterion = (name) => {
    setCriteria((current) => ({ ...current, [name]: !current[name] }));
  };

  const toggleSaved = (food) => {
    const id = idOf(food);
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    showToast(savedIds.has(id) ? 'Đã bỏ lưu món ăn' : 'Đã lưu vào bộ sưu tập ăn uống! 💖');
  };

  const rerollFeatured = () => {
    if (featuredPool.length < 2) {
      showToast('Chưa có thêm món phù hợp với bộ lọc hiện tại.');
      return;
    }
    setFeaturedIndex((index) => (index + 1) % featuredPool.length);
    showToast('Đã tìm một gợi ý mới cho bạn ✨');
  };

  const spinWheel = () => {
    if (randomizing || !foods.length) {
      if (!foods.length) showToast('Chưa có dữ liệu quán ăn để chọn ngẫu nhiên.');
      return;
    }
    setRandomizing(true);
    let count = 0;
    const interval = window.setInterval(() => {
      const item = foods[Math.floor(Math.random() * foods.length)];
      setLuckyChoice(item);
      count += 1;
      if (count < 12) return;
      window.clearInterval(interval);
      const chosen = foods[Math.floor(Math.random() * foods.length)];
      setLuckyChoice(chosen);
      setHistory((current) => [chosen.name, ...current.filter((item) => item !== chosen.name)].slice(0, 4));
      setRandomizing(false);
      showToast(`Gợi ý cho bạn: ${chosen.name} 🍽️`);
    }, 85);
  };

  const displayedLuckyFood = luckyChoice || foods[0] || null;

  const addToPlanner = async (food) => {
    if (!localStorage.getItem('todayly_token')) {
      showToast('Bạn cần đăng nhập để thêm món vào lịch trình.');
      return;
    }

    const times = {
      breakfast: ['08:00', '09:00'],
      lunch: ['12:30', '13:30'],
      dinner: ['18:30', '19:30'],
      snack: ['15:30', '16:00'],
      drink: ['10:00', '10:30'],
    };
    const [startTime, endTime] = times[food.mealType] || times.lunch;

    try {
      await scheduleService.addItem({
        title: `Ăn: ${food.name}`,
        type: 'food',
        activityType: 'food',
        scheduledDate: localDate(),
        startTime,
        endTime,
        category: 'Ăn uống',
        priority: 'medium',
        location: food.address || '',
        note: food.priceRange ? `Mức giá: ${food.priceRange}` : '',
      });
      setSelectedFood(null);
      showToast(`Đã thêm “${food.name}” vào lịch trình hôm nay!`);
    } catch (error) {
      showToast(error.response?.data?.message || 'Không thể thêm món vào lịch trình.');
    }
  };

  return (
    <div className="food-page">
      <div className="food-ambient food-ambient-one" />
      <div className="food-ambient food-ambient-two" />

      <div className="food-shell">
        <header className="food-heading food-rise">
          <div>
            <span className="food-kicker"><Utensils size={16} /> Trụ cột Ăn gì · Phong vị địa phương tươi mới</span>
            <h1>Hôm nay ăn gì? <i>🍜</i></h1>
            <p>Không biết ăn gì? Để Todayly gợi ý cho bạn dựa theo thời tiết, sở thích và khoảng cách.</p>
          </div>
          <aside className="food-weather-context">
            <span><CloudSun size={22} /></span>
            <div><small>Thời tiết hiện tại</small><strong>{weather ? `${weather.location || 'Vị trí hiện tại'} · ${weather.temperature}°C ${weather.condition || ''}` : 'Vị trí hiện tại · Đang cập nhật'}</strong></div>
          </aside>
        </header>

        <section className="food-filter-panel food-rise">
          <div className="food-meal-tabs">
            {mealTabs.map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={activeMeal === value ? 'active' : ''}
                onClick={() => {
                  setActiveMeal(value);
                  setFeaturedIndex(0);
                  setVisibleCount(12);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="food-criteria">
            <button type="button" className={criteria.distance ? 'active' : ''} onClick={() => toggleCriterion('distance')}><Navigation size={15} /> Khoảng cách (&lt; 2km)</button>
            <button type="button" disabled={!hasPrices} title={!hasPrices ? 'Nguồn dữ liệu chưa có thông tin giá' : ''} className={criteria.price ? 'active' : ''} onClick={() => toggleCriterion('price')}><WalletCards size={15} /> Khoảng giá (30k - 80k)</button>
            <button type="button" disabled={!hasRatings} title={!hasRatings ? 'OpenStreetMap không cung cấp điểm đánh giá' : ''} className={criteria.rating ? 'active' : ''} onClick={() => toggleCriterion('rating')}><Star size={15} /> Đánh giá 4.0+ ⭐</button>
            <button type="button" className={`open ${criteria.open ? 'active' : ''}`} onClick={() => toggleCriterion('open')}><i /> Đang mở cửa</button>
          </div>
        </section>

        {foodError && <div className="food-data-error"><SearchX size={18} /><span>{foodError}</span><button type="button" onClick={() => window.location.reload()}>Thử lại</button></div>}
        {loadingFoods && <div className="food-data-loading"><span /> Đang tìm kiếm các quán ăn gần vị trí của bạn…</div>}

        <section className="food-discovery food-rise">
          <FeaturedFood food={featured} weather={weather} onChoose={addToPlanner} onReroll={rerollFeatured} />

          <aside className="food-companion">
            <article className="food-randomizer">
              <header><div><span>🎲</span><h2>Không biết ăn gì?</h2></div><small>May mắn</small></header>
              <p>Lưỡng lự quá lâu? Để vận may ẩm thực quyết định bữa ăn tiếp theo cho bạn trong một cái chạm!</p>
              <div className={`food-slot ${randomizing ? 'spinning' : ''}`} aria-live="polite">
                {displayedLuckyFood?.image
                  ? <img key={idOf(displayedLuckyFood)} src={displayedLuckyFood.image} alt={displayedLuckyFood.name} />
                  : <div className="food-slot-placeholder"><Utensils size={30} /></div>}
                <div className="food-slot-overlay" />
                <strong>{displayedLuckyFood?.name || 'Đang tải danh sách quán ăn…'}</strong>
                {displayedLuckyFood?.distance && <small><MapPin size={12} /> {displayedLuckyFood.distance}</small>}
              </div>
              <button type="button" disabled={randomizing} onClick={spinWheel}><Dices size={20} /> {randomizing ? 'Đang chọn món…' : 'Chọn ngẫu nhiên cho tôi'}</button>
              <footer><span>Đã quay gần đây:</span><div>{history.length ? history.map((item) => <small key={item}>{item}</small>) : <small>Chưa có lượt quay</small>}</div></footer>
            </article>

            <article className="food-nutrition-tip">
              <header><Leaf size={20} /><strong>Mẹo sống thảnh thơi</strong></header>
              <p>Hôm nay bạn đã có đủ rau xanh chưa? Hãy ưu tiên các món nước kèm đĩa rau sống tươi non để cân bằng năng lượng nhé.</p>
              <footer><span>Mục tiêu rau xanh hôm nay</span><strong>2 / 3 bữa 🥗</strong></footer>
            </article>
          </aside>
        </section>

        <section className="food-nearby food-rise">
          <header>
            <div>
              <h2>Quán gần bạn</h2>
              <span>Tìm thấy {filteredFoods.length} địa điểm ẩm thực quanh bạn</span>
            </div>
            <div className="food-nearby-header-actions">
              {filteredFoods.length > 12 && (
                <button
                  type="button"
                  className="food-view-all"
                  onClick={() => setShowAllNearby((current) => !current)}
                >
                  {showAllNearby ? 'Thu gọn bớt' : `Xem tất cả (${filteredFoods.length})`}
                </button>
              )}
              <label>Sắp xếp theo:<span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="distance">Gần nhất</option><option value="rating">Đánh giá cao</option><option value="price">Giá thấp nhất</option></select><ChevronDown size={15} /></span></label>
            </div>
          </header>

          {nearbyFoods.length ? (
            <>
              <div className="food-nearby-grid">
                {nearbyFoods.map((food) => (
                  <FoodCard
                    key={idOf(food)}
                    food={food}
                    saved={savedIds.has(idOf(food))}
                    onSaveFavorite={toggleSaved}
                    onOpenDetail={setSelectedFood}
                  />
                ))}
              </div>

              {nearbyPreview.length > visibleCount && !showAllNearby && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
                  <button
                    type="button"
                    style={{
                      background: '#fff1e8',
                      color: '#9d4300',
                      border: '1px solid #ffd8c2',
                      borderRadius: '99px',
                      padding: '12px 24px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                  >
                    Xem thêm (+{Math.min(12, nearbyPreview.length - visibleCount)} quán) <ChevronRight size={16} />
                  </button>
                  <button
                    type="button"
                    style={{
                      background: '#eff4ff',
                      color: '#3525cd',
                      border: '1px solid #d3e4fe',
                      borderRadius: '99px',
                      padding: '12px 24px',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowAllNearby(true)}
                  >
                    Xem tất cả ({nearbyPreview.length} quán)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="food-empty">
              <SearchX size={34} />
              <strong>{loadingFoods ? 'Đang tìm quán ăn gần bạn' : 'Không tìm thấy quán ăn phù hợp'}</strong>
              <p>{loadingFoods ? 'Dữ liệu sẽ xuất hiện ngay sau khi được đồng bộ.' : 'Hãy bỏ bớt bộ lọc hoặc chọn mục Tất cả để xem toàn bộ quán.'}</p>
              <button
                type="button"
                onClick={() => {
                  setActiveMeal('all');
                  setCriteria({ distance: false, price: false, rating: false, open: false });
                }}
              >
                Xem tất cả món
              </button>
            </div>
          )}
          <a className={`food-attribution ${usesGooglePlaces ? 'google' : ''}`} href={usesGooglePlaces ? 'https://maps.google.com' : 'https://www.openstreetmap.org/copyright'} target="_blank" rel="noreferrer">{usesGooglePlaces ? 'Dữ liệu địa điểm và đánh giá từ Google Maps' : 'Dữ liệu quán ăn © OpenStreetMap contributors · ODbL'}</a>
        </section>
      </div>

      {selectedFood && (
        <div className="food-drawer-backdrop" role="presentation" onMouseDown={() => setSelectedFood(null)}>
          <section className="food-drawer" role="dialog" aria-modal="true" aria-labelledby="food-drawer-title" onMouseDown={(event) => event.stopPropagation()}>
            <header><div><span>Thông tin địa điểm</span><h2 id="food-drawer-title">{selectedFood.name}</h2></div><button type="button" onClick={() => setSelectedFood(null)} aria-label="Đóng"><X size={20} /></button></header>
            <div className="food-drawer-metrics"><span><Star size={17} /> {selectedFood.rating ?? 'Chưa có ĐG'}</span><i /><span><WalletCards size={17} /> {selectedFood.priceLabel || selectedFood.priceRange || 'Chưa có giá'}</span><i /><span><Navigation size={17} /> {selectedFood.distance || 'Chưa rõ'}</span></div>
            <div className="food-drawer-details">
              {selectedFood.address && <p><MapPin size={16} /><span><small>Địa chỉ</small>{selectedFood.address}</span></p>}
              {selectedFood.openHours && <p><Clock3 size={16} /><span><small>Giờ hoạt động</small>{selectedFood.openHours}</span></p>}
              {selectedFood.phone && <a href={`tel:${selectedFood.phone}`}><Phone size={16} /><span><small>Điện thoại</small>{selectedFood.phone}</span></a>}
              {selectedFood.website && <a href={selectedFood.website} target="_blank" rel="noreferrer"><Globe2 size={16} /><span><small>Website</small>{selectedFood.website}</span><ExternalLink size={13} /></a>}
            </div>
            <div className="food-drawer-map"><small>Bản đồ chỉ dẫn</small>{mapEmbedUrl(selectedFood) ? <iframe title={`Bản đồ ${selectedFood.name}`} src={mapEmbedUrl(selectedFood)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /> : <div><MapPin size={28} /><span>Chưa có tọa độ bản đồ</span></div>}</div>
            <div className="food-drawer-actions"><button type="button" onClick={() => addToPlanner(selectedFood)}><CalendarPlus size={18} /> Thêm vào lịch trình hôm nay</button><a href={directionsUrl(selectedFood)} target="_blank" rel="noreferrer"><Navigation size={17} /> Dẫn đường</a><button type="button" onClick={() => setSelectedFood(null)}>Đóng</button></div>
          </section>
        </div>
      )}

      <div className={`food-toast ${toast ? 'show' : ''}`} role="status"><CheckCircle2 size={20} /> {toast}</div>
    </div>
  );
}
