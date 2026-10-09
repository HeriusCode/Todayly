import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  CloudSun,
  Dices,
  ExternalLink,
  Globe2,
  Leaf,
  MapPin,
  Navigation,
  Phone,
  RotateCw,
  Search,
  SearchX,
  Sparkles,
  Star,
  Utensils,
  WalletCards,
  X,
} from 'lucide-react';
import DrinkCard from '../../components/drink/DrinkCard';
import DrinkRecipes from '../../components/drink/DrinkRecipes';
import FeaturedDrink from '../../components/drink/FeaturedDrink';
import { drinkCategories, drinkRecipes } from '../../data/mockDrinks';
import { drinkService } from '../../services/drinkService';
import { weatherService } from '../../services/weatherService';

const initialSaved = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem('todayly_saved_drinks') || '[]'));
  } catch {
    return new Set();
  }
};

const initialWater = () => {
  const stored = Number(localStorage.getItem('todayly_water_ml'));
  return Number.isFinite(stored) && stored >= 0 ? Math.min(2000, stored) : 1200;
};

const mapEmbedUrl = (drink) => {
  const [lon, lat] = drink?.location?.coordinates || [];
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return '';
  return `https://www.google.com/maps?q=${lat},${lon}&z=16&output=embed`;
};

const directionsUrl = (drink) => {
  const [lon, lat] = drink?.location?.coordinates || [];
  const destination = Number.isFinite(lon) && Number.isFinite(lat)
    ? `${lat},${lon}`
    : drink?.address || drink?.storeName || '';
  const params = new URLSearchParams({ api: '1', destination });
  if (drink?.source === 'google_places' && drink?.externalId) {
    params.set('destination_place_id', drink.externalId);
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
};

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [loadingDrinks, setLoadingDrinks] = useState(true);
  const [drinkError, setDrinkError] = useState('');
  const [radius, setRadius] = useState(2000);
  const [selectedRadiusLimit, setSelectedRadiusLimit] = useState(2);
  const [radiusDropdownOpen, setRadiusDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const radiusDropdownRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [quickFilters, setQuickFilters] = useState({
    sugar: false,
    price: false,
    open: false,
    work: false,
  });
  const [sortBy, setSortBy] = useState('rating');
  const [visibleCount, setVisibleCount] = useState(16);
  const [showAllDrinks, setShowAllDrinks] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [saved, setSaved] = useState(initialSaved);
  const [waterMl, setWaterMl] = useState(initialWater);
  const [weather, setWeather] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const [randomizing, setRandomizing] = useState(false);
  const [luckyChoice, setLuckyChoice] = useState(null);
  const [history, setHistory] = useState([]);
  const [notice, setNotice] = useState('');
  const noticeTimerRef = useRef(null);

  const showToast = (message) => {
    window.clearTimeout(noticeTimerRef.current);
    setNotice(message);
    noticeTimerRef.current = window.setTimeout(() => setNotice(''), 2800);
  };

  const loadDrinks = (targetRadius = radius, forceRefresh = false) => {
    setLoadingDrinks(true);
    setDrinkError('');
    drinkService.getNearbyForDevice({ radius: targetRadius, refresh: forceRefresh })
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setDrinks(list);
        if (forceRefresh) {
          showToast(`Đã quét và lưu ${list.length} quán nước & cafe vào database! ☕🧋`);
        }
      })
      .catch((error) => {
        setDrinkError(error.response?.data?.message || error.message || 'Không tải được dữ liệu quán nước.');
      })
      .finally(() => {
        setLoadingDrinks(false);
      });
  };

  // Close radius dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (radiusDropdownRef.current && !radiusDropdownRef.current.contains(e.target)) {
        setRadiusDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectRadius = (rVal) => {
    setSelectedRadiusLimit(rVal);
    setRadiusDropdownOpen(false);
    if (typeof rVal === 'number' && rVal * 1000 > radius) {
      setRadius(rVal * 1000);
      loadDrinks(rVal * 1000, false);
    }
  };

  useEffect(() => {
    let active = true;
    loadDrinks(radius, false);

    weatherService.getCurrentForDevice().then((data) => {
      if (active) setWeather(data);
    }).catch(() => {
      if (active) setWeather(null);
    });

    return () => {
      active = false;
      window.clearTimeout(noticeTimerRef.current);
    };
  }, [radius]);

  const filteredDrinks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const result = drinks.filter((drink) => {
      // 1. Category filter
      if (activeCategory !== 'all' && drink.drinkType !== activeCategory) return false;

      // 2. Selected radius limit
      if (selectedRadiusLimit !== 'all' && selectedRadiusLimit !== null) {
        const dist = Number(drink.distanceNum ?? 99);
        if (dist > Number(selectedRadiusLimit)) return false;
      }

      // 3. Quick filters
      if (quickFilters.sugar && !/không đường|ít ngọt|30%/i.test(drink.sugar || '')) return false;
      if (quickFilters.price && Number(drink.minPrice || 0) > 45000) return false;
      if (quickFilters.open && drink.isOpen === false) return false;
      if (quickFilters.work && !drink.workFriendly) return false;

      // 4. Text search query
      if (query) {
        const name = (drink.name || '').toLowerCase();
        const store = (drink.storeName || '').toLowerCase();
        const cat = (drink.category || '').toLowerCase();
        const addr = (drink.address || '').toLowerCase();
        const desc = (drink.description || '').toLowerCase();
        if (!name.includes(query) && !store.includes(query) && !cat.includes(query) && !addr.includes(query) && !desc.includes(query)) {
          return false;
        }
      }

      return true;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'distance') return Number(a.distanceNum ?? 99) - Number(b.distanceNum ?? 99);
      if (sortBy === 'price') return Number(a.minPrice || 0) - Number(b.minPrice || 0);
      return Number(b.rating || 0) - Number(a.rating || 0);
    });
  }, [activeCategory, drinks, quickFilters, selectedRadiusLimit, searchTerm, sortBy]);

  const featuredPool = filteredDrinks.length ? filteredDrinks : drinks;
  const featured = featuredPool.length ? featuredPool[featuredIndex % featuredPool.length] : null;

  const nearbyPreview = filteredDrinks.filter((d) => d.id !== featured?.id);
  const displayedDrinks = showAllDrinks ? nearbyPreview : nearbyPreview.slice(0, visibleCount);

  const toggleSaved = (id) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('todayly_saved_drinks', JSON.stringify([...next]));
      return next;
    });
    showToast(saved.has(id) ? 'Đã bỏ lưu thức uống' : 'Đã lưu vào danh sách yêu thích! 💖');
  };

  const addWater = (amount) => {
    setWaterMl((current) => {
      const next = Math.min(2000, current + amount);
      localStorage.setItem('todayly_water_ml', String(next));
      return next;
    });
  };

  const spinWheel = () => {
    if (randomizing || !drinks.length) {
      if (!drinks.length) showToast('Chưa có dữ liệu quán nước để chọn ngẫu nhiên.');
      return;
    }
    setRandomizing(true);
    let count = 0;
    const interval = window.setInterval(() => {
      const item = drinks[Math.floor(Math.random() * drinks.length)];
      setLuckyChoice(item);
      count += 1;
      if (count < 12) return;
      window.clearInterval(interval);
      const chosen = drinks[Math.floor(Math.random() * drinks.length)];
      setLuckyChoice(chosen);
      const winnerName = chosen.storeName || chosen.name;
      setHistory((current) => [winnerName, ...current.filter((item) => item !== winnerName)].slice(0, 4));
      setRandomizing(false);
      showToast(`Gợi ý cho bạn: ${winnerName} 🍹`);
    }, 85);
  };

  const displayedLuckyDrink = luckyChoice || drinks[0] || null;

  const chooseDrink = () => {
    if (!featured) return;
    showToast(`Đã chọn “${featured.name}” cho hôm nay! 🍹`);
  };

  const weatherTemperature = weather?.temperature ?? 29;
  const weatherCondition = weather?.condition || 'Nắng nhẹ';

  // Category counts
  const categoryCountMap = useMemo(() => {
    const map = { all: drinks.length };
    drinks.forEach((d) => {
      if (d.drinkType) {
        map[d.drinkType] = (map[d.drinkType] || 0) + 1;
      }
    });
    return map;
  }, [drinks]);

  return (
    <div className="drinks-page">
      <div className="drinks-shell">
        <section className="drinks-intro drinks-enter">
          <div>
            <span className="drinks-eyebrow">☕ Trụ cột Thức uống · Giải nhiệt & Nạp năng lượng</span>
            <h1>Hôm nay uống gì? <span>🧋</span><span>☕</span></h1>
            <p>Khám phá các quán cafe, trà sữa, trà hoa quả và nước ép tươi ngon xung quanh bạn. Dữ liệu thực tế được lưu vào database.</p>
          </div>
          <article className="drinks-weather">
            <span><CloudSun size={29} /></span>
            <div>
              <strong>{weatherTemperature}°C · {weatherCondition}</strong>
              <small>Khí hậu lý tưởng</small>
              <p>Gợi ý: bổ sung đủ nước và chọn đồ uống thanh nhiệt</p>
            </div>
          </article>
        </section>

        <section className="drinks-filters drinks-enter drinks-delay-1" style={{ position: 'relative', zIndex: 10 }}>
          {/* Category Tabs */}
          <div className="drinks-category-list">
            {drinkCategories.map((category) => {
              const count = categoryCountMap[category.id] || 0;
              return (
                <button
                  type="button"
                  key={category.id}
                  className={activeCategory === category.id ? 'active' : ''}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setFeaturedIndex(0);
                    setVisibleCount(16);
                  }}
                >
                  <span>{category.icon}</span>
                  {category.label}
                  {count > 0 && ` (${count})`}
                </button>
              );
            })}
          </div>

          {/* Criteria & Search Bar */}
          <div className="food-criteria" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '9px', alignItems: 'center' }}>
            {/* Radius Dropdown (pops up upwards above button) */}
            <div ref={radiusDropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
              <button
                type="button"
                className={selectedRadiusLimit !== 'all' ? 'active' : ''}
                onClick={() => setRadiusDropdownOpen((prev) => !prev)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '99px',
                  padding: '7px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid rgba(199,196,216,.25)',
                  background: selectedRadiusLimit !== 'all' ? '#0b1c30' : '#fff',
                  color: selectedRadiusLimit !== 'all' ? '#fff' : '#656474',
                }}
              >
                <Navigation size={14} />
                <span>
                  {selectedRadiusLimit === 'all'
                    ? 'Khoảng cách: Tất cả'
                    : `Khoảng cách (< ${selectedRadiusLimit}km)`}
                </span>
                <ChevronDown
                  size={13}
                  style={{
                    transform: radiusDropdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>

              {radiusDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    left: 0,
                    zIndex: 40,
                    minWidth: '220px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.08)',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <div style={{ padding: '6px 10px 4px', fontSize: '10px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Chọn bán kính quán nước
                  </div>
                  {[
                    { value: 1, label: '< 1 km', desc: 'Đi bộ ~10 phút' },
                    { value: 2, label: '< 2 km', desc: 'Gần tôi (Mặc định)' },
                    { value: 3, label: '< 3 km', desc: 'Đi xe máy ~5 phút' },
                    { value: 5, label: '< 5 km', desc: 'Khu vực lân cận' },
                    { value: 10, label: '< 10 km', desc: 'Toàn thành phố' },
                    { value: 'all', label: 'Tất cả khoảng cách', desc: 'Không giới hạn bán kính' },
                  ].map((opt) => {
                    const isSelected = selectedRadiusLimit === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectRadius(opt.value)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '7px 10px',
                          borderRadius: '8px',
                          border: 'none',
                          background: isSelected ? '#eff4ff' : 'transparent',
                          color: isSelected ? '#3525cd' : '#334155',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: isSelected ? 700 : 500,
                          textAlign: 'left',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.background = '#f8fafc';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '12px', fontWeight: isSelected ? 700 : 600 }}>{opt.label}</span>
                          <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 400 }}>{opt.desc}</span>
                        </div>
                        {isSelected && <Check size={14} style={{ color: '#3525cd', marginLeft: '8px', flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              className={quickFilters.sugar ? 'active' : ''}
              onClick={() => setQuickFilters((val) => ({ ...val, sugar: !val.sugar }))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '99px',
                padding: '7px 12px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid rgba(199,196,216,.25)',
                background: quickFilters.sugar ? '#0b1c30' : '#fff',
                color: quickFilters.sugar ? '#fff' : '#656474',
              }}
            >
              <Leaf size={15} /> Ít đường (0% – 30%)
            </button>

            <button
              type="button"
              className={quickFilters.price ? 'active' : ''}
              onClick={() => setQuickFilters((val) => ({ ...val, price: !val.price }))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '99px',
                padding: '7px 12px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid rgba(199,196,216,.25)',
                background: quickFilters.price ? '#0b1c30' : '#fff',
                color: quickFilters.price ? '#fff' : '#656474',
              }}
            >
              <WalletCards size={15} /> Dưới 45.000đ
            </button>

            <button
              type="button"
              className={quickFilters.open ? 'active' : ''}
              onClick={() => setQuickFilters((val) => ({ ...val, open: !val.open }))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '99px',
                padding: '7px 12px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid rgba(199,196,216,.25)',
                background: quickFilters.open ? '#0b1c30' : '#fff',
                color: quickFilters.open ? '#fff' : '#656474',
              }}
            >
              <i style={{ width: 7, height: 7, borderRadius: '50%', background: '#00875d' }} /> Đang mở cửa
            </button>

            <button
              type="button"
              className={quickFilters.work ? 'active' : ''}
              onClick={() => setQuickFilters((val) => ({ ...val, work: !val.work }))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '99px',
                padding: '7px 12px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid rgba(199,196,216,.25)',
                background: quickFilters.work ? '#0b1c30' : '#fff',
                color: quickFilters.work ? '#fff' : '#656474',
              }}
            >
              <BriefcaseBusiness size={15} /> Chỗ ngồi làm việc
            </button>

            {/* Right: Search Input + Reload button */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  border: '1px solid rgba(199, 196, 216, 0.45)',
                  borderRadius: '99px',
                  padding: '4px 12px 4px 10px',
                  boxShadow: '0 2px 8px rgba(38, 44, 80, 0.04)',
                  minWidth: '250px',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              >
                <Search size={14} style={{ color: '#94a3b8', marginRight: '6px', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Tìm quán cafe, trà sữa, món..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#1e293b',
                    width: '100%',
                    padding: '3px 0',
                  }}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: '2px',
                      cursor: 'pointer',
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title="Xóa tìm kiếm"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => loadDrinks(radius, true)}
                disabled={loadingDrinks}
                title="Quét và cập nhật dữ liệu quán nước mới nhất"
                style={{
                  background: '#fff1e8',
                  color: '#9d4300',
                  border: '1px solid #ffd8c2',
                  borderRadius: '99px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 2px 6px rgba(38, 44, 80, 0.03)',
                }}
              >
                <RotateCw size={13} className={loadingDrinks ? 'animate-spin' : ''} />
                <span>Làm mới</span>
              </button>
            </div>
          </div>
        </section>

        {drinkError && (
          <div className="food-data-error" style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 14px', borderRadius: '14px', background: '#fff0ef', color: '#93000a', border: '1px solid #ffd0cc', fontSize: '11px', fontWeight: 650 }}>
            <SearchX size={18} />
            <span style={{ flex: 1 }}>{drinkError}</span>
            <button
              type="button"
              onClick={() => loadDrinks(radius, true)}
              style={{ borderRadius: '99px', background: '#93000a', padding: '6px 12px', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '10px', fontWeight: 800 }}
            >
              Thử lại
            </button>
          </div>
        )}

        {loadingDrinks && (
          <div className="food-data-loading" style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '12px 14px', borderRadius: '14px', background: '#eff4ff', color: '#3525cd', border: '1px solid #dce7ff', fontSize: '11px', fontWeight: 650 }}>
            <RotateCw size={14} className="animate-spin" />
            Đang quét và lưu các quán cafe & nước uống trong bán kính {radius / 1000}km vào database…
          </div>
        )}

        <section className="drinks-discovery drinks-enter drinks-delay-2">
          <FeaturedDrink
            drink={featured}
            saved={saved.has(featured?.id)}
            onSave={toggleSaved}
            onReroll={() => setFeaturedIndex((index) => index + 1)}
            onChoose={chooseDrink}
          />
          <aside className="food-companion">
            <article className="food-randomizer">
              <header>
                <div><span>🎲</span><h2>Không biết uống gì?</h2></div>
                <small>May mắn</small>
              </header>
              <p>Lưỡng lự quá lâu? Để vận may thức uống quyết định điểm đến tiếp theo cho bạn trong một cái chạm!</p>
              <div className={`food-slot ${randomizing ? 'spinning' : ''}`} aria-live="polite">
                {displayedLuckyDrink?.image ? (
                  <img
                    key={displayedLuckyDrink.id || displayedLuckyDrink._id}
                    src={displayedLuckyDrink.image}
                    alt={displayedLuckyDrink.storeName || displayedLuckyDrink.name}
                  />
                ) : (
                  <div className="food-slot-placeholder"><Utensils size={30} /></div>
                )}
                <div className="food-slot-overlay" />
                <strong>{displayedLuckyDrink?.storeName || displayedLuckyDrink?.name || 'Đang tải danh sách quán…'}</strong>
                {displayedLuckyDrink?.distance && <small><MapPin size={12} /> {displayedLuckyDrink.distance}</small>}
              </div>
              <button type="button" disabled={randomizing} onClick={spinWheel}>
                <Dices size={20} /> {randomizing ? 'Đang chọn quán…' : 'Chọn ngẫu nhiên cho tôi'}
              </button>
              <footer>
                <span>Đã quay gần đây:</span>
                <div>
                  {history.length ? (
                    history.map((item) => <small key={item}>{item}</small>)
                  ) : (
                    <small>Chưa có lượt quay</small>
                  )}
                </div>
              </footer>
            </article>

            <article className="food-nutrition-tip">
              <header><Leaf size={20} /><strong>Mục tiêu uống nước</strong></header>
              <p>Bổ sung đủ nước mỗi ngày giúp tinh thần tỉnh táo và thanh lọc cơ thể. Đừng quên nhấp thêm một ngụm nước nhé!</p>
              <footer>
                <span>Đã nạp hôm nay</span>
                <strong>{waterMl} / 2000 ml 💧</strong>
              </footer>
            </article>
          </aside>
        </section>

        <section className="drinks-nearby drinks-enter drinks-delay-3">
          <header>
            <div>
              <span>Khám phá quanh bạn</span>
              <h2>Quán & thức uống gần bạn {selectedRadiusLimit !== 'all' ? `(bán kính < ${selectedRadiusLimit}km)` : ''}</h2>
              <p>
                {loadingDrinks
                  ? 'Đang tải danh sách quán…'
                  : `Tìm thấy ${filteredDrinks.length} quán nước & cafe phù hợp • Đã lưu vào database`}
              </p>
            </div>
            <label>
              Sắp xếp theo{' '}
              <span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="distance">Gần nhất</option>
                  <option value="price">Giá thấp nhất</option>
                </select>
                <ChevronDown size={15} />
              </span>
            </label>
          </header>

          {displayedDrinks.length ? (
            <>
              <div className="drinks-grid">
                {displayedDrinks.map((drink) => (
                  <DrinkCard
                    key={drink.id || drink._id}
                    drink={drink}
                    saved={saved.has(drink.id)}
                    onSave={toggleSaved}
                    onOpenDetail={setSelectedDrink}
                  />
                ))}
              </div>

              {nearbyPreview.length > visibleCount && !showAllDrinks && (
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
                    onClick={() => setVisibleCount((prev) => prev + 16)}
                  >
                    Xem thêm (+{Math.min(16, nearbyPreview.length - visibleCount)} quán) <ChevronRight size={16} />
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
                    onClick={() => setShowAllDrinks(true)}
                  >
                    Xem tất cả ({nearbyPreview.length} quán)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="drinks-empty">
              <SearchX size={34} />
              <strong>{loadingDrinks ? 'Đang tìm quán nước gần bạn…' : 'Chưa có thức uống phù hợp'}</strong>
              <p>Hãy bỏ bớt bộ lọc hoặc chọn danh mục khác để xem thêm quán.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedRadiusLimit('all');
                  setSearchTerm('');
                  setQuickFilters({ sugar: false, price: false, open: false, work: false });
                }}
              >
                Xem tất cả thức uống
              </button>
            </div>
          )}
        </section>

        <DrinkRecipes recipes={drinkRecipes} />
      </div>

      {/* Drink Drawer Detail Modal */}
      {selectedDrink && (
        <div
          className="food-drawer-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedDrink(null)}
        >
          <section
            className="food-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drink-drawer-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>Thông tin địa điểm thức uống</span>
                <h2 id="drink-drawer-title">{selectedDrink.name}</h2>
                <small style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>{selectedDrink.storeName}</small>
              </div>
              <button type="button" onClick={() => setSelectedDrink(null)} aria-label="Đóng">
                <X size={20} />
              </button>
            </header>

            <div className="food-drawer-metrics">
              <span><Star size={17} /> {selectedDrink.rating ?? '4.8★'}</span>
              <i />
              <span><WalletCards size={17} /> {selectedDrink.priceRange || '25.000 – 45.000đ'}</span>
              <i />
              <span><Navigation size={17} /> {selectedDrink.distance || 'Gần bạn'}</span>
            </div>

            <div className="food-drawer-details">
              {selectedDrink.address && (
                <p>
                  <MapPin size={16} />
                  <span><small>Địa chỉ</small>{selectedDrink.address}</span>
                </p>
              )}
              {selectedDrink.openHours && (
                <p>
                  <Clock3 size={16} />
                  <span><small>Giờ mở cửa</small>{selectedDrink.openHours}</span>
                </p>
              )}
              {selectedDrink.phone && (
                <a href={`tel:${selectedDrink.phone}`}>
                  <Phone size={16} />
                  <span><small>Điện thoại</small>{selectedDrink.phone}</span>
                </a>
              )}
              {selectedDrink.website && (
                <a href={selectedDrink.website} target="_blank" rel="noreferrer">
                  <Globe2 size={16} />
                  <span><small>Website</small>{selectedDrink.website}</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>

            <div className="food-drawer-map">
              <small>Bản đồ chỉ dẫn</small>
              {mapEmbedUrl(selectedDrink) ? (
                <iframe
                  title={`Bản đồ ${selectedDrink.storeName}`}
                  src={mapEmbedUrl(selectedDrink)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div><MapPin size={28} /><span>Chưa có tọa độ bản đồ</span></div>
              )}
            </div>

            <div className="food-drawer-actions">
              <a
                href={directionsUrl(selectedDrink)}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px',
                  borderRadius: '99px',
                  padding: '12px 18px',
                  fontSize: '13px',
                  fontWeight: 800,
                  background: '#3525cd',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                <Navigation size={17} /> Dẫn đường Google Maps
              </a>
              <button
                type="button"
                onClick={() => setSelectedDrink(null)}
                style={{
                  borderRadius: '99px',
                  padding: '12px 20px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: '#e5eeff',
                  color: '#5f6474',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Đóng
              </button>
            </div>
          </section>
        </div>
      )}

      {notice && <div className="food-toast show" role="status"><Sparkles size={18} /> {notice}</div>}
    </div>
  );
}
