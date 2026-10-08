import { Check, Plus } from "lucide-react";
import EmptyState from "../common/EmptyState";
export default function TimelineSection({ tasks, onToggle, onAdd }) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">Lịch trình hôm nay</h2>
          <p className="text-sm text-slate-500">
            Dữ liệu lấy trực tiếp từ database
          </p>
        </div>
        <button type="button" onClick={onAdd} className="btn-primary">
          <Plus size={17} />
          Thêm
        </button>
      </div>
      {tasks.length ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
            >
              <button
                type="button"
                onClick={() => onToggle(task.id, !task.completed)}
                className={`grid h-7 w-7 place-items-center rounded-lg ${task.completed ? "bg-brand-600 text-white" : "border border-slate-300 text-transparent"}`}
              >
                <Check size={16} />
              </button>
              <div className="min-w-0 flex-1">
                <strong
                  className={task.completed ? "line-through opacity-60" : ""}
                >
                  {task.title}
                </strong>
                <p className="text-xs text-slate-500">
                  {task.time} • {task.category}
                </p>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-brand-700">
                {task.priority === "high"
                  ? "Cao"
                  : task.priority === "low"
                    ? "Thấp"
                    : "Trung bình"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Hôm nay chưa có lịch trình"
          description="Hãy thêm hoạt động đầu tiên cho ngày mới."
          action={
            <button type="button" onClick={onAdd} className="btn-primary">
              Thêm hoạt động
            </button>
          }
        />
      )}
    </section>
  );
}
