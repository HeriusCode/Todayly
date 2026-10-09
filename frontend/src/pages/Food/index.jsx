import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CalendarPlus,
  CheckCircle2,
  ChevronDown,
  CloudSun,
  Dices,
  Leaf,
  MapPin,
  Navigation,
  SearchX,
  Star,
  Utensils,
  WalletCards,
  X,
} from 'lucide-react';
import { foodService } from '../../services/foodService';
import { scheduleService } from '../../services/scheduleService';
import { weatherService } from '../../services/weatherService';
import FoodCard from '../../components/food/FoodCard';
import FeaturedFood from '../../components/food/FeaturedFood';

const mealTabs = [
  ['all', 'Tất cả'],
  ['breakfast', 'Ăn sáng 🍳'],
  ['lunch', 'Ăn trưa 🍜'],
  ['dinner', 'Ăn tối 🍲'],
  ['snack', 'Ăn vặt 🧋'],
  ['drink', 'Đồ uống ☕'],
];

const luckyFoods = [
  ['🍲', 'Bún bò Huế cay nồng'],
  ['🥖', 'Bánh mì heo quay giòn'],
  ['🍛', 'Cơm tấm ba rọi trứng'],
  ['🍜', 'Hủ tiếu Nam Vang khô'],
  ['🥢', 'Bún đậu mắm tôm phố cổ'],
  ['🥗', 'Gỏi cuốn tôm thịt'],
  ['🍳', 'Bò né ốp la xíu mại'],
];

const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4hbiYrFE-ypProLzP8uM92ZuTW0PeOkPBkby-YrdkXaM4PJDD8BeQ39qim6seig06fW5jvR6pF16CVZuOwiOjN94feeVY1BWXldXGo6kWnhAqQQkPYq9P5f27GwE2GLvQEkgrULU-INXYskGZkIFb0UIg7bgXY3BGcK8M2gXBljfvz7-AiXI2CrUWoNK0T6SwfvaPJPXZSgQM7J5nQKTydVc9jxDL7yIQuKPdM_T75qikVewdkGjo';

const idOf = (food) => food?.id || food?._id || food?.name;
const localDate = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
};

export default function Food() {
  const [foods, setFoods] = useState([]);
  const [activeMeal, setActiveMeal] = useState('all');
  const [criteria, setCriteria] = useState({ distance: false, price: false, rating: false, open: true });
  const [sortBy, setSortBy] = useState('distance');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [weather, setWeather] = useState(null);
  const [savedIds, setSavedIds] = useState(() => new Set());
  const [randomizing, setRandomizing] = useState(false);
  const [luckyChoice, setLuckyChoice] = useState(['🎯', 'Sẵn sàng quay?']);
  const [history, setHistory] = useState(['Cơm tấm sườn bì', 'Mì Quảng ếch', 'Bánh mì chảo']);
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
    foodService.getAll().then((data) => {
      if (active) setFoods(Array.isArray(data) ? data : []);
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
      if (activeMeal !== 'all' && food.mealType !== activeMeal) return false;
      if (criteria.distance && Number(food.distanceNum ?? 99) > 2) return false;
      if (criteria.price && (Number(food.minPrice || 0) < 30000 || Number(food.minPrice || 0) > 80000)) return false;
      if (criteria.rating && Number(food.rating || 0) < 4.5) return false;
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
  const nearbyFoods = filteredFoods.filter((food) => idOf(food) !== idOf(featured)).slice(0, 4);

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
    if (randomizing) return;
    setRandomizing(true);
    let count = 0;
    const interval = window.setInterval(() => {
      setLuckyChoice(luckyFoods[Math.floor(Math.random() * luckyFoods.length)]);
      count += 1;
      if (count < 12) return;
      window.clearInterval(interval);
      const chosen = luckyFoods[Math.floor(Math.random() * luckyFoods.length)];
      setLuckyChoice(chosen);
      setHistory((current) => [chosen[1], ...current.filter((item) => item !== chosen[1])].slice(0, 4));
      setRandomizing(false);
      showToast(`Gợi ý cho bạn: ${chosen[1]} ${chosen[0]}`);
    }, 85);
  };

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
              <button type="button" key={value} className={activeMeal === value ? 'active' : ''} onClick={() => { setActiveMeal(value); setFeaturedIndex(0); }}>{label}</button>
            ))}
          </div>
          <div className="food-criteria">
            <button type="button" className={criteria.distance ? 'active' : ''} onClick={() => toggleCriterion('distance')}><Navigation size={15} /> Khoảng cách (&lt; 2km)</button>
            <button type="button" className={criteria.price ? 'active' : ''} onClick={() => toggleCriterion('price')}><WalletCards size={15} /> Khoảng giá (30k - 80k)</button>
            <button type="button" className={criteria.rating ? 'active' : ''} onClick={() => toggleCriterion('rating')}><Star size={15} /> Đánh giá 4.5+ ⭐</button>
            <button type="button" className={`open ${criteria.open ? 'active' : ''}`} onClick={() => toggleCriterion('open')}><i /> Đang mở cửa 🟢</button>
          </div>
        </section>

        <section className="food-discovery food-rise">
          <FeaturedFood food={featured} weather={weather} onChoose={addToPlanner} onReroll={rerollFeatured} />

          <aside className="food-companion">
            <article className="food-randomizer">
              <header><div><span>🎲</span><h2>Không biết ăn gì?</h2></div><small>May mắn</small></header>
              <p>Lưỡng lự quá lâu? Để vận may ẩm thực quyết định bữa ăn tiếp theo cho bạn trong một cái chạm!</p>
              <div className={`food-slot ${randomizing ? 'spinning' : ''}`}><span>{luckyChoice[0]}</span><strong>{luckyChoice[1]}</strong></div>
              <button type="button" disabled={randomizing} onClick={spinWheel}><Dices size={20} /> {randomizing ? 'Đang chọn món…' : 'Chọn ngẫu nhiên cho tôi'}</button>
              <footer><span>Đã quay gần đây:</span><div>{history.map((item) => <small key={item}>{item}</small>)}</div></footer>
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
            <div><h2>Quán gần bạn</h2><span>{filteredFoods.length} địa điểm</span></div>
            <label>Sắp xếp theo:<span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="distance">Gần nhất</option><option value="rating">Đánh giá cao</option><option value="price">Giá thấp nhất</option></select><ChevronDown size={15} /></span></label>
          </header>

          {nearbyFoods.length ? (
            <div className="food-nearby-grid">
              {nearbyFoods.map((food) => <FoodCard key={idOf(food)} food={food} saved={savedIds.has(idOf(food))} onSaveFavorite={toggleSaved} onOpenDetail={setSelectedFood} />)}
            </div>
          ) : (
            <div className="food-empty"><SearchX size={34} /><strong>Không tìm thấy món ăn phù hợp</strong><p>Hãy bỏ bớt tiêu chí hoặc chọn một bữa ăn khác.</p><button type="button" onClick={() => { setActiveMeal('all'); setCriteria({ distance: false, price: false, rating: false, open: true }); }}>Xem tất cả món</button></div>
          )}
        </section>
      </div>

      {selectedFood && (
        <div className="food-drawer-backdrop" role="presentation" onMouseDown={() => setSelectedFood(null)}>
          <section className="food-drawer" role="dialog" aria-modal="true" aria-labelledby="food-drawer-title" onMouseDown={(event) => event.stopPropagation()}>
            <header><div><span>Thông tin địa điểm</span><h2 id="food-drawer-title">{selectedFood.name}</h2></div><button type="button" onClick={() => setSelectedFood(null)} aria-label="Đóng"><X size={20} /></button></header>
            <div className="food-drawer-metrics"><span><Star size={17} /> {selectedFood.rating}</span><i /><span><WalletCards size={17} /> {selectedFood.priceLabel || selectedFood.priceRange}</span><i /><span><Navigation size={17} /> {selectedFood.distance}</span></div>
            <div className="food-drawer-map"><small>Bản đồ chỉ dẫn</small><div style={{ backgroundImage: `url(${MAP_IMAGE})` }}><MapPin size={28} /></div></div>
            <div className="food-drawer-actions"><button type="button" onClick={() => addToPlanner(selectedFood)}><CalendarPlus size={18} /> Thêm vào lịch trình hôm nay</button><button type="button" onClick={() => setSelectedFood(null)}>Đóng</button></div>
          </section>
        </div>
      )}

      <div className={`food-toast ${toast ? 'show' : ''}`} role="status"><CheckCircle2 size={20} /> {toast}</div>
    </div>
  );
}
