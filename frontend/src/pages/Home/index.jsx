import { Plus, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../components/common/Modal";
import PillarCards from "../../components/home/PillarCards";
import QuickStats from "../../components/home/QuickStats";
import TimelineSection from "../../components/home/TimelineSection";
import WeatherCard from "../../components/home/WeatherCard";
import TaskForm from "../../components/task/TaskForm";
import { useAuth } from "../../hooks/useAuth";
import { taskService } from "../../services/taskService";
import { dateKey, formatVietnameseDate } from "../../utils/dates";
import { emptyTask } from "../../utils/taskDefaults";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...emptyTask, scheduledDate: dateKey() });

  useEffect(() => {
    taskService
      .getAll()
      .then(setTasks)
      .catch(() => setTasks([]));
  }, []);

  const toggle = async (id, completed) => {
    const updated = await taskService.toggleComplete(id, completed);
    setTasks((items) => items.map((item) => (item.id === id ? updated : item)));
  };

  const submit = async (event) => {
    event.preventDefault();
    const created = await taskService.create(form);
    setTasks((items) => [...items, created]);
    setOpen(false);
    setForm({ ...emptyTask, scheduledDate: dateKey() });
  };

  return (
    <div className="page-container space-y-7">
      <section className="card overflow-hidden bg-gradient-to-r from-white via-violet-50 to-blue-50 p-6 sm:p-9">
        <div className="grid items-center gap-7 lg:grid-cols-[1.35fr_.65fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-700 shadow-sm">
              <Sparkles size={15} />
              Sẵn sàng cho ngày mới
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Chào {user?.name || "bạn"}, hôm nay mình làm gì?
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              {formatVietnameseDate(undefined, {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              . Lên lịch có chủ đích và giữ nhịp sống cân bằng cùng Todayly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="btn-primary"
                >
                  <Plus size={18} />
                  Thêm việc hôm nay
                </button>
              ) : (
                <Link to="/login" className="btn-primary">
                  Đăng nhập để lập lịch
                </Link>
              )}
              <Link to="/planner" className="btn-secondary">
                Mở lịch trình
              </Link>
            </div>
          </div>
          <WeatherCard />
        </div>
      </section>
      <QuickStats tasks={tasks} />
      <TimelineSection
        tasks={tasks}
        onToggle={toggle}
        onAdd={() => isAuthenticated && setOpen(true)}
      />
      <section>
        <h2 className="mb-4 text-2xl font-black">Khám phá Todayly</h2>
        <PillarCards />
      </section>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Thêm hoạt động hôm nay"
      >
        <TaskForm value={form} onChange={setForm} onSubmit={submit} />
      </Modal>
    </div>
  );
}
