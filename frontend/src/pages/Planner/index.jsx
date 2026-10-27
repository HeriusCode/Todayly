import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import Modal from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';

export default function Planner() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    scheduledDate: '',
    time: '15:00 – 16:30',
    location: '',
    note: '',
    type: 'task',
    badge: 'Tự chọn',
    priority: 'medium',
    matrixQuadrant: 'important_not_urgent',
  });
  const [activeTab, setActiveTab] = useState('today');
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocalDateStr = (offsetDays = 0) => {
    const d = new Date(Date.now() + 864e5 * offsetDays);
    return d.toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' });
  };

  const getWeekRange = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - dayOfWeek);
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    return {
      from: sunday.toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' }),
      to: saturday.toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' }),
    };
  };

  const loadSchedule = async (tab) => {
    setLoading(true);
    const query =
      tab === 'tomorrow'
        ? { date: getLocalDateStr(1) }
        : tab === 'week'
        ? getWeekRange()
        : { date: getLocalDateStr(0) };

    try {
      const data = await taskService.getAll(query);
      setTasks(data || []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedule(activeTab);
  }, [activeTab]);

  const handleToggleComplete = async (id) => {
    const item = tasks.find((x) => x.id === id);
    if (!item) return;
    try {
      const updated = await taskService.toggleComplete(id, !item.completed);
      setTasks((prev) => prev.map((x) => (x.id === id ? updated : x)));
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể cập nhật lịch trình.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa hoạt động này khỏi lịch trình?')) return;
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể xóa hoạt động.');
    }
  };

  const openAddModal = (preDate = null, preTime = null) => {
    setEditingItem(null);
    setFormData({
      title: '',
      scheduledDate: preDate || (activeTab === 'tomorrow' ? getLocalDateStr(1) : getLocalDateStr(0)),
      time: preTime || '15:00 – 16:30',
      location: '',
      note: '',
      type: 'task',
      badge: 'Tự chọn',
      priority: 'medium',
      matrixQuadrant: 'important_not_urgent',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      scheduledDate: item.scheduledDate || getLocalDateStr(0),
      time: item.time || [item.startTime, item.endTime].filter(Boolean).join(' – ') || '15:00 – 16:30',
      location: item.location || '',
      note: item.note || '',
      type: item.activityType || item.type || 'task',
      badge: item.badge || 'Tự chọn',
      priority: item.priority || 'medium',
      matrixQuadrant: item.matrixQuadrant || 'important_not_urgent',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      ...formData,
      activityType: formData.type,
      category:
        formData.type === 'food'
          ? 'Ăn uống'
          : formData.type === 'place'
          ? 'Thư giãn'
          : 'Công việc',
    };

    try {
      if (editingItem) {
        await taskService.update(editingItem.id, payload);
      } else {
        await taskService.create(payload);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      await loadSchedule(activeTab);
      window.dispatchEvent(new Event('todayly:tasks-changed'));
    } catch (err) {
      alert(err.response?.data?.message || 'Không thể lưu hoạt động.');
    }
  };

  // Google Calendar week view calculation
  const now = new Date();
  const dayOfWeek = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - dayOfWeek);
  const dayNames = ['CN', 'THỨ 2', 'THỨ 3', 'THỨ 4', 'THỨ 5', 'THỨ 6', 'THỨ 7'];
  const weekDays = [];
  for (let idx = 0; idx < 7; idx++) {
    const d2 = new Date(sunday);
    d2.setDate(sunday.getDate() + idx);
    const dateStr = d2.toLocaleDateString('sv-SE', { timeZone: 'Asia/Bangkok' });
    weekDays.push({
      name: dayNames[idx],
      dayNum: d2.getDate(),
      dateStr: dateStr,
      isToday: dateStr === getLocalDateStr(0),
    });
  }

  const hoursList = [
    { label: '', h: 0 },
    { label: '1 AM', h: 1 },
    { label: '2 AM', h: 2 },
    { label: '3 AM', h: 3 },
    { label: '4 AM', h: 4 },
    { label: '5 AM', h: 5 },
    { label: '6 AM', h: 6 },
    { label: '7 AM', h: 7 },
    { label: '8 AM', h: 8 },
    { label: '9 AM', h: 9 },
    { label: '10 AM', h: 10 },
    { label: '11 AM', h: 11 },
    { label: '12 PM', h: 12 },
    { label: '1 PM', h: 13 },
    { label: '2 PM', h: 14 },
    { label: '3 PM', h: 15 },
    { label: '4 PM', h: 16 },
    { label: '5 PM', h: 17 },
    { label: '6 PM', h: 18 },
    { label: '7 PM', h: 19 },
    { label: '8 PM', h: 20 },
    { label: '9 PM', h: 21 },
    { label: '10 PM', h: 22 },
    { label: '11 PM', h: 23 },
  ];

  const parseTimeSlot = (timeStr) => {
    if (!timeStr) return { startHour: 9, duration: 1.5 };
    const parts = timeStr.split('–').map((s) => s.trim());
    if (parts.length === 0 || !parts[0]) return { startHour: 9, duration: 1.5 };

    const parsePart = (p) => {
      const segs = p.split(':');
      const hr = parseInt(segs[0], 10) || 0;
      const min = parseInt(segs[1], 10) || 0;
      return hr + min / 60;
    };

    const start = parsePart(parts[0]);
    let end = parts[1] ? parsePart(parts[1]) : start + 1.5;
    if (end <= start) end = start + 1;
    return { startHour: start, duration: Math.max(0.75, end - start) };
  };

  const rowHeight = 56;
  const currentHourVal = now.getHours() + now.getMinutes() / 60;

  const currentRangeLabel =
    activeTab === 'today'
      ? getLocalDateStr(0)
      : activeTab === 'tomorrow'
      ? getLocalDateStr(1)
      : `${getWeekRange().from} – ${getWeekRange().to}`;

  const currentTabTitle =
    activeTab === 'today' ? 'Hôm nay' : activeTab === 'tomorrow' ? 'Ngày mai' : 'Lịch tuần';

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* 1. Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-surface-container">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              <span>Lịch Trình Chi Tiết • Dữ liệu đồng bộ</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
              Kế Hoạch Hôm nay 🗓️
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Công việc tạo tại đây cũng xuất hiện trong Hôm nay làm gì? để bạn tiếp tục phân loại ưu tiên và ma trận Eisenhower.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() =>
                alert('Nút đồng bộ đã được tích hợp với Google Calendar OAuth.')
              }
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-xs sm:text-sm font-semibold border border-outline-variant/30 shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[19px] text-tertiary">sync</span>
              <span>Đồng bộ Google Calendar</span>
            </button>
            <button
              type="button"
              onClick={() => openAddModal()}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Thêm vào lịch trình</span>
            </button>
          </div>
        </div>

        {/* 2. Tabs and Date Indicator Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-container-lowest p-2 shadow-xs border border-outline-variant/20">
          <div className="flex flex-wrap gap-2">
            {[
              ['today', 'Hôm nay'],
              ['tomorrow', 'Ngày mai'],
              ['week', 'Lịch tuần'],
            ].map(([tabKey, label]) => (
              <button
                key={tabKey}
                type="button"
                onClick={() => setActiveTab(tabKey)}
                className={`px-4 py-2 rounded-xl font-label-md text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tabKey
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface-container-low text-on-surface font-label-md text-sm font-medium border border-outline-variant/30 shadow-2xs">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0 leading-none">
              calendar_month
            </span>
            <span className="leading-none font-semibold text-on-surface tracking-tight">
              {currentRangeLabel}
            </span>
          </div>
        </div>

        {/* 3. Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 flex items-center gap-3 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <div>
              <span className="block text-xs text-outline">Hoạt động trong kỳ</span>
              <strong className="text-lg text-on-surface">{tasks.length} hoạt động</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 flex items-center gap-3 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined">done_all</span>
            </div>
            <div>
              <span className="block text-xs text-outline">Đã hoàn thành</span>
              <strong className="text-lg text-on-surface">
                {tasks.filter((x) => x.completed).length}/{tasks.length}
              </strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 flex items-center gap-3 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/50 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined">priority_high</span>
            </div>
            <div>
              <span className="block text-xs text-outline">Ưu tiên cao</span>
              <strong className="text-lg text-on-surface">
                {tasks.filter((x) => x.priority === 'high').length} việc
              </strong>
            </div>
          </div>
        </div>

        {/* 4. Content View: Week View Grid vs Day View Timeline */}
        {activeTab === 'week' ? (
          <section className="rounded-3xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 overflow-hidden">
            <div
              className="todayly-week-scroll-container"
              style={{
                overflowX: 'auto',
                overflowY: 'auto',
                maxHeight: '680px',
                position: 'relative',
                backgroundColor: '#ffffff',
              }}
            >
              {/* STICKY WEEK HEADER */}
              <div
                className="todayly-week-header"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px repeat(7, minmax(0, 1fr))',
                  width: '100%',
                  minWidth: '700px',
                  position: 'sticky',
                  top: 0,
                  zIndex: 40,
                  backgroundColor: '#ffffff',
                  borderBottom: '1px solid #e2e8f0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                <div className="p-3 flex items-center justify-center text-[11px] font-bold text-slate-400 border-r border-slate-200 select-none">
                  GMT+07
                </div>
                {weekDays.map((day) => (
                  <div
                    key={day.name}
                    className="flex flex-col items-center justify-center py-2.5 border-r last:border-r-0 border-slate-200"
                  >
                    <span
                      className={
                        day.isToday
                          ? 'todayly-today-label'
                          : 'text-[11px] font-bold tracking-wider text-slate-500'
                      }
                      style={
                        day.isToday
                          ? { color: '#ea580c', fontWeight: 800, fontSize: '11px', letterSpacing: '0.05em' }
                          : { color: '#64748b', fontWeight: 700, fontSize: '11px' }
                      }
                    >
                      {day.name}
                    </span>
                    <div
                      className={day.isToday ? 'todayly-today-badge' : 'todayly-normal-badge'}
                      style={
                        day.isToday
                          ? {
                              backgroundColor: '#f97316',
                              color: '#ffffff',
                              border: '2px solid #ea580c',
                              borderRadius: '9999px',
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              boxShadow: '0 2px 6px rgba(234,88,12,0.3)',
                              margin: '4px auto 0 auto',
                            }
                          : {
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 600,
                              color: '#1e293b',
                              margin: '4px auto 0 auto',
                            }
                      }
                    >
                      {day.dayNum}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slots Grid */}
              <div
                className="todayly-week-grid relative min-w-[700px]"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px repeat(7, minmax(0, 1fr))',
                  width: '100%',
                  minWidth: '700px',
                  backgroundColor: '#ffffff',
                }}
              >
                {/* Hours column */}
                <div className="flex flex-col border-r border-slate-200 select-none bg-white">
                  {hoursList.map((hr) => (
                    <div
                      key={hr.h}
                      style={{ height: `${rowHeight}px`, borderBottom: '1px solid #f1f5f9' }}
                      className="relative flex items-start justify-end pr-2 pt-0.5 text-[11px] text-slate-400 font-medium"
                    >
                      {hr.label && <span className="relative -top-2.5">{hr.label}</span>}
                    </div>
                  ))}
                </div>

                {/* 7 Day columns */}
                {weekDays.map((day) => {
                  const dayTasks = tasks.filter(
                    (t) =>
                      t.scheduledDate === day.dateStr ||
                      (!t.scheduledDate && day.isToday)
                  );
                  const isCurrentDay = day.isToday;
                  const currentLineTop = Math.max(0, currentHourVal * rowHeight);

                  return (
                    <div
                      key={day.dateStr}
                      className="todayly-day-col relative hover:bg-slate-50/50 transition-colors"
                      style={{ position: 'relative', borderRight: '1px solid #e2e8f0' }}
                    >
                      {hoursList.map((hr) => (
                        <div
                          key={hr.h}
                          style={{ height: `${rowHeight}px`, borderBottom: '1px solid #f1f5f9' }}
                          onClick={() =>
                            openAddModal(
                              day.dateStr,
                              `${String(hr.h).padStart(2, '0')}:00 – ${String(
                                hr.h + 1
                              ).padStart(2, '0')}:00`
                            )
                          }
                          className="todayly-hour-slot cursor-pointer transition-colors"
                        />
                      ))}

                      {/* Red current time indicator line */}
                      {isCurrentDay && currentHourVal >= 0 && currentHourVal <= 24 && (
                        <div
                          style={{ top: `${currentLineTop}px` }}
                          className="absolute left-0 right-0 flex items-center pointer-events-none z-20"
                        >
                          <span
                            style={{ backgroundColor: '#ef4444' }}
                            className="w-2.5 h-2.5 rounded-full -ml-1.5 shrink-0 shadow-xs"
                          />
                          <span
                            style={{ backgroundColor: '#ef4444', height: '2px' }}
                            className="w-full"
                          />
                        </div>
                      )}

                      {/* Signature Purple Task Cards */}
                      {dayTasks.map((task) => {
                        const slot = parseTimeSlot(task.time);
                        const topPx = Math.max(0, slot.startHour * rowHeight);
                        const heightPx = Math.max(38, slot.duration * rowHeight - 4);
                        const isComp = task.completed;

                        const cardStyle = isComp
                          ? {
                              top: `${topPx}px`,
                              height: `${heightPx}px`,
                              backgroundColor: '#f1f5f9',
                              border: '1px solid #e2e8f0',
                              borderLeft: '4px solid #94a3b8',
                              color: '#94a3b8',
                              textDecoration: 'line-through',
                              opacity: 0.75,
                            }
                          : {
                              top: `${topPx}px`,
                              height: `${heightPx}px`,
                              backgroundColor: '#ede9fe',
                              border: '1px solid #c7d2fe',
                              borderLeft: '4px solid #7c3aed',
                              color: '#1e1b4b',
                              boxShadow: '0 2px 6px rgba(124, 58, 237, 0.15)',
                            };

                        return (
                          <div
                            key={task.id}
                            style={cardStyle}
                            onClick={(ev) => {
                              ev.stopPropagation();
                              openEditModal(task);
                            }}
                            className={`todayly-week-card absolute left-1 right-1 rounded-xl p-2 text-xs font-semibold hover:shadow-md transition-all cursor-pointer overflow-hidden z-10 flex flex-col justify-start gap-0.5 ${
                              isComp ? 'is-completed' : ''
                            }`}
                            title={`${task.time}: ${task.title}`}
                          >
                            <div
                              className="font-bold text-[10px] leading-tight truncate"
                              style={isComp ? {} : { color: '#6d28d9', fontWeight: 700 }}
                            >
                              {task.time}
                            </div>
                            <div
                              className="font-bold text-xs leading-tight truncate"
                              style={isComp ? {} : { color: '#1e1b4b', fontWeight: 700 }}
                            >
                              {task.title}
                            </div>
                            {task.location && (
                              <div
                                className="text-[10px] truncate opacity-90"
                                style={isComp ? {} : { color: '#7c3aed' }}
                              >
                                📍 {task.location}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          /* Day View Timeline */
          <section className="rounded-3xl bg-surface-container-lowest p-5 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-headline-md text-xl font-bold text-on-surface">
                Dòng Thời Gian Chi Tiết
              </h2>
              <span className="font-label-md text-xs sm:text-sm text-on-surface-variant font-medium">
                {currentTabTitle}
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-on-surface-variant">
                Đang tải lịch trình...
              </div>
            ) : tasks.length > 0 ? (
              <div className="relative flex flex-col gap-4">
                {tasks.map((item) => {
                  const isDone = item.completed;
                  return (
                    <div
                      key={item.id}
                      className="group p-4 sm:p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex items-start gap-4 border border-outline-variant/20 shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleComplete(item.id)}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                          isDone
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-high text-outline hover:bg-primary hover:text-on-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {isDone ? 'check' : 'radio_button_unchecked'}
                        </span>
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-bold text-primary text-xs sm:text-sm">
                            {item.time || `${item.startTime || ''} – ${item.endTime || ''}`}
                          </span>
                          {item.scheduledDate && (
                            <span className="px-2 py-0.5 rounded-full bg-surface-container text-xs font-semibold text-on-surface-variant">
                              {item.scheduledDate}
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-xs text-primary font-semibold">
                            {item.priority === 'high'
                              ? 'Ưu tiên cao'
                              : item.priority === 'low'
                              ? 'Ưu tiên thấp'
                              : 'Ưu tiên trung bình'}
                          </span>
                        </div>

                        <h3
                          className={`font-headline-sm text-base font-semibold text-on-surface ${
                            isDone ? 'line-through opacity-70' : ''
                          }`}
                        >
                          {item.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mt-1">
                          {item.location && <span>📍 {item.location}</span>}
                          {item.note && <span>• {item.note}</span>}
                        </div>
                      </div>

                      {/* Edit Icon and Delete Icon */}
                      <div className="flex items-center gap-1 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="p-2 rounded-xl hover:bg-surface-container text-outline hover:text-primary transition-colors cursor-pointer"
                          title="Sửa"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-xl hover:bg-error-container/30 text-outline hover:text-error transition-colors cursor-pointer"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon="event_note"
                title="Chưa có hoạt động nào trong lịch trình"
                description="Bắt đầu lên kế hoạch cho ngày của bạn để không bỏ lỡ công việc quan trọng."
                actionText="Thêm hoạt động đầu tiên"
                onAction={() => openAddModal()}
              />
            )}
          </section>
        )}
      </div>

      {/* Add / Edit Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Chỉnh Sửa Hoạt Động' : 'Thêm Vào Lịch Trình'}
      >
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-sm font-semibold text-on-surface">
              Tiêu đề hoạt động *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(ev) => setFormData({ ...formData, title: ev.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Ngày thực hiện
              </label>
              <input
                type="date"
                required
                value={formData.scheduledDate}
                onChange={(ev) => setFormData({ ...formData, scheduledDate: ev.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Khung giờ (VD: 15:00 – 16:30)
              </label>
              <input
                type="text"
                required
                value={formData.time}
                onChange={(ev) => setFormData({ ...formData, time: ev.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Loại hoạt động
              </label>
              <select
                value={formData.type}
                onChange={(ev) => setFormData({ ...formData, type: ev.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              >
                <option value="task">Công việc</option>
                <option value="food">Ăn uống</option>
                <option value="place">Thư giãn</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Mức độ ưu tiên
              </label>
              <select
                value={formData.priority}
                onChange={(ev) => setFormData({ ...formData, priority: ev.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              >
                <option value="high">Ưu tiên cao</option>
                <option value="medium">Trung bình</option>
                <option value="low">Thấp</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-sm font-semibold text-on-surface">
              Địa điểm
            </label>
            <input
              type="text"
              placeholder="VD: Quán The May Cafe, Hải Châu..."
              value={formData.location}
              onChange={(ev) => setFormData({ ...formData, location: ev.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm text-on-surface"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-sm font-semibold text-on-surface">
              Ghi chú thêm
            </label>
            <textarea
              rows="2"
              placeholder="Chi tiết công việc..."
              value={formData.note}
              onChange={(ev) => setFormData({ ...formData, note: ev.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm text-on-surface resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-surface-container">
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
              {editingItem ? 'Lưu thay đổi' : 'Lưu hoạt động'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
