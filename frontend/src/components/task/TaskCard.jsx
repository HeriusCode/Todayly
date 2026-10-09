import React from 'react';

export default function TaskCard({ task, onToggleComplete, onDelete }) {
  const isDone = task.completed;

  const renderPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-error-container/30 text-error font-label-sm text-xs font-semibold">
            Ưu tiên cao
          </span>
        );
      case 'medium':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-xs font-semibold">
            Trung bình
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs">
            Thấp
          </span>
        );
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl shadow-xs transition-all duration-200 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDone
          ? 'bg-surface-container-low border-outline-variant/30 opacity-75'
          : 'bg-surface-container-lowest border-outline-variant/20 hover:shadow-md'
      }`}
    >
      <div className="flex items-start sm:items-center gap-4 flex-1">
        <button
          type="button"
          onClick={() => onToggleComplete(task.id, !isDone)}
          className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
            isDone
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-high text-outline hover:bg-primary hover:text-on-primary'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[16px] ${
              isDone ? 'opacity-100' : 'opacity-0 hover:opacity-100'
            }`}
          >
            check
          </span>
        </button>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-label-md text-xs sm:text-sm text-on-surface-variant font-medium">
              {task.time || `${task.startTime || ''} – ${task.endTime || ''}`}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-xs font-semibold">
              {task.category || 'Công việc'}
            </span>
            {renderPriorityBadge(task.priority)}
          </div>
          <h3
            className={`font-headline-sm text-base text-on-surface font-semibold ${
              isDone ? 'line-through text-outline' : ''
            }`}
          >
            {task.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-body-sm text-on-surface-variant text-xs">
            {task.location && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {task.location}
              </span>
            )}
            {task.note && <span>{task.note}</span>}
            {task.pomodoroTarget > 0 && (
              <span className="flex items-center gap-1 text-secondary font-semibold">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                {task.pomodoroCompleted || 0}/{task.pomodoroTarget} Pomo
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-full hover:bg-error-container/30 text-outline hover:text-error transition-colors cursor-pointer"
          title="Xóa công việc"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>
    </div>
  );
}
