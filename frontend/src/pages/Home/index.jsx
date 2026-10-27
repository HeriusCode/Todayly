import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Check, CheckCircle2, ChevronRight, Clock3, CloudSun, Droplets, Heart, ListTodo, MapPin, Navigation, Shirt, Smile, Sparkles, Star, Trash2, Utensils, Wind } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/common/Modal';
import TaskForm from '../../components/task/TaskForm';
import { useAuth } from '../../context/AuthContext';
import { foodService } from '../../services/foodService';
import { outfitService } from '../../services/outfitService';
import { placeService } from '../../services/placeService';
import { taskService } from '../../services/taskService';
import { weatherService } from '../../services/weatherService';
import { formatVietnameseDate, toDateKey } from '../../utils/dates';

const FOOD_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSVL1oxnkisdSn-4ugM2unO7de_AlEUuYoD888osAFfrLwgjNOP4mohiwvsE7Uz-_ieIDIagV4vCkFm2pkaY72SOf3nGLLr4VLYbhtsVGxWH_9jcf18br9w0GMTFGQXobfSyZy1xm-_qt4iCzYq-93FLoD77Z4J4EAertqQ78lHGNIOVFNMSibrPqP79F-uo2Cr2uegdCMEUbt_ZEPu8i7acmCzCotYRbevmNae2BcIYjcQylYjvc8';
const PLACE_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw4GY1i-xONjgDPAL9H4nUjNqNUSF8bglzWtb1Tq5Psfjq8b7Jtoor-dpenhYE6Xb1xOK9cxKvzLGgyLEQbMFyyupdwsz58RXAIPdFAZZ4XtalP6gz6k5kbDN-s_l9q7j63XkZ2ehxD7ECmm0IgiH8OwMiTUixNhnJD5hc8-nu8lF08_IiZAUUvG4v1B_qZoVeNOpZtmnYP9MTH9XFWuBM1MDXpE1ioCJ2e5L_9Se8cwpN6kKdSvd6';
const moods = [['energy', '✨', 'Vui vẻ & Năng động'], ['peace', '🌿', 'Bình yên, tĩnh lặng'], ['focus', '⚡', 'Tập trung cao độ'], ['chill', '☕', 'Thảnh thơi, chill']];
const brokenText = /Ã|Ä|Æ|áº|â€|ðŸ/;
const safeText = (value, fallback) => typeof value === 'string' && value && !brokenText.test(value) ? value : fallback;
const getDayPeriod = () => {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bangkok', hour: '2-digit', hour12: false }).format(new Date()));
  if (hour >= 5 && hour < 11) return { greeting: 'Chào buổi sáng', mood: 'sáng nay' };
  if (hour >= 11 && hour < 13) return { greeting: 'Chào buổi trưa', mood: 'trưa nay' };
  if (hour >= 13 && hour < 18) return { greeting: 'Chào buổi chiều', mood: 'chiều nay' };
  if (hour >= 18 && hour < 22) return { greeting: 'Chào buổi tối', mood: 'tối nay' };
  return { greeting: 'Chào bạn', mood: 'lúc này' };
};

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [today] = useState(() => toDateKey());
  const [dateLabel] = useState(() => formatVietnameseDate(new Date()));
  const [dayPeriod] = useState(getDayPeriod);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [food, setFood] = useState(null);
  const [place, setPlace] = useState(null);
  const [outfit, setOutfit] = useState(null);
  const [mood, setMood] = useState(() => localStorage.getItem('todayly_mood') || 'energy');
  const [modalOpen, setModalOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const loadTasks = useCallback(async () => {
    if (!isAuthenticated) { setTasks([]); return; }
    try { setTasks(await taskService.getAll({ date: today })); }
    catch (error) { setMessage(error.response?.data?.message || 'Không tải được lịch trình hôm nay.'); }
  }, [isAuthenticated, today]);

  const loadWeather = useCallback(async () => {
    try { setWeatherError(''); setWeather(await weatherService.getCurrentForDevice()); }
    catch (error) { setWeatherError(error.code === 1 ? 'Hãy cho phép truy cập vị trí để xem thời tiết.' : 'Không lấy được thời tiết hiện tại.'); }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);
  useEffect(() => { loadWeather(); }, [loadWeather]);
  useEffect(() => { Promise.all([foodService.getAll().catch(() => []), placeService.getAll(), outfitService.getAll()]).then(([foods, places, outfits]) => { setFood(foods?.[1] || foods?.[0] || null); setPlace(places?.[1] || places?.[0] || null); setOutfit(outfits?.[0] || null); }); }, []);

  const openPlanner = () => isAuthenticated ? setModalOpen(true) : navigate('/login');
  const saveTask = async (values) => { setBusy(true); setMessage(''); try { await taskService.create(values); await loadTasks(); setModalOpen(false); } catch (error) { setMessage(error.response?.data?.message || 'Không thể lưu công việc.'); } finally { setBusy(false); } };
  const updateTask = async (task, action) => { try { await action(task.id || task._id); await loadTasks(); } catch (error) { setMessage(error.response?.data?.message || 'Không thể cập nhật công việc.'); } };
  const completed = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const nextTask = tasks.find((task) => !task.completed);
  const foodName = safeText(food?.name, 'Mì Quảng Ếch Bà Mua');
  const placeName = safeText(place?.name, 'Bãi biển Mỹ Khê');

  return <div className="home-page"><div className="home-shell">
    <section className="home-hero home-enter"><span className="home-orb home-orb-primary" /><span className="home-orb home-orb-orange" /><div className="home-welcome"><span className="home-ready"><CheckCircle2 size={18} /> Đã sẵn sàng gợi ý ngày mới</span><div><h1>{dayPeriod.greeting}, {user?.name || 'bạn'}! 👋</h1><p>Bạn muốn hôm nay của mình như thế nào?</p></div><div className="home-actions"><button type="button" onClick={openPlanner}><Sparkles size={20} /> Lập kế hoạch hôm nay <ArrowRight size={18} /></button><span><i /> {tasks.length ? `${Math.max(tasks.length - completed, 0)}/${tasks.length} hoạt động đang chờ` : 'Sẵn sàng cho một ngày mới'}</span></div></div><article className="home-weather"><header><div><span className="home-date">{dateLabel}</span><strong><MapPin size={18} /> {weather?.location || 'Vị trí hiện tại'}</strong></div><span className="home-sun"><CloudSun size={29} /></span></header>{weather ? <><div className="home-temperature"><strong>{weather.temperature}°C</strong><span>{safeText(weather.condition, 'Thời tiết hiện tại')}</span></div><div className="home-weather-stats"><div><Droplets size={21} /><span>Độ ẩm<strong>{safeText(weather.humidity, 'Đang cập nhật')}</strong></span></div><div><Wind size={21} /><span>Không khí<strong>{safeText(weather.airQuality, 'Đang cập nhật')}</strong></span></div></div></> : <div className="home-weather-loading"><span>{weatherError || 'Đang tải thời tiết theo vị trí…'}</span>{weatherError && <button onClick={loadWeather}>Thử lại</button>}</div>}</article></section>

    <section className="home-mood home-enter home-delay-1"><div className="home-mood-title"><span><Smile size={22} /></span><div><strong>Tâm trạng {dayPeriod.mood} của bạn?</strong><p>Chọn để Todayly tối ưu hóa nhịp điệu sinh hoạt</p></div></div><div className="home-mood-options">{moods.map(([id, emoji, label]) => <button key={id} className={mood === id ? 'active' : ''} onClick={() => { setMood(id); localStorage.setItem('todayly_mood', id); }}><span>{emoji}</span>{label}</button>)}</div></section>
    {message && <div className="home-message">{message}</div>}

    <section className="home-feature-grid">
      <article className="home-feature home-task-card home-enter home-delay-2"><header><span><ListTodo size={17} /> Làm gì hôm nay?</span><small>Ưu tiên cao</small></header><h2>Công việc & Kế hoạch</h2><p>Quản lý công việc trọng tâm và hoàn thành mục tiêu ngày mới nhẹ nhàng.</p><div className="home-progress"><span>Tiến độ hôm nay <strong>{completed}/{tasks.length} việc ({progress}%)</strong></span><i><b style={{ width: `${progress}%` }} /></i></div>{nextTask ? <div className="home-next"><span><Clock3 size={19} /></span><div><small>Sắp diễn ra lúc {nextTask.startTime || '09:00'}</small><strong>{nextTask.title}</strong></div><ChevronRight size={19} /></div> : <div className="home-card-empty">Chưa có công việc nào trong hôm nay.</div>}<Link to="/tasks">Xem danh sách công việc <ArrowRight size={17} /></Link></article>
      <article className="home-feature home-food-card home-enter home-delay-3"><header><span><Utensils size={17} /> Ăn gì hôm nay?</span><small>Gợi ý bữa trưa</small></header><h2>Món ngon & Ẩm thực</h2><p>Khám phá hương vị phù hợp khẩu vị, thời tiết và năng lượng.</p><div className="home-recommend"><img src={food?.image || FOOD_IMAGE} alt={foodName} /><div><span><Star size={15} fill="currentColor" /> {food?.rating || 4.7}</span><strong>{foodName}</strong><p>{safeText(food?.category, 'Đặc sản Đà Nẵng')} · Bữa trưa lý tưởng</p><b>{safeText(food?.priceRange, '40.000 – 60.000đ')}</b></div><Heart size={19} /></div><Link to="/food">Khám phá món ngon <ArrowRight size={17} /></Link></article>
      <article className="home-feature home-place-card home-enter home-delay-4"><header><span><Navigation size={17} /> Đi đâu hôm nay?</span><small>Gần bạn</small></header><h2>Điểm đến & Trải nghiệm</h2><p>Chọn không gian thư giãn, vận động và nạp lại năng lượng.</p><div className="home-recommend"><img src={place?.image || PLACE_IMAGE} alt={placeName} /><div><span><Star size={15} fill="currentColor" /> {place?.rating || 4.9}</span><strong>{placeName}</strong><p>{safeText(place?.category, 'Dạo mát & Thiên nhiên')}</p><b>{safeText(place?.distance, 'Cách 2.4 km')}</b></div><Heart size={19} /></div><Link to="/places">Khám phá địa điểm <ArrowRight size={17} /></Link></article>
      <article className="home-feature home-outfit-card home-enter home-delay-5"><header><span><Shirt size={17} /> Mặc gì hôm nay?</span><small>Theo thời tiết</small></header><h2>Trang phục & Phong cách</h2><p>Phối đồ thoải mái theo nhiệt độ và lịch trình trong ngày.</p><div className="home-outfit"><strong>{safeText(outfit?.styleName, 'Smart-Casual thoải mái')}</strong><span>{(outfit?.colorPalette || ['#ffffff', '#e5eeff', '#d3e4fe', '#fd761a']).map((color) => <i key={color} style={{ background: color }} />)}</span><div>{(outfit?.items || [{ name: 'Áo thun cotton' }, { name: 'Quần linen' }, { name: 'Sneaker trắng' }, { name: 'Kính chống UV' }]).slice(0, 4).map((item, index) => <small key={`${item.name}-${index}`}>✓ {safeText(item.name, ['Áo thun cotton', 'Quần linen', 'Sneaker trắng', 'Kính chống UV'][index])}</small>)}</div></div><Link to="/outfit">Xem gợi ý trang phục <ArrowRight size={17} /></Link></article>
    </section>

    <section className="home-summary home-enter"><div><span><Sparkles size={23} /></span><div><strong>Tóm tắt mục tiêu ngày</strong><p>Lịch trình cân đối giữa làm việc và nạp năng lượng</p></div></div><dl><div><dt>Hoạt động</dt><dd>{tasks.length} lịch</dd></div><div><dt>Đã hoàn thành</dt><dd>{completed} việc</dd></div><div><dt>Vận động mục tiêu</dt><dd>6.200 bước</dd></div></dl></section>

    <section className="home-timeline home-enter"><header><div><h2>Lịch trình hôm nay <span>{tasks.length} hoạt động</span></h2><p>Dòng thời gian được đồng bộ trực tiếp từ dữ liệu tài khoản.</p></div><div className="home-timeline-actions"><div><button className="active">Hôm nay</button><Link to="/planner">Ngày mai</Link><Link to="/planner">Lịch tuần</Link></div><button onClick={openPlanner}>+ Thêm hoạt động</button></div></header>{tasks.length ? <div className="home-timeline-list">{tasks.map((task) => <article key={task.id || task._id} className={task.completed ? 'done' : ''}><i /><button onClick={() => updateTask(task, (id) => taskService.toggleComplete(id, !task.completed))}><Check size={15} /></button><div><span>{task.startTime || '09:00'} – {task.endTime || '10:00'} <small>{safeText(task.category, 'Công việc')}</small></span><h3>{task.title}</h3><p>{task.location || task.note || 'Chưa có ghi chú'}</p></div><button onClick={() => updateTask(task, (id) => taskService.delete(id))} aria-label="Xóa công việc"><Trash2 size={17} /></button></article>)}</div> : <div className="home-timeline-empty"><Clock3 size={28} /><strong>Chưa có lịch trình hôm nay</strong><p>Thêm hoạt động đầu tiên để bắt đầu ngày mới.</p><button onClick={openPlanner}>Thêm hoạt động</button></div>}</section>
  </div><Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Thêm hoạt động mới"><TaskForm defaultDate={today} busy={busy} onCancel={() => setModalOpen(false)} onSubmit={saveTask} /></Modal></div>;
}
