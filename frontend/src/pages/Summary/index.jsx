import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, ArrowRight, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight,
  Clock3, Edit3, Heart, ListTodo, Lock, Sparkles, Timer,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { taskService } from '../../services/taskService';
import { addDays, formatVietnameseDate, toDateKey } from '../../utils/dates';

const moods = [
  { id: 'great', emoji: '🌟', label: 'Tuyệt vời & Rực rỡ' },
  { id: 'peaceful', emoji: '🌸', label: 'Hài lòng & Bình yên' },
  { id: 'balanced', emoji: '🌿', label: 'Cân bằng & Tạm ổn' },
  { id: 'tired', emoji: '🥱', label: 'Hơi mệt mỏi' },
  { id: 'rest', emoji: '🌧️', label: 'Cần nghỉ ngơi' },
];

const parseMinutes = (value) => {
  if (!/^\d{2}:\d{2}$/.test(value || '')) return null;
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
};

const taskDuration = (task) => {
  const start = parseMinutes(task.startTime);
  const end = parseMinutes(task.endTime);
  return start != null && end != null && end > start ? end - start : 0;
};

const formatDuration = (minutes) => {
  if (!minutes) return '0 phút';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return [hours ? `${hours} giờ` : '', remainingMinutes ? `${remainingMinutes} phút` : '']
    .filter(Boolean)
    .join(' ');
};

const getCurrentTimeLabel = () =>
  new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(new Date());

function MetricCard({ item }) {
  const Icon = item.icon;
  return <article className={`summary-metric ${item.tone}`}><header><span><Icon size={21} /></span><b>{item.tag}</b></header><small>{item.kicker}</small><div><strong>{item.value}</strong><em>{item.goal}</em></div><div className="summary-progress"><i style={{ width: `${item.percent}%` }} /></div><p>{item.text}</p></article>;
}

export default function Summary() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const dateKey = useMemo(() => toDateKey(selectedDate), [selectedDate]);
  const todayKey = useMemo(() => toDateKey(), []);
  const dateLabel = useMemo(() => formatVietnameseDate(selectedDate), [selectedDate]);
  const [tasks, setTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState('');
  const [mood, setMood] = useState('');
  const [moodRecordedAt, setMoodRecordedAt] = useState('');
  const [locked, setLocked] = useState(false);
  const [gratitudes, setGratitudes] = useState(['', '', '']);

  useEffect(() => {
    const prefix = `todayly_summary_${dateKey}`;
    setNote(localStorage.getItem(`${prefix}_note`) || '');
    setMood(localStorage.getItem(`${prefix}_mood`) || '');
    setMoodRecordedAt(localStorage.getItem(`${prefix}_mood_time`) || '');
    setLocked(localStorage.getItem(`${prefix}_locked`) === 'true');
    try {
      const values = JSON.parse(localStorage.getItem(`${prefix}_gratitudes`) || '[]');
      setGratitudes([0, 1, 2].map((index) => values[index] || ''));
    } catch {
      setGratitudes(['', '', '']);
    }
  }, [dateKey]);

  useEffect(() => {
    let active = true;
    if (!isAuthenticated) {
      setTasks([]);
      setTomorrowTasks([]);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    setError('');
    const nextDateKey = toDateKey(addDays(selectedDate, 1));
    Promise.all([
      taskService.getAll({ date: dateKey }),
      taskService.getAll({ date: nextDateKey }),
    ]).then(([todayData, tomorrowData]) => {
      if (!active) return;
      setTasks(Array.isArray(todayData) ? todayData : []);
      setTomorrowTasks(Array.isArray(tomorrowData) ? tomorrowData : []);
    }).catch((requestError) => {
      if (!active) return;
      setTasks([]);
      setTomorrowTasks([]);
      setError(requestError.response?.data?.message || 'Không tải được dữ liệu tổng kết.');
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [dateKey, isAuthenticated, selectedDate]);

  const completedTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks]);
  const completed = completedTasks.length;
  const total = tasks.length;
  const remaining = Math.max(total - completed, 0);
  const ratio = total ? Math.round((completed / total) * 100) : 0;
  const scheduledMinutes = tasks.reduce((sum, task) => sum + taskDuration(task), 0);
  const completedMinutes = completedTasks.reduce((sum, task) => sum + taskDuration(task), 0);
  const pomodoros = tasks.reduce((sum, task) => sum + Number(task.pomodoroCompleted || 0), 0);
  const displayName = user?.name?.trim() || 'bạn';

  const categories = useMemo(() => {
    const counts = new Map();
    tasks.forEach((task) => {
      const name = task.category?.trim() || 'Chưa phân loại';
      counts.set(name, (counts.get(name) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count, percent: total ? Math.round((count / total) * 100) : 0 }))
      .sort((left, right) => right.count - left.count);
  }, [tasks, total]);

  const donutBackground = useMemo(() => {
    if (!categories.length) return '#e5eeff';
    const colors = ['#fd761a', '#3525cd', '#006e4b', '#9d4300', '#64748b'];
    let cursor = 0;
    const segments = categories.map((item, index) => {
      const start = cursor;
      cursor += item.percent;
      return `${colors[index % colors.length]} ${start}% ${cursor}%`;
    });
    return `conic-gradient(${segments.join(', ')})`;
  }, [categories]);

  const metrics = [
    { icon: ListTodo, kicker: 'Hoạt động trong ngày', value: String(total), goal: '', percent: total ? 100 : 0, tag: `${total} lịch`, tone: 'blue', text: total ? 'Tổng số hoạt động đã được lưu trong lịch trình.' : 'Chưa có hoạt động nào trong ngày này.' },
    { icon: CheckCircle2, kicker: 'Mức độ hoàn thành', value: `${ratio}%`, goal: '', percent: ratio, tag: `${completed}/${total}`, tone: 'green', text: total ? `${completed} hoạt động hoàn thành, ${remaining} hoạt động còn lại.` : 'Thêm hoạt động để bắt đầu theo dõi tiến độ.' },
    { icon: Timer, kicker: 'Pomodoro đã hoàn thành', value: String(pomodoros), goal: '', percent: Math.min(100, pomodoros * 20), tag: `${pomodoros} phiên`, tone: 'violet', text: pomodoros ? 'Số phiên tập trung được ghi nhận từ công việc.' : 'Chưa ghi nhận phiên tập trung nào.' },
    { icon: Clock3, kicker: 'Thời gian đã lên lịch', value: formatDuration(scheduledMinutes), goal: '', percent: scheduledMinutes ? Math.min(100, Math.round((completedMinutes / scheduledMinutes) * 100)) : 0, tag: formatDuration(completedMinutes), tone: 'orange', text: scheduledMinutes ? 'Tính trực tiếp từ giờ bắt đầu và kết thúc của các hoạt động.' : 'Các hoạt động chưa có đủ thông tin thời gian.' },
  ];

  const reflection = total === 0
    ? 'Ngày này chưa có dữ liệu để tổng kết. Hãy thêm hoạt động vào lịch trình.'
    : ratio === 100
      ? `Bạn đã hoàn thành toàn bộ ${total} hoạt động đã lên kế hoạch.`
      : ratio >= 50
        ? `Bạn đã hoàn thành ${completed}/${total} hoạt động. Còn ${remaining} việc có thể tiếp tục hoặc chuyển sang ngày mai.`
        : `Bạn đã hoàn thành ${completed}/${total} hoạt động. Hãy ưu tiên việc quan trọng nhất còn lại.`;

  const selectMood = (id) => {
    if (locked) return;
    const recordedAt = getCurrentTimeLabel();
    setMood(id);
    setMoodRecordedAt(recordedAt);
    localStorage.setItem(`todayly_summary_${dateKey}_mood`, id);
    localStorage.setItem(`todayly_summary_${dateKey}_mood_time`, recordedAt);
  };

  const saveSummary = () => {
    const prefix = `todayly_summary_${dateKey}`;
    const nextLocked = !locked;
    localStorage.setItem(`${prefix}_note`, note);
    localStorage.setItem(`${prefix}_gratitudes`, JSON.stringify(gratitudes));
    localStorage.setItem(`${prefix}_locked`, String(nextLocked));
    setLocked(nextLocked);
  };

  const updateGratitude = (index, value) => {
    const next = gratitudes.map((item, itemIndex) => itemIndex === index ? value : item);
    setGratitudes(next);
    localStorage.setItem(`todayly_summary_${dateKey}_gratitudes`, JSON.stringify(next));
  };

  return <div className="summary-page"><div className="summary-shell">
    <section className="summary-intro"><div><div className="summary-badges"><span><CalendarDays size={15} /> {dateLabel}</span><span><CheckCircle2 size={15} /> {loading ? 'Đang đồng bộ…' : `Đã hoàn thành ${completed}/${total} hoạt động (${ratio}%)`}</span></div><h1>Tổng kết ngày của {displayName} ✨</h1><div className="summary-ai-note"><span><Sparkles size={18} /></span><div><small>TỔNG HỢP TỪ DỮ LIỆU LỊCH TRÌNH</small><p>{reflection}</p></div></div></div><div className="summary-actions"><button type="button" onClick={() => setNoteOpen(!noteOpen)}><Edit3 size={17} /> {noteOpen ? 'Đóng ghi chú' : 'Chỉnh sửa ghi chú'}</button><button type="button" className={locked ? 'locked' : 'primary'} onClick={saveSummary}><Lock size={17} /> {locked ? 'Mở khóa sổ ngày' : 'Lưu & khóa sổ ngày'}</button></div></section>
    {error && <div className="home-message">{error}</div>}
    {noteOpen && <textarea className="summary-note-input" value={note} disabled={locked} placeholder="Viết ghi chú cho ngày này…" onChange={(event) => setNote(event.target.value)} onBlur={() => localStorage.setItem(`todayly_summary_${dateKey}_note`, note)} />}

    <section className="summary-top-grid"><article className="summary-card summary-mood"><header><div><span><Heart size={19} /></span><div><h2>Thước đo cảm xúc</h2><p>Cảm nhận của bạn về ngày này</p></div></div><small>{moodRecordedAt ? `Đã ghi nhận lúc ${moodRecordedAt}` : 'Chưa ghi nhận'}</small></header><div className="summary-mood-list">{moods.map((item) => <button type="button" disabled={locked} className={mood === item.id ? 'active' : ''} onClick={() => selectMood(item.id)} key={item.id}>{mood === item.id && <b>ĐÃ CHỌN</b>}<span>{item.emoji}</span><small>{item.label}</small></button>)}</div></article>
      <article className="summary-card summary-energy"><header><span><Activity size={20} /></span><h2>Tiến độ thực tế</h2><i /></header><div className="summary-energy-row"><span>Tỷ lệ hoàn thành lịch trình</span><b>{ratio} / 100</b></div><div className="summary-energy-bar"><i style={{ width: `${ratio}%` }} /></div><p>{total ? `${remaining} hoạt động còn lại trong ngày.` : 'Chưa có hoạt động để tính tiến độ.'}</p><div className="summary-harmony"><div><small>HOÀN THÀNH / TỔNG SỐ</small><strong>{completed} <em>/ {total}</em></strong><p>Dữ liệu được lấy trực tiếp từ công việc của bạn</p></div><div className="summary-ring" style={{ background: `conic-gradient(#3525cd ${ratio}%, #d3e4fe 0)` }}><span>{ratio}%</span></div></div></article>
    </section>

    <section className="summary-money-grid"><article className="summary-card summary-expenses"><header><div><span><CalendarDays size={21} /></span><div><h2>Hoạt động trong ngày</h2><p>Danh sách thật từ lịch trình tài khoản</p></div></div></header><div className="summary-budget"><div><small>Tổng hoạt động</small><strong>{total}</strong><span>Đã lên lịch</span></div><div><small>Đã hoàn thành</small><strong>{completed}</strong><span>{ratio}% tiến độ</span></div><div><small>Còn lại</small><strong>{remaining}</strong><span>Cần xử lý</span></div></div><div className="summary-expense-list">{tasks.length ? tasks.map((task) => <div className="summary-expense" key={task.id || task._id}><span className={task.completed ? 'green' : 'violet'}>{task.completed ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}</span><div><strong>{task.title}</strong><small>{task.startTime && task.endTime ? `${task.startTime} – ${task.endTime}` : 'Chưa đặt giờ'}{task.location ? ` · ${task.location}` : ''}</small></div>{task.category && <em>{task.category}</em>}<b>{task.completed ? 'Hoàn thành' : 'Đang chờ'}</b></div>) : <div className="home-card-empty">{loading ? 'Đang tải hoạt động…' : 'Chưa có hoạt động trong ngày này.'}</div>}</div></article>
      <article className="summary-card summary-chart"><h2>Phân bổ theo hạng mục</h2><p>Tỷ lệ được tính từ lịch trình thực tế</p><div className="summary-donut" style={{ background: donutBackground }}><div><small>Tổng lịch</small><strong>{total}</strong><span>{categories.length} hạng mục</span></div></div><div className="summary-legend">{categories.length ? categories.map((item, index) => <span key={item.name}><i className={['orange', 'violet', 'green'][index % 3]} />{item.name}<b>{item.percent}%</b></span>) : <div className="home-card-empty">Chưa có dữ liệu phân loại.</div>}</div></article>
    </section>

    <section className="summary-health"><header><div><Activity size={20} /><h2>Thống kê từ lịch trình</h2></div><span><CheckCircle2 size={15} /> Không sử dụng số liệu mẫu</span></header><div>{metrics.map((item) => <MetricCard key={item.kicker} item={item} />)}</div></section>

    <section className="summary-reflection"><article className="summary-card summary-expenses"><header><div><span><CheckCircle2 size={21} /></span><div><h2>Hoạt động đã hoàn thành</h2><p>Những việc bạn thực sự đã đánh dấu hoàn tất</p></div></div></header><div className="summary-expense-list">{completedTasks.length ? completedTasks.map((task) => <div className="summary-expense" key={task.id || task._id}><span className="green"><CheckCircle2 size={18} /></span><div><strong>{task.title}</strong><small>{task.note || task.location || 'Không có ghi chú'}</small></div></div>) : <div className="home-card-empty">Chưa có hoạt động nào được hoàn thành.</div>}</div></article>
      <article className="summary-card summary-gratitude"><header><span><Heart size={20} /></span><div><h2>3 điều biết ơn</h2><p>Nội dung do bạn tự ghi lại cho ngày này</p></div></header><div>{gratitudes.map((value, index) => <label key={index}><b>{index + 1}</b><textarea value={value} disabled={locked} placeholder="Nhập điều bạn biết ơn…" onChange={(event) => updateGratitude(index, event.target.value)} /></label>)}</div><footer><span>{gratitudes.filter((item) => item.trim()).length}/3 nội dung đã ghi</span><button type="button" disabled={locked} onClick={() => setNoteOpen(true)}><Edit3 size={15} /> Chỉnh sửa</button></footer></article>
    </section>

    <section className="summary-tomorrow"><div><span><Sparkles size={24} /></span><div><h2>Kế hoạch cho ngày tiếp theo</h2><p>{tomorrowTasks.length ? `Bạn đã có ${tomorrowTasks.length} hoạt động trong lịch ngày tiếp theo.` : 'Chưa có hoạt động nào cho ngày tiếp theo.'}</p></div></div><button type="button" onClick={() => navigate('/planner')}>Lập kế hoạch ngày mai <ArrowRight size={17} /></button></section>
    <div className="summary-day-nav"><button type="button" onClick={() => setSelectedDate((date) => addDays(date, -1))}><ChevronLeft size={17} /> Ngày trước</button><span>{dateKey === todayKey ? 'Hôm nay' : dateLabel}</span><button type="button" onClick={() => setSelectedDate((date) => addDays(date, 1))}>Ngày sau <ChevronRight size={17} /></button></div>
  </div></div>;
}
