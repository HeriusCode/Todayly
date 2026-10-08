import { CalendarRange, Check, Edit3, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import PageHeader from '../../components/common/PageHeader';
import TaskForm from '../../components/task/TaskForm';
import { useAuth } from '../../hooks/useAuth';
import { taskService } from '../../services/taskService';
import { currentWeek, dateKey } from '../../utils/dates';
import { emptyTask } from '../../utils/taskDefaults';

const views = [['today', 'Hôm nay'], ['tomorrow', 'Ngày mai'], ['week', 'Lịch tuần']];
const queryFor = (view) => view === 'tomorrow' ? { date: dateKey(1) } : view === 'week' ? currentWeek() : { date: dateKey() };

export default function Planner() {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [view, setView] = useState('today');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ ...emptyTask, scheduledDate: dateKey() });

  useEffect(() => { let active = true; taskService.getAll(queryFor(view)).then((data) => { if (active) setItems(data); }).catch((error) => { if (active) setMessage(error.response?.data?.message || 'Không thể tải lịch trình.'); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [view]);
  const period = useMemo(() => view === 'today' ? dateKey() : view === 'tomorrow' ? dateKey(1) : `${currentWeek().from} – ${currentWeek().to}`, [view]);
  const startCreate = () => { setEditing(null); setForm({ ...emptyTask, scheduledDate: view === 'tomorrow' ? dateKey(1) : dateKey() }); setOpen(true); };
  const startEdit = (task) => { setEditing(task); setForm({ ...emptyTask, ...task, activityType: task.activityType || task.type || 'task' }); setOpen(true); };
  const submit = async (event) => { event.preventDefault(); try { if (editing) await taskService.update(editing.id, form); else await taskService.create(form); setOpen(false); setEditing(null); setItems(await taskService.getAll(queryFor(view))); window.dispatchEvent(new Event('todayly:tasks-changed')); } catch (error) { setMessage(error.response?.data?.message || 'Không thể lưu lịch trình.'); } };
  const toggle = async (task) => { const saved = await taskService.toggleComplete(task.id, !task.completed); setItems((current) => current.map((item) => item.id === task.id ? saved : item)); };
  const remove = async (id) => { if (!window.confirm('Xóa hoạt động khỏi lịch trình?')) return; await taskService.delete(id); setItems((current) => current.filter((item) => item.id !== id)); };

  return <div className="page-container space-y-6">
    <PageHeader eyebrow="Kế hoạch có chủ đích" title={`Lịch Trình ${views.find(([key]) => key === view)?.[1]} 🗓️`} description="Lịch trình và Hôm nay làm gì dùng chung dữ liệu công việc. Tạo hoặc sửa ở một nơi, nơi còn lại sẽ được cập nhật." actions={<><button type="button" onClick={() => setMessage('Nút đã ở đúng trang. Để đồng bộ thật cần cấu hình Google OAuth và Calendar API.')} className="btn-secondary"><RefreshCw size={17} />Đồng bộ Google Calendar</button>{isAuthenticated ? <button type="button" onClick={startCreate} className="btn-primary"><Plus size={18} />Thêm vào lịch trình</button> : <Link to="/login" className="btn-primary">Đăng nhập</Link>}</>} />
    {message && <div className="flex items-center justify-between rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-blue-700"><span>{message}</span><button type="button" onClick={() => setMessage('')} className="cursor-pointer">Đóng</button></div>}
    <div className="card flex flex-wrap items-center justify-between gap-3 p-2"><div className="flex flex-wrap gap-2">{views.map(([key, label]) => <button type="button" key={key} onClick={() => { setLoading(true); setView(key); }} className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-bold ${view === key ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{label}</button>)}</div><span className="flex items-center gap-2 px-3 text-sm font-semibold text-slate-500"><CalendarRange size={17} />{period}</span></div>
    <div className="grid gap-4 sm:grid-cols-3"><div className="card p-5"><span className="text-xs font-bold text-slate-500">Hoạt động trong kỳ</span><strong className="mt-1 block text-2xl">{items.length}</strong></div><div className="card p-5"><span className="text-xs font-bold text-slate-500">Đã hoàn thành</span><strong className="mt-1 block text-2xl">{items.filter((item) => item.completed).length}/{items.length}</strong></div><div className="card p-5"><span className="text-xs font-bold text-slate-500">Ưu tiên cao</span><strong className="mt-1 block text-2xl">{items.filter((item) => item.priority === 'high').length}</strong></div></div>
    <section className="card p-5 sm:p-7"><h2 className="mb-5 text-xl font-black">Dòng thời gian chi tiết</h2>{loading ? <div className="py-16 text-center text-slate-500">Đang tải lịch trình...</div> : items.length ? <div className="space-y-3">{items.map((task) => <article key={task.id} className={`flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center ${task.completed ? 'bg-slate-50 opacity-70' : 'bg-white'}`}><button type="button" onClick={() => toggle(task)} className={`grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-lg ${task.completed ? 'bg-brand-600 text-white' : 'border border-slate-300 text-transparent'}`}><Check size={17} /></button><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 text-xs font-bold"><span className="text-brand-700">{task.time}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{task.scheduledDate}</span><span className="rounded-full bg-violet-50 px-2 py-1 text-violet-700">{task.priority === 'high' ? 'Ưu tiên cao' : task.priority === 'low' ? 'Ưu tiên thấp' : 'Ưu tiên trung bình'}</span></div><h3 className={`mt-2 font-extrabold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3><p className="mt-1 text-sm text-slate-500">{[task.location, task.note].filter(Boolean).join(' • ')}</p></div><div className="flex gap-2 self-end sm:self-auto"><button type="button" onClick={() => startEdit(task)} className="btn-secondary"><Edit3 size={16} />Sửa</button><button type="button" onClick={() => remove(task.id)} className="cursor-pointer rounded-xl p-2.5 text-red-600 hover:bg-red-50" aria-label="Xóa"><Trash2 size={18} /></button></div></article>)}</div> : <EmptyState title="Chưa có hoạt động trong khoảng này" action={isAuthenticated && <button type="button" onClick={startCreate} className="btn-primary">Thêm hoạt động</button>} />}</section>
    <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Sửa hoạt động' : 'Thêm hoạt động vào lịch trình'}><TaskForm value={form} onChange={setForm} onSubmit={submit} submitLabel={editing ? 'Lưu thay đổi' : 'Lưu hoạt động'} /></Modal>
  </div>;
}
