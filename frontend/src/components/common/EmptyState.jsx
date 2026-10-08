import { CalendarPlus } from "lucide-react";

export default function EmptyState({
  title = "Chưa có dữ liệu",
  description,
  action,
}) {
  return (
    <div className="grid min-h-56 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div>
        <CalendarPlus className="mx-auto text-brand-500" size={34} />
        <h3 className="mt-3 font-extrabold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  );
}
