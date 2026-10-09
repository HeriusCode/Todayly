import { useEffect, useRef, useState } from 'react';
import { Check, Clock3, Edit3, MapPin, MoreHorizontal, Timer, Trash2 } from 'lucide-react';

const priorityLabels = {
  high: 'Ưu tiên cao',
  medium: 'Trung bình',
  low: 'Thấp',
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const id = task.id || task._id;
  const completedPomo = task.pomodoroCompleted || 0;
  const targetPomo = task.pomodoroTarget || 0;
  const percent = targetPomo
    ? Math.min(100, Math.round((completedPomo / targetPomo) * 100))
    : 0;

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeMenu = (event) => {
      if (event.type === 'keydown' && event.key !== 'Escape') return;
      if (event.type === 'mousedown' && menuRef.current?.contains(event.target)) return;
      setMenuOpen(false);
    };

    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', closeMenu);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeMenu);
    };
  }, [menuOpen]);

  const editTask = () => {
    setMenuOpen(false);
    onEdit(task);
  };

  const deleteTask = () => {
    setMenuOpen(false);
    onDelete(id);
  };

  return (
    <article className={`tasks-item ${task.completed ? 'completed' : ''} priority-${task.priority || 'medium'}`}>
      <button
        type="button"
        className="tasks-check"
        onClick={() => onToggle(task)}
        aria-label={task.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}
      >
        <Check size={16} />
      </button>

      <div className="tasks-item-content">
        <div className="tasks-item-top">
          <div>
            <span className="tasks-time">
              <Clock3 size={14} /> {task.startTime || '09:00'} – {task.endTime || '10:00'}
            </span>
            <span className={`tasks-priority ${task.priority || 'medium'}`}>
              {priorityLabels[task.priority] || priorityLabels.medium}
            </span>
            <span className="tasks-category">{task.category || 'Công việc'}</span>
          </div>

          <div className="tasks-menu-wrap" ref={menuRef}>
            <button
              type="button"
              className={`tasks-more ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Mở thao tác công việc"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <MoreHorizontal size={19} />
            </button>

            {menuOpen && (
              <div className="tasks-item-menu" role="menu">
                <button type="button" role="menuitem" onClick={editTask}>
                  <Edit3 size={15} />
                  <span>Sửa công việc</span>
                </button>
                <button type="button" role="menuitem" className="danger" onClick={deleteTask}>
                  <Trash2 size={15} />
                  <span>Xóa công việc</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <h3>{task.title}</h3>

        <div className="tasks-meta">
          {task.location && <span><MapPin size={14} />{task.location}</span>}
          {task.note && <span>{task.note}</span>}
        </div>

        {targetPomo > 0 && (
          <div className="tasks-pomo-progress">
            <span><Timer size={14} /> Pomodoro {completedPomo}/{targetPomo}</span>
            <i><b style={{ width: `${percent}%` }} /></i>
          </div>
        )}
      </div>
    </article>
  );
}
