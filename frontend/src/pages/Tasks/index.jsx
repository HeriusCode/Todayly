import { useCallback, useEffect, useState } from 'react';
import { CalendarSync, CheckCircle2, Coffee, Footprints, Headphones, Home as HomeIcon, Plus, Sparkles, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import EisenhowerMatrix from '../../components/task/EisenhowerMatrix';
import PomodoroTimer from '../../components/task/PomodoroTimer';
import TaskCard from '../../components/task/TaskCard';
import TaskForm from '../../components/task/TaskForm';
import TimeblockBar from '../../components/task/TimeblockBar';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { taskService } from '../../services/taskService';
import { formatVietnameseDate, toDateKey } from '../../utils/dates';

const filters = [['all', 'Tất cả'], ['high', 'Ưu tiên cao'], ['pending', 'Đang làm'], ['completed', 'Hoàn thành']];

export default function Tasks() {
  const { isAuthenticated } = useAuth();
  const [today] = useState(() => toDateKey());
  const [dateLabel] = useState(() => formatVietnameseDate(new Date()));
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sound, setSound] = useState('Mưa nhẹ');
  const [water, setWater] = useState(5);

  const loadTasks = useCallback(async () => {
    if (!isAuthenticated) { setTasks([]); return; }
    try { setError(''); setTasks(await taskService.getAll({ date: today })); }
    catch (err) { setError(err.response?.data?.message || 'Không tải được danh sách công việc.'); }
  }, [isAuthenticated, today]);
  useEffect(() => { loadTasks(); }, [loadTasks]);

  const run = async (action) => { try { setError(''); await action(); await loadTasks(); return true; } catch (err) { setError(err.response?.data?.message || 'Không thể cập nhật công việc.'); return false; } };
  const save = async (values) => { setBusy(true); const ok = await run(() => editing ? taskService.update(editing.id || editing._id, values) : taskService.create(values)); setBusy(false); if (ok) { setModalOpen(false); setEditing(null); } };
  const filtered = tasks.filter((task) => { if (filter === 'high') return task.priority === 'high'; if (filter === 'pending') return !task.completed; if (filter === 'completed') return task.completed; if (filter !== 'all') return task.matrixQuadrant === filter; return true; });
  const completed = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const pomoCount = tasks.reduce((sum, task) => sum + Number(task.pomodoroCompleted || 0), 0);
  const focusedMinutes = pomoCount * 25;
  const focusLabel = `${Math.floor(focusedMinutes / 60)}h ${focusedMinutes % 60}m`;
  const openCreate = () => { setEditing(null); setModalOpen(true); };

  if (!isAuthenticated) return <main className="tasks-auth-required"><h1>Đăng nhập để quản lý công việc</h1><p>Danh sách, Pomodoro và ma trận Eisenhower được lưu theo tài khoản của bạn.</p><Link to="/login">Đăng nhập ngay</Link></main>;

  return <div className="tasks-page"><div className="tasks-shell">
    <section className="tasks-topbar"><nav><Link to="/"><HomeIcon size={15} /> Trang chủ</Link><span>/</span><strong>Hôm nay làm gì?</strong></nav><div><Link to="/planner"><CalendarSync size={16} /> Lịch trình & Google Calendar</Link><button onClick={openCreate}><Plus size={17} /> Thêm việc mới</button></div></section>

    <section className="tasks-hero tasks-rise"><span className="tasks-hero-orb" /><div className="tasks-heading"><div><span>Làm gì · Mindful Productivity</span><small><i />{dateLabel}</small></div><h1>Hôm Nay Làm Gì? <Sparkles size={28} /></h1><p>Sắp xếp công việc theo ma trận ưu tiên Eisenhower, đồng bộ nhịp thở thảnh thơi cùng bộ đếm Pomodoro và phát hiện khoảng trống tái tạo năng lượng.</p></div><div className="tasks-metrics"><article><span className="purple"><CheckCircle2 size={18} /></span><div><small>Tiến độ ngày</small><strong>{completed}/{tasks.length} việc ({progress}%)</strong></div></article><article><span className="orange"><Coffee size={18} /></span><div><small>Đã tập trung</small><strong>{focusLabel}</strong></div></article><article><span className="green"><Footprints size={18} /></span><div><small>Khoảng trống</small><strong>{Math.max(0, 8 - tasks.length)} khung rảnh</strong></div></article></div></section>

    <TimeblockBar tasks={tasks} />
    {error && <div className="tasks-error">{error}</div>}

    <div className="tasks-workspace">
      <main className="tasks-manager">
        <section className="tasks-list-card"><header><div><h2>Danh sách công việc hôm nay <span>{filtered.length} việc</span></h2><p>Cập nhật trực tiếp từ lịch trình và cơ sở dữ liệu của bạn.</p></div><div className="tasks-filters">{filters.map(([value, label]) => <button key={value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div></header><div className="tasks-list">{filtered.length ? filtered.map((task) => <TaskCard key={task.id || task._id} task={task} onToggle={(item) => run(() => taskService.toggleComplete(item.id || item._id, !item.completed))} onEdit={(item) => { setEditing(item); setModalOpen(true); }} onDelete={(id) => run(() => taskService.delete(id))} />) : <div className="tasks-empty"><CheckCircle2 size={30} /><strong>Chưa có công việc trong mục này</strong><p>Tạo công việc mới hoặc chọn một bộ lọc khác.</p><button onClick={openCreate}>Thêm công việc</button></div>}</div></section>
        <EisenhowerMatrix tasks={tasks} active={filter} onSelect={setFilter} />
      </main>

      <aside className="tasks-companion">
        <PomodoroTimer tasks={tasks} onSessionComplete={(task) => run(() => taskService.incrementPomodoro(task.id || task._id))} />
        <section className="tasks-sound-card"><header><span><Headphones size={18} /></span><div><h2>Âm thanh tập trung</h2><p>Không gian dịu nhẹ cho phiên làm việc</p></div><Volume2 size={18} /></header><div>{['Mưa nhẹ', 'Quán cafe', 'Sóng biển', 'Rừng xanh'].map((item) => <button key={item} onClick={() => setSound(item)} className={sound === item ? 'active' : ''}>{item}</button>)}</div><input type="range" aria-label="Âm lượng" defaultValue="45" /></section>
        <section className="tasks-habits"><header><h2>Thói quen tích cực</h2><span>Hôm nay</span></header><div><article><span>💧</span><div><strong>Uống đủ nước</strong><p>{water}/8 ly</p><i><b style={{ width: `${water / 8 * 100}%` }} /></i></div><button onClick={() => setWater((value) => Math.min(8, value + 1))}>+</button></article><article><span>🚶</span><div><strong>Vận động</strong><p>3.840/6.200 bước</p><i><b style={{ width: '62%' }} /></i></div></article><article><span>👀</span><div><strong>Nghỉ mắt</strong><p>3/6 lần</p><i><b style={{ width: '50%' }} /></i></div></article></div></section>
        <Link to="/planner" className="tasks-break-card"><Sparkles size={23} /><div><strong>Đang bí ý tưởng nghỉ giải lao?</strong><p>Mở lịch trình để tìm một khoảng nghỉ phù hợp.</p></div><span>→</span></Link>
      </aside>
    </div>
  </div><Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} title={editing ? 'Chỉnh sửa công việc' : 'Thêm việc mới hôm nay'} maxWidth="max-w-2xl"><TaskForm task={editing} defaultDate={today} busy={busy} onCancel={() => setModalOpen(false)} onSubmit={save} /></Modal></div>;
}
