import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { taskService } from '../../services/taskService';
import { Activity, ArrowRight, BatteryCharging, BookOpen, CalendarDays, Camera, Check, CheckCircle2, ChevronLeft, ChevronRight, CircleDollarSign, CloudSun, Coffee, Droplets, Edit3, Footprints, Heart, ImageDown, Lock, Plus, Share2, Sparkles, Timer, Utensils, WalletCards } from 'lucide-react';

const moods = [
  { id: 'great', emoji: '🌟', label: 'Tuyệt vời & Rực rỡ' },
  { id: 'peaceful', emoji: '🌸', label: 'Hài lòng & Bình yên' },
  { id: 'balanced', emoji: '🌿', label: 'Cân bằng & Tạm ổn' },
  { id: 'tired', emoji: '🥱', label: 'Hơi mệt mỏi' },
  { id: 'rest', emoji: '🌧️', label: 'Cần nghỉ ngơi' },
];
const expenses = [
  { icon: Utensils, name: 'Bún Chả Cá 109 Nguyễn Chí Thanh', note: 'Bữa sáng bổ dưỡng · 08:15', amount: 35000, type: 'Ăn uống', tone: 'orange' },
  { icon: Coffee, name: 'The Mây Café & Roastery', note: 'Cold brew cam sả · 09:30–12:00', amount: 85000, type: 'Công việc', tone: 'violet' },
  { icon: Utensils, name: 'Cơm Niêu Nhà Đỏ 2', note: 'Bữa trưa nhẹ nhàng · 12:45', amount: 60000, type: 'Ăn uống', tone: 'orange' },
  { icon: CloudSun, name: 'Trà Đào Cam Sả Bờ Biển', note: 'Dạo biển ngắm hoàng hôn · 17:30', amount: 35000, type: 'Giải khát', tone: 'green' },
];
const metrics = [
  { icon: Footprints, kicker: 'Vận động thể chất', value: '6.420', goal: '/ 5.600 bước', percent: 100, tag: '114%', tone: 'green', text: 'Dạo bộ 45 phút dọc bãi biển Mỹ Khê.' },
  { icon: Droplets, kicker: 'Cấp ẩm cơ thể', value: '2.200', goal: '/ 2.000 ml', percent: 100, tag: '110%', tone: 'blue', text: 'Đạt chuẩn cấp nước cho một ngày nhiều nắng.' },
  { icon: Timer, kicker: 'Tập trung Deep Work', value: '4h 15m', goal: '', percent: 85, tag: '5 Pomodoro', tone: 'violet', text: 'Hoàn thành công việc quan trọng trước 16:00.' },
  { icon: BookOpen, kicker: 'Thời gian tái tạo', value: '2h 45m', goal: '', percent: 90, tag: 'Thảnh thơi', tone: 'orange', text: 'Đọc sách và dành trọn buổi chiều ngắm biển.' },
];

function MetricCard({ item }) { const Icon = item.icon; return <article className={`summary-metric ${item.tone}`}><header><span><Icon size={21} /></span><b>{item.tag}</b></header><small>{item.kicker}</small><div><strong>{item.value}</strong><em>{item.goal}</em></div><div className="summary-progress"><i style={{ width: `${item.percent}%` }} /></div><p>{item.text}</p></article>; }

export default function Summary() {
  const { user } = useAuth();
  const [mood, setMood] = useState('peaceful'); const [locked, setLocked] = useState(false); const [noteOpen, setNoteOpen] = useState(false);
  const [tasks, setTasks] = useState([]); const [gratitudes, setGratitudes] = useState(['Hoàn thành sớm công việc quan trọng', 'Có thời gian gặp lại một người bạn thân', 'Hoàng hôn Đà Nẵng thật dịu dàng']);
  useEffect(() => { taskService.getAll().then(data => setTasks(Array.isArray(data) ? data : [])).catch(() => setTasks([])); }, []);
  const completed = tasks.filter(task => task.completed).length; const total = tasks.length; const ratio = total ? Math.round(completed / total * 100) : 83;
  const today = useMemo(() => new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date()), []);
  const spent = expenses.reduce((sum, item) => sum + item.amount, 0); const budget = 300000; const formatMoney = value => `${new Intl.NumberFormat('vi-VN').format(value)}₫`;
  const displayName = (user?.name || 'Mai Linh').split(' ').slice(-2).join(' ');

  return <div className="summary-page"><div className="summary-shell">
    <section className="summary-intro"><div><div className="summary-badges"><span><CalendarDays size={15} /> {today} · Đà Nẵng</span><span><CheckCircle2 size={15} /> Đã hoàn thành {total ? `${completed}/${total}` : '5/6'} hoạt động ({ratio}%)</span><span><CloudSun size={15} /> Hoàng hôn 17:45</span></div><h1>Tổng kết cuối ngày: Một ngày trọn vẹn của {displayName} ✨</h1><div className="summary-ai-note"><span><Sparkles size={18} /></span><div><small>LỜI NHẮN CHIÊM NGHIỆM TỪ AI</small><p>Hôm nay bạn đã làm việc thật chăm chỉ và vẫn dành thời gian chăm sóc bản thân. Hãy gác lại công việc, thả lỏng cơ thể và tận hưởng sự bình yên của buổi tối.</p></div></div></div><div className="summary-actions"><button type="button" onClick={() => setNoteOpen(!noteOpen)}><Edit3 size={17} /> Chỉnh sửa ghi chú</button><button type="button"><ImageDown size={17} /> Xuất ảnh Story</button><button type="button" className={locked ? 'locked' : 'primary'} onClick={() => setLocked(!locked)}><Lock size={17} /> {locked ? 'Đã khóa sổ ngày' : 'Lưu & Khóa sổ ngày'}</button></div></section>
    {noteOpen && <textarea className="summary-note-input" defaultValue="Hôm nay là một ngày cân bằng và nhiều niềm vui. Mình đã hoàn thành phần lớn mục tiêu đặt ra." />}

    <section className="summary-top-grid"><article className="summary-card summary-mood"><header><div><span><Heart size={19} /></span><div><h2>Thước đo cảm xúc hôm nay</h2><p>Bạn cảm nhận thế nào về nhịp sống của hôm nay?</p></div></div><small>Đã ghi nhận lúc 21:15</small></header><div className="summary-mood-list">{moods.map(item => <button type="button" className={mood === item.id ? 'active' : ''} onClick={() => setMood(item.id)} key={item.id}>{mood === item.id && <b>ĐÃ CHỌN</b>}<span>{item.emoji}</span><small>{item.label}</small></button>)}</div><div className="summary-tags"><small>Tags cảm xúc:</small><span>#ThảnhThơi</span><span>#HoànThànhDeadline</span><span>#BiểnChiềuMát</span><button type="button"><Plus size={13} /> Thêm tag</button></div></article>
      <article className="summary-card summary-energy"><header><span><BatteryCharging size={20} /></span><h2>Chỉ số năng lượng</h2><i /></header><div className="summary-energy-row"><span>Mức năng lượng hiện tại</span><b>85 / 100</b></div><div className="summary-energy-bar"><i /></div><p>Rất tốt! Bạn vẫn giữ được tinh thần sảng khoái vào buổi tối.</p><div className="summary-harmony"><div><small>HÀI HÒA CÔNG VIỆC – SỐNG</small><strong>9.2 <em>/ 10</em></strong><p>Cân đối tuyệt vời giữa làm việc và nghỉ ngơi</p></div><div className="summary-ring"><span>92%</span></div></div></article>
    </section>

    <section className="summary-money-grid"><article className="summary-card summary-expenses"><header><div><span><WalletCards size={21} /></span><div><h2>Chi tiêu thực tế vs. dự toán</h2><p>Đối chiếu thông minh theo từng điểm dừng trong ngày</p></div></div><button type="button"><Plus size={16} /> Thêm khoản chi</button></header><div className="summary-budget"><div><small>Dự toán ban đầu</small><strong>{formatMoney(budget)}</strong><span>Hạn mức linh hoạt trong ngày</span></div><div><small>Thực tế đã chi</small><strong>{formatMoney(spent)}</strong><span>{expenses.length} giao dịch phát sinh</span></div><div><small>Tiết kiệm được</small><strong>+{formatMoney(budget - spent)}</strong><span>Dưới ngân sách {Math.round((budget-spent)/budget*100)}% 🎉</span></div></div><div className="summary-expense-list">{expenses.map(item => { const Icon = item.icon; return <div className="summary-expense" key={item.name}><span className={item.tone}><Icon size={18} /></span><div><strong>{item.name}</strong><small>{item.note}</small></div><em>{item.type}</em><b>{formatMoney(item.amount)}</b></div>; })}</div></article>
      <article className="summary-card summary-chart"><h2>Phân bổ theo hạng mục</h2><p>Tỷ lệ chi dùng thực tế trong ngày</p><div className="summary-donut"><div><small>Tổng chi</small><strong>{Math.round(spent/1000)}K</strong><span>Tối ưu</span></div></div><div className="summary-legend"><span><i className="orange" />Ẩm thực & Ăn uống <b>60%</b></span><span><i className="violet" />Cà phê & Làm việc <b>24%</b></span><span><i className="green" />Giải khát & Đi dạo <b>16%</b></span></div><div className="summary-saving"><CircleDollarSign size={19} /><span>Bạn đã duy trì thói quen chi tiêu thông minh <b>5 ngày liên tiếp</b>.</span></div></article>
    </section>

    <section className="summary-health"><header><div><Activity size={20} /><h2>Thống kê sức khỏe & Hoàn thành mục tiêu</h2></div><span><CheckCircle2 size={15} /> Tất cả chỉ số đều vượt ngưỡng</span></header><div>{metrics.map(item => <MetricCard key={item.kicker} item={item} />)}</div></section>

    <section className="summary-reflection"><article className="summary-highlight"><div><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1300&q=85" alt="Hoàng hôn yên bình bên bờ biển" /><div className="summary-photo-overlay"><span><Camera size={15} /> Khoảnh khắc đẹp nhất ngày · 17:45</span><div><small>BÃI BIỂN MỸ KHÊ, ĐÀ NẴNG</small><p>“Gió mát và ánh hoàng hôn khiến mọi áp lực của cả ngày nhẹ nhàng tan biến.”</p></div></div></div><footer><span>📍 Đường Võ Nguyên Giáp, Sơn Trà</span><button type="button"><Heart size={15} /> 12 yêu thích</button><button type="button"><Share2 size={15} /> Chia sẻ</button></footer></article>
      <article className="summary-card summary-gratitude"><header><span><Heart size={20} /></span><div><h2>3 điều biết ơn hôm nay</h2><p>Nuôi dưỡng cảm xúc tích cực trước khi ngủ</p></div></header><div>{gratitudes.map((value, index) => <label key={index}><b>{index + 1}</b><textarea value={value} disabled={locked} onChange={event => setGratitudes(list => list.map((item, i) => i === index ? event.target.value : item))} /></label>)}</div><footer><span>Chuỗi nhật ký: 18 ngày liên tục ✨</span><button type="button" disabled={locked}><Edit3 size={15} /> Chỉnh sửa</button></footer></article>
    </section>

    <section className="summary-tomorrow"><div><span><Sparkles size={24} /></span><div><h2>Đề xuất chuẩn bị cho ngày mai cùng AI</h2><p>Thời tiết dịu nhẹ. Hãy bắt đầu ngày mới bằng 20 phút đi bộ, một bữa sáng giàu năng lượng và ba nhiệm vụ ưu tiên.</p></div></div><button type="button">Lập kế hoạch ngày mai <ArrowRight size={17} /></button></section>
    <div className="summary-day-nav"><button type="button"><ChevronLeft size={17} /> Ngày trước</button><span>Hôm nay · {today}</span><button type="button">Ngày sau <ChevronRight size={17} /></button></div>
  </div></div>;
}
