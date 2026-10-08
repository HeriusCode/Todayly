const groups = [
  ['important_urgent', 'Làm ngay', 'bg-red-50 text-red-700'], ['important_not_urgent', 'Lên lịch', 'bg-blue-50 text-blue-700'],
  ['not_important_urgent', 'Ủy quyền', 'bg-amber-50 text-amber-700'], ['not_important_not_urgent', 'Loại bỏ', 'bg-slate-100 text-slate-600'],
];
export default function EisenhowerMatrix({ tasks }) { return <section className="card p-5"><h2 className="font-extrabold">Ma trận Eisenhower</h2><div className="mt-4 grid grid-cols-2 gap-2">{groups.map(([key, label, style]) => <div key={key} className={`rounded-2xl p-3 ${style}`}><strong className="block text-sm">{label}</strong><span className="text-xs">{tasks.filter((task) => task.matrixQuadrant === key).length} công việc</span></div>)}</div></section>; }
