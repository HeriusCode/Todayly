import { Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import PageHeader from '../../components/common/PageHeader';
import EisenhowerMatrix from '../../components/task/EisenhowerMatrix';
import PomodoroTimer from '../../components/task/PomodoroTimer';
import TaskCard from '../../components/task/TaskCard';
import TaskForm from '../../components/task/TaskForm';
import { useAuth } from '../../hooks/useAuth';
import { taskService } from '../../services/taskService';
import { dateKey } from '../../utils/dates';
import { emptyTask } from '../../utils/taskDefaults';

const filters = [['all', 'Tất cả'], ['high', 'Ưu tiên cao'], ['work', 'Công việc'], ['study', 'Học tập']];

export default function Tasks() {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...emptyTask, scheduledDate: dateKey() });
  const [error, setError] = useState('');

  const load = () => taskService.getAll({ date: dateKey() }).then(setTasks).catch((reason) => setError(reason.response?.data?.message || 'Không thể tải công việc.'));
  useEffect(load, []);
  const visible = useMemo(() => tasks.filter((task) => filter === 'all' || filter === 'high' && task.priority === 'high' || filter === 'work' && task.category === 'Công việc' || filter === 'study' && task.category === 'Học tập'), [tasks, filter]);
  const submit = async (event) => { event.preventDefault(); try { const created = await taskService.create(form); setTasks((items) => [...items, created]); setOpen(false); setForm({ ...emptyTask, scheduledDate: dateKey() }); } catch (reason) { setError(reason.response?.data?.message || 'Không thể lưu công việc.'); } };
  const update = async (id, changes) => { try { const saved = await taskService.update(id, changes); setTasks((items) => items.map((item) => item.id === id ? saved : item)); } catch (reason) { setError(reason.response?.data?.message || 'Không thể cập nhật công việc.'); } };
  const toggle = async (id, completed) => { const saved = await taskService.toggleComplete(id, completed); setTasks((items) => items.map((item) => item.id === id ? saved : item)); };
  const remove = async (id) => { if (!window.confirm('Xóa công việc này?')) return; await taskService.delete(id); setTasks((items) => items.filter((item) => item.id !== id)); };

  return <div className="page-container space-y-6">
    <PageHeader eyebrow="Mindful productivity" title="Hôm Nay Làm Gì? ✨" description="Sắp xếp công việc theo mức độ ưu tiên và ma trận Eisenhower. Tất cả thay đổi được lưu trực tiếp vào database." actions={isAuthenticated ? <button type="button" onClick={() => setOpen(true)} className="btn-primary"><Plus size={18} />Thêm việc mới</button> : <Link to="/login" className="btn-primary">Đăng nhập</Link>} />
    {error && <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
    <div className="flex flex-wrap gap-2">{filters.map(([key, label]) => <button type="button" key={key} onClick={() => setFilter(key)} className={`cursor-pointer rounded-full px-4 py-2 text-sm font-bold ${filter === key ? 'bg-slate-950 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>{label}</button>)}</div>
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"><div className="space-y-3">{visible.length ? visible.map((task) => <TaskCard key={task.id} task={task} onToggle={toggle} onDelete={remove} onUpdate={update} />) : <EmptyState title={isAuthenticated ? 'Chưa có công việc hôm nay' : 'Đăng nhập để xem công việc'} description="Công việc tạo trong Lịch trình cũng xuất hiện tại đây." />}</div><aside className="space-y-4"><PomodoroTimer /><EisenhowerMatrix tasks={tasks} /></aside></div>
    <Modal open={open} onClose={() => setOpen(false)} title="Thêm công việc mới"><TaskForm value={form} onChange={setForm} onSubmit={submit} /></Modal>
  </div>;
}
