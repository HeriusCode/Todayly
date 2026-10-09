import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import EisenhowerMatrix from '../../components/task/EisenhowerMatrix';
import PomodoroTimer from '../../components/task/PomodoroTimer';
import TaskCard from '../../components/task/TaskCard';
import TimeblockBar from '../../components/task/TimeblockBar';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    time: '14:00 – 15:30',
    category: 'Công việc',
    priority: 'medium',
    matrixQuadrant: 'important_not_urgent',
    location: '',
    note: '',
    pomodoroTarget: 2,
  });

  const loadTasks = async () => {
    try {
      const data = await taskService.getAll();
      if (Array.isArray(data) && data.length > 0) {
        setTasks(data);
      } else {
        // Fallback default tasks if API is empty
        setTasks([
          {
            id: 't-1',
            title: 'Học lập trình React & Tailwind CSS',
            time: '08:00 – 09:30',
            category: 'Học tập',
            priority: 'high',
            matrixQuadrant: 'important_urgent',
            completed: true,
            pomodoroTarget: 3,
            pomodoroCompleted: 3,
            location: 'Phòng học',
            note: 'Tối ưu lại component & giao diện',
          },
          {
            id: 't-2',
            title: 'Viết tài liệu API & kiểm thử MongoDB',
            time: '10:00 – 11:30',
            category: 'Công việc',
            priority: 'high',
            matrixQuadrant: 'important_urgent',
            completed: false,
            pomodoroTarget: 2,
            pomodoroCompleted: 1,
            location: 'Văn phòng',
            note: 'Kiểm tra token auth & crud endpoints',
          },
          {
            id: 't-3',
            title: 'Lên ý tưởng tính năng gợi ý món ăn',
            time: '14:00 – 15:30',
            category: 'Công việc',
            priority: 'medium',
            matrixQuadrant: 'important_not_urgent',
            completed: false,
            pomodoroTarget: 2,
            pomodoroCompleted: 0,
            location: 'Bàn làm việc',
            note: 'Phân loại theo khẩu vị & thời tiết',
          },
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleToggleComplete = async (id, completed) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
    try {
      await taskService.toggleComplete(id, completed);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await taskService.delete(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    try {
      const created = await taskService.create(newTask);
      setTasks((prev) => [created || { ...newTask, id: `t-${Date.now()}` }, ...prev]);
    } catch (err) {
      setTasks((prev) => [{ ...newTask, id: `t-${Date.now()}` }, ...prev]);
    }
    setIsModalOpen(false);
    setNewTask({
      title: '',
      time: '14:00 – 15:30',
      category: 'Công việc',
      priority: 'medium',
      matrixQuadrant: 'important_not_urgent',
      location: '',
      note: '',
      pomodoroTarget: 2,
    });
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'high') return t.priority === 'high';
    if (activeFilter === 'work') return t.category === 'Công việc';
    if (activeFilter === 'relax') return t.category === 'Thư giãn';
    if (activeFilter === 'food') return t.category === 'Ăn uống';
    return true;
  });

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2 border-b border-surface-container">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
              <span>Trụ cột Công việc • Tập trung & Cân bằng</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
              Hôm nay làm gì? ✨
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Tối ưu hóa năng suất với phương pháp Pomodoro và quản lý thứ tự ưu tiên theo Ma trận Eisenhower.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">add_task</span>
            <span>Tạo công việc mới</span>
          </button>
        </div>

        {/* Timeblock flow banner */}
        <TimeblockBar />

        {/* Pomodoro & Eisenhower Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <PomodoroTimer />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6">
            <EisenhowerMatrix tasks={tasks} />
          </div>
        </div>

        {/* Task List Section */}
        <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="font-headline-md text-xl font-bold text-on-surface">
                Danh Sách Công Việc Hôm Nay
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-primary">
                {filteredTasks.length} việc
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-surface-container-low border border-outline-variant/20">
              {[
                ['all', 'Tất cả'],
                ['high', 'Ưu tiên cao'],
                ['work', 'Công việc'],
                ['relax', 'Thư giãn'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  className={`px-3 py-1.5 rounded-full font-label-md text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === key
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filteredTasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
              />
            ))}
            {filteredTasks.length === 0 && (
              <EmptyState
                icon="checklist"
                title="Không có công việc nào trong danh mục này"
                description="Bạn có thể tạo thêm công việc mới hoặc chọn bộ lọc khác."
                actionText="Thêm công việc"
                onAction={() => setIsModalOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tạo Công Việc Mới"
      >
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-sm font-semibold text-on-surface">
              Tiêu đề công việc *
            </label>
            <input
              type="text"
              required
              placeholder="VD: Thiết kế mockup, Soạn báo cáo tài chính..."
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Khung giờ thực hiện
              </label>
              <input
                type="text"
                placeholder="14:00 – 15:30"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Phân loại
              </label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              >
                <option value="Công việc">Công việc</option>
                <option value="Học tập">Học tập</option>
                <option value="Thư giãn">Thư giãn</option>
                <option value="Ăn uống">Ăn uống</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Mức độ ưu tiên
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              >
                <option value="high">Ưu tiên cao</option>
                <option value="medium">Trung bình</option>
                <option value="low">Thấp</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Góc ma trận Eisenhower
              </label>
              <select
                value={newTask.matrixQuadrant}
                onChange={(e) => setNewTask({ ...newTask, matrixQuadrant: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              >
                <option value="important_urgent">Khẩn cấp & Quan trọng (Làm ngay)</option>
                <option value="important_not_urgent">Quan trọng • Không khẩn (Lên lịch)</option>
                <option value="not_important_urgent">Khẩn cấp • Ít quan trọng (Uỷ quyền)</option>
                <option value="not_important_not_urgent">Không khẩn • Không quan trọng (Bỏ)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Địa điểm
              </label>
              <input
                type="text"
                placeholder="VD: Bàn làm việc, Văn phòng..."
                value={newTask.location}
                onChange={(e) => setNewTask({ ...newTask, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Số phiên Pomodoro dự kiến
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={newTask.pomodoroTarget}
                onChange={(e) => setNewTask({ ...newTask, pomodoroTarget: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-outline hover:bg-surface-container font-semibold text-sm cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container cursor-pointer shadow-xs"
            >
              Lưu công việc
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
