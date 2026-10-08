import { CalendarDays, Check, Clock, MapPin, Trash2 } from 'lucide-react';

const matrixLabels = {
  important_urgent: 'Quan trọng & Khẩn cấp', important_not_urgent: 'Quan trọng, không khẩn cấp',
  not_important_urgent: 'Không quan trọng, khẩn cấp', not_important_not_urgent: 'Không quan trọng, không khẩn cấp',
};

export default function TaskCard({ task, onToggle, onDelete, onUpdate }) {
  return <article className={`card p-5 transition ${task.completed ? 'opacity-65' : 'hover:-translate-y-0.5 hover:shadow-lg'}`}>
    <div className="flex items-start gap-4">
      <button type="button" onClick={() => onToggle(task.id, !task.completed)} className={`mt-0.5 grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-lg border ${task.completed ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 text-transparent hover:border-brand-500'}`}><Check size={16} /></button>
      <div className="min-w-0 flex-1"><div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500"><span className="flex items-center gap-1"><Clock size={14} />{task.time}</span><span className="rounded-full bg-slate-100 px-2 py-0.5">{task.category}</span>{task.scheduledDate && <span className="flex items-center gap-1"><CalendarDays size={14} />{task.scheduledDate}</span>}</div><h3 className={`mt-2 font-extrabold text-slate-950 ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>{(task.location || task.note) && <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">{task.location && <span className="flex items-center gap-1"><MapPin size={14} />{task.location}</span>}{task.note}</p>}</div>
      <button type="button" onClick={() => onDelete(task.id)} className="cursor-pointer rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Xóa"><Trash2 size={18} /></button>
    </div>
    <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 sm:pl-11"><label className="text-xs font-bold text-slate-500">Mức độ ưu tiên<select className="field mt-1" value={task.priority || 'medium'} onChange={(event) => onUpdate(task.id, { priority: event.target.value })}><option value="high">Cao</option><option value="medium">Trung bình</option><option value="low">Thấp</option></select></label><label className="text-xs font-bold text-slate-500">Ma trận Eisenhower<select className="field mt-1" value={task.matrixQuadrant || 'important_not_urgent'} onChange={(event) => onUpdate(task.id, { matrixQuadrant: event.target.value })}>{Object.entries(matrixLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label></div>
  </article>;
}
