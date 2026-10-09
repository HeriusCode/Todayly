import { useEffect, useState } from 'react';
import {
  CalendarDays,
  Clock3,
  Flag,
  Grid2X2,
  Layers3,
  ListTodo,
  MapPin,
  MessageSquareText,
  Save,
  Sparkles,
  Timer,
  X,
} from 'lucide-react';

const blank = {
  title: '',
  scheduledDate: '',
  startTime: '09:00',
  endTime: '10:00',
  category: 'Công việc',
  priority: 'medium',
  matrixQuadrant: 'important_not_urgent',
  pomodoroTarget: 2,
  location: '',
  note: '',
};

export default function TaskForm({ task, defaultDate, onSubmit, onCancel, busy }) {
  const [form, setForm] = useState({ ...blank, scheduledDate: defaultDate });

  useEffect(() => {
    setForm(task ? { ...blank, ...task } : { ...blank, scheduledDate: defaultDate });
  }, [task, defaultDate]);

  const field = (name) => ({
    value: form[name] ?? '',
    onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value })),
  });

  const submit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      pomodoroTarget: Number(form.pomodoroTarget) || 0,
      time: `${form.startTime} – ${form.endTime}`,
    });
  };

  return (
    <form onSubmit={submit} className="task-form">
      <div className="task-form-intro">
        <span><Sparkles size={20} /></span>
        <div>
          <strong>{task ? 'Cập nhật kế hoạch của bạn' : 'Lên lịch cho một ngày hiệu quả'}</strong>
          <p>Điền thời gian, mức ưu tiên và nhóm Eisenhower để Todayly sắp xếp công việc rõ ràng hơn.</p>
        </div>
      </div>

      <label className="task-form-field task-form-title">
        <span>Tên công việc <em>Bắt buộc</em></span>
        <div className="task-form-control">
          <ListTodo size={18} />
          <input required autoFocus {...field('title')} placeholder="Ví dụ: Hoàn thành báo cáo tuần" />
        </div>
      </label>

      <div className="task-form-grid three">
        <label className="task-form-field">
          <span>Ngày thực hiện</span>
          <div className="task-form-control">
            <CalendarDays size={17} />
            <input required type="date" {...field('scheduledDate')} />
          </div>
        </label>
        <label className="task-form-field">
          <span>Bắt đầu</span>
          <div className="task-form-control">
            <Clock3 size={17} />
            <input required type="time" {...field('startTime')} />
          </div>
        </label>
        <label className="task-form-field">
          <span>Kết thúc</span>
          <div className="task-form-control">
            <Clock3 size={17} />
            <input required type="time" {...field('endTime')} />
          </div>
        </label>
      </div>

      <div className="task-form-section-label"><Layers3 size={16} /> Phân loại công việc</div>
      <div className="task-form-grid three">
        <label className="task-form-field">
          <span>Danh mục</span>
          <div className="task-form-control">
            <Layers3 size={17} />
            <select {...field('category')}>
              <option value="Công việc">Công việc</option>
              <option value="Học tập">Học tập</option>
              <option value="Cá nhân">Cá nhân</option>
              <option value="Sức khỏe">Sức khỏe</option>
              <option value="Cuộc hẹn">Cuộc hẹn</option>
            </select>
          </div>
        </label>
        <label className="task-form-field">
          <span>Mức ưu tiên</span>
          <div className="task-form-control">
            <Flag size={17} />
            <select {...field('priority')}>
              <option value="high">Ưu tiên cao</option>
              <option value="medium">Trung bình</option>
              <option value="low">Ưu tiên thấp</option>
            </select>
          </div>
        </label>
        <label className="task-form-field">
          <span>Ma trận Eisenhower</span>
          <div className="task-form-control">
            <Grid2X2 size={17} />
            <select {...field('matrixQuadrant')}>
              <option value="important_urgent">Làm ngay</option>
              <option value="important_not_urgent">Lên lịch</option>
              <option value="not_important_urgent">Ủy quyền</option>
              <option value="not_important_not_urgent">Loại bỏ</option>
            </select>
          </div>
        </label>
      </div>

      <div className="task-form-grid two">
        <label className="task-form-field">
          <span>Địa điểm <em>Không bắt buộc</em></span>
          <div className="task-form-control">
            <MapPin size={17} />
            <input {...field('location')} placeholder="Văn phòng, thư viện..." />
          </div>
        </label>
        <label className="task-form-field">
          <span>Số phiên Pomodoro</span>
          <div className="task-form-control">
            <Timer size={17} />
            <input type="number" min="0" max="12" {...field('pomodoroTarget')} />
          </div>
        </label>
      </div>

      <label className="task-form-field">
        <span>Ghi chú <em>Không bắt buộc</em></span>
        <div className="task-form-control textarea">
          <MessageSquareText size={17} />
          <textarea {...field('note')} rows="3" placeholder="Thêm chi tiết hoặc mục tiêu cần hoàn thành..." />
        </div>
      </label>

      <div className="task-form-actions">
        <button type="button" className="secondary" onClick={onCancel}>
          <X size={17} /> Hủy
        </button>
        <button type="submit" className="primary" disabled={busy}>
          <Save size={17} />
          {busy ? 'Đang lưu…' : task ? 'Lưu thay đổi' : 'Thêm vào lịch trình'}
        </button>
      </div>
    </form>
  );
}
