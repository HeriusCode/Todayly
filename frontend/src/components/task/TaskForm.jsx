import { useEffect, useState } from 'react';

const blank = { title: '', scheduledDate: '', startTime: '09:00', endTime: '10:00', priority: 'medium', matrixQuadrant: 'important_not_urgent', location: '', note: '' };

export default function TaskForm({ task, defaultDate, onSubmit, onCancel, busy }) {
  const [form, setForm] = useState({ ...blank, scheduledDate: defaultDate });
  useEffect(() => setForm(task ? { ...blank, ...task } : { ...blank, scheduledDate: defaultDate }), [task, defaultDate]);
  const field = (name) => ({ value: form[name] || '', onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value })) });
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit({ ...form, time: `${form.startTime} – ${form.endTime}` }); }} className="grid gap-4">
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">Tên công việc<input required {...field('title')} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal" placeholder="Ví dụ: Hoàn thành báo cáo" /></label>
      <div className="grid gap-4 sm:grid-cols-3"><label className="grid gap-1.5 text-sm font-semibold text-slate-700">Ngày<input required type="date" {...field('scheduledDate')} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label><label className="grid gap-1.5 text-sm font-semibold text-slate-700">Bắt đầu<input required type="time" {...field('startTime')} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label><label className="grid gap-1.5 text-sm font-semibold text-slate-700">Kết thúc<input required type="time" {...field('endTime')} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label></div>
      <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-semibold text-slate-700">Mức ưu tiên<select {...field('priority')} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal"><option value="high">Cao</option><option value="medium">Trung bình</option><option value="low">Thấp</option></select></label><label className="grid gap-1.5 text-sm font-semibold text-slate-700">Ma trận Eisenhower<select {...field('matrixQuadrant')} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal"><option value="important_urgent">Quan trọng & khẩn cấp</option><option value="important_not_urgent">Quan trọng, không khẩn cấp</option><option value="not_important_urgent">Không quan trọng, khẩn cấp</option><option value="not_important_not_urgent">Không quan trọng, không khẩn cấp</option></select></label></div>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">Địa điểm<input {...field('location')} className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
      <label className="grid gap-1.5 text-sm font-semibold text-slate-700">Ghi chú<textarea {...field('note')} rows="3" className="rounded-xl border border-slate-200 px-3 py-2.5 font-normal" /></label>
      <div className="flex justify-end gap-2"><button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-2 font-semibold">Hủy</button><button disabled={busy} className="rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white disabled:opacity-50">{busy ? 'Đang lưu…' : task ? 'Lưu thay đổi' : 'Thêm vào lịch trình'}</button></div>
    </form>
  );
}
