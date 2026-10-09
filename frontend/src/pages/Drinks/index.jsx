import { useEffect, useMemo, useRef, useState } from 'react';
import { BriefcaseBusiness, ChevronDown, CloudSun, Leaf, MapPin, SearchX, WalletCards } from 'lucide-react';
import DrinkCard from '../../components/drink/DrinkCard';
import DrinkRecipes from '../../components/drink/DrinkRecipes';
import DrinkWheel from '../../components/drink/DrinkWheel';
import FeaturedDrink from '../../components/drink/FeaturedDrink';
import { drinkCategories, drinkRecipes, mockDrinks } from '../../data/mockDrinks';
import { weatherService } from '../../services/weatherService';

const wheelSuggestions = [
  '🧋 Trà sữa Oolong trân châu',
  '☕ Cà phê muối Cố Đô',
  '🍊 Cam ép tươi mật ong',
  '🍵 Matcha sữa hạnh nhân',
  '🍓 Trà dâu tằm thanh mát',
];

const initialSaved = () => {
  try { return new Set(JSON.parse(localStorage.getItem('todayly_saved_drinks') || '[]')); }
  catch { return new Set(); }
};

const initialWater = () => {
  const stored = Number(localStorage.getItem('todayly_water_ml'));
  return Number.isFinite(stored) && stored >= 0 ? Math.min(2000, stored) : 1200;
};

const distanceInKm = (value = '') => value.includes('km')
  ? Number.parseFloat(value.replace(',', '.'))
  : Number.parseFloat(value) / 1000;

export default function Drinks() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [quickFilters, setQuickFilters] = useState({ sugar: false, price: false, distance: false, open: false, work: false });
  const [sortBy, setSortBy] = useState('rating');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [saved, setSaved] = useState(initialSaved);
  const [waterMl, setWaterMl] = useState(initialWater);
  const [weather, setWeather] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [wheelResult, setWheelResult] = useState('Sẵn sàng khám phá thức uống hợp mood?');
  const [spinning, setSpinning] = useState(false);
  const [notice, setNotice] = useState('');
  const spinTimerRef = useRef(null);
  const noticeTimerRef = useRef(null);

  useEffect(() => {
    let active = true;
    weatherService.getCurrentForDevice().then((data) => {
      if (active) setWeather(data);
    }).catch(() => {
      if (active) setWeather(null);
    });
    return () => {
      active = false;
      window.clearTimeout(spinTimerRef.current);
      window.clearTimeout(noticeTimerRef.current);
    };
  }, []);

  const filteredDrinks = useMemo(() => {
    const result = mockDrinks.filter((drink) => {
      if (activeCategory !== 'all' && drink.drinkType !== activeCategory) return false;
      if (quickFilters.sugar && !/không đường|ít ngọt|30%/i.test(drink.sugar)) return false;
      if (quickFilters.price && Number(drink.priceRange.replace(/\D/g, '').slice(0, 2)) > 45) return false;
      if (quickFilters.distance && distanceInKm(drink.distance) > 1.5) return false;
      if (quickFilters.open && !drink.isOpen) return false;
      if (quickFilters.work && !drink.workFriendly) return false;
      return true;
    });
    return [...result].sort((a, b) => {
      if (sortBy === 'distance') return distanceInKm(a.distance) - distanceInKm(b.distance);
      if (sortBy === 'price') return Number(a.priceRange.replace(/\D/g, '').slice(0, 2)) - Number(b.priceRange.replace(/\D/g, '').slice(0, 2));
      return b.rating - a.rating;
    });
  }, [activeCategory, quickFilters, sortBy]);

  const featuredPool = filteredDrinks.length ? filteredDrinks : mockDrinks;
  const featured = featuredPool[featuredIndex % featuredPool.length];

  const toggleSaved = (id) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem('todayly_saved_drinks', JSON.stringify([...next]));
      return next;
    });
  };

  const addWater = (amount) => {
    setWaterMl((current) => {
      const next = Math.min(2000, current + amount);
      localStorage.setItem('todayly_water_ml', String(next));
      return next;
    });
  };

  const spinWheel = () => {
    if (spinning) return;
    const index = Math.floor(Math.random() * wheelSuggestions.length);
    setSpinning(true);
    setRotation((current) => current + 1440 + index * 72 + Math.floor(Math.random() * 40));
    window.clearTimeout(spinTimerRef.current);
    spinTimerRef.current = window.setTimeout(() => {
      setWheelResult(wheelSuggestions[index]);
      setSpinning(false);
    }, 1050);
  };

  const chooseDrink = () => {
    setNotice(`Đã chọn “${featured.name}” cho hôm nay.`);
    window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(''), 2600);
  };

  const weatherTemperature = weather?.temperature ?? 29;
  const weatherCondition = weather?.condition || 'Nắng nhẹ';

  return (
    <div className="drinks-page">
      <div className="drinks-shell">
        <section className="drinks-intro drinks-enter">
          <div>
            <span className="drinks-eyebrow">☕ Trụ cột Thức uống · Giải nhiệt & Nạp năng lượng</span>
            <h1>Hôm nay uống gì? <span>🧋</span><span>☕</span></h1>
            <p>Bạn đang thèm vị ngọt béo của trà sữa, tỉnh táo với cà phê đậm đà hay thanh lọc cùng nước ép tươi mát? Hãy để Todayly gợi ý theo cảm xúc và nhịp điệu hôm nay.</p>
          </div>
          <article className="drinks-weather">
            <span><CloudSun size={29} /></span>
            <div><strong>{weatherTemperature}°C · {weatherCondition}</strong><small>Khí hậu lý tưởng</small><p>Gợi ý: bổ sung đủ nước và chọn đồ uống thanh nhiệt</p></div>
          </article>
        </section>

        <section className="drinks-filters drinks-enter drinks-delay-1">
          <div className="drinks-category-list">
            {drinkCategories.map((category) => (
              <button type="button" key={category.id} className={activeCategory === category.id ? 'active' : ''} onClick={() => { setActiveCategory(category.id); setFeaturedIndex(0); }}>
                <span>{category.icon}</span>{category.label}{category.id === 'all' && ` (${mockDrinks.length})`}
              </button>
            ))}
          </div>
          <div className="drinks-quick-filters">
            <button type="button" className={quickFilters.sugar ? 'active' : ''} onClick={() => setQuickFilters((value) => ({ ...value, sugar: !value.sugar }))}><Leaf size={15} /> Ít đường (0% – 30%)</button>
            <button type="button" className={quickFilters.price ? 'active' : ''} onClick={() => setQuickFilters((value) => ({ ...value, price: !value.price }))}><WalletCards size={15} /> Dưới 45.000đ</button>
            <button type="button" className={quickFilters.distance ? 'active' : ''} onClick={() => setQuickFilters((value) => ({ ...value, distance: !value.distance }))}><MapPin size={15} /> Khoảng cách &lt; 1,5km</button>
            <button type="button" className={quickFilters.open ? 'active' : ''} onClick={() => setQuickFilters((value) => ({ ...value, open: !value.open }))}><i /> Mở cửa đón khách</button>
            <button type="button" className={quickFilters.work ? 'active' : ''} onClick={() => setQuickFilters((value) => ({ ...value, work: !value.work }))}><BriefcaseBusiness size={15} /> Có chỗ ngồi làm việc</button>
          </div>
        </section>

        <section className="drinks-discovery drinks-enter drinks-delay-2">
          <FeaturedDrink drink={featured} saved={saved.has(featured?.id)} onSave={toggleSaved} onReroll={() => setFeaturedIndex((index) => index + 1)} onChoose={chooseDrink} />
          <DrinkWheel spinning={spinning} rotation={rotation} result={wheelResult} onSpin={spinWheel} onMood={setWheelResult} waterMl={waterMl} targetMl={2000} onAddWater={addWater} />
        </section>

        <section className="drinks-nearby drinks-enter drinks-delay-3">
          <header>
            <div><span>Khám phá quanh bạn</span><h2>Quán & thức uống được yêu thích</h2><p>{filteredDrinks.length} gợi ý phù hợp với lựa chọn của bạn</p></div>
            <label>Sắp xếp theo <span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="rating">Đánh giá cao nhất</option><option value="distance">Gần nhất</option><option value="price">Giá thấp nhất</option></select><ChevronDown size={15} /></span></label>
          </header>
          {filteredDrinks.length ? <div className="drinks-grid">{filteredDrinks.map((drink) => <DrinkCard key={drink.id} drink={drink} saved={saved.has(drink.id)} onSave={toggleSaved} />)}</div> : <div className="drinks-empty"><SearchX size={34} /><strong>Chưa có thức uống phù hợp</strong><p>Hãy bỏ bớt bộ lọc hoặc chọn danh mục khác.</p><button type="button" onClick={() => { setActiveCategory('all'); setQuickFilters({ sugar: false, price: false, distance: false, open: false, work: false }); }}>Xem tất cả thức uống</button></div>}
        </section>

        <DrinkRecipes recipes={drinkRecipes} />
      </div>
      {notice && <div className="drinks-toast">{notice}</div>}
    </div>
  );
}
