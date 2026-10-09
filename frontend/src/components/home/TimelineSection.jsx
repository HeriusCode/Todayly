import React, { useState } from 'react';

export default function TimelineSection({ onOpenAddModal, initialTimeline = [] }) {
  const defaultItems = [
    {
      id: 'item-1',
      time: '08:00 – 09:30',
      title: 'Học lập trình React & Tailwind CSS',
      location: 'Bàn làm việc tại nhà',
      note: 'Hoàn thành 3 phiên Pomodoro tập trung',
      type: 'task',
      badge: 'Công việc',
      status: 'completed',
    },
    {
      id: 'item-2',
      time: '11:30 – 12:30',
      title: 'Thưởng thức Bún Chả Cá Bà Phiến',
      location: '63 Lê Hồng Phong, Hải Châu',
      note: 'Bữa trưa đặc sản nạp lại năng lượng',
      type: 'food',
      badge: 'Ăn trưa',
      status: 'upcoming',
    },
    {
      id: 'item-3',
      time: '15:00 – 16:30',
      title: 'Họp tiến độ dự án Todayly',
      location: 'Online qua Google Meet',
      note: 'Thống nhất giao diện và kiểm thử tính năng',
      type: 'task',
      badge: 'Quan trọng',
      status: 'upcoming',
    },
    {
      id: 'item-4',
      time: '17:30 – 18:30',
      title: 'Dạo mát & ngắm hoàng hôn Bãi biển Mỹ Khê',
      location: 'Đường Võ Nguyên Giáp, Sơn Trà',
      note: 'Vận động 6.000 bước & thư giãn tinh thần',
      type: 'place',
      badge: 'Thư giãn',
      status: 'upcoming',
    },
  ];

  const [timeline, setTimeline] = useState(
    initialTimeline.length > 0 ? initialTimeline : defaultItems
  );
  const [activeTab, setActiveTab] = useState('today');

  const handleToggle = (id) => {
    setTimeline((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'completed' ? 'upcoming' : 'completed' }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setTimeline((prev) => prev.filter((item) => item.id !== id));
  };

  const getBadgeStyle = (item) => {
    if (item.status === 'completed') return 'bg-surface-container text-tertiary';
    if (item.type === 'food') return 'bg-secondary-fixed/50 text-secondary';
    if (item.type === 'place') return 'bg-tertiary-fixed/60 text-tertiary';
    return 'bg-surface-container text-primary';
  };

  const getDotStyle = (item) => {
    if (item.status === 'completed') return 'bg-primary-container ring-surface-container-lowest';
    if (item.type === 'food') return 'bg-secondary-container ring-surface-container-lowest';
    if (item.type === 'place') return 'bg-tertiary-container ring-surface-container-lowest';
    return 'bg-primary ring-surface-container-lowest';
  };

  return (
    <div className="w-full rounded-3xl bg-surface-container-lowest p-6 sm:p-8 lg:p-10 shadow-sm border border-outline-variant/30 flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-lg text-xl sm:text-2xl text-on-surface font-bold">
              Lịch trình hôm nay
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-semibold">
              {timeline.length} hoạt động
            </span>
          </div>
          <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
            Dòng thời gian đồng bộ từ thói quen sinh hoạt và thời tiết địa phương.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-full bg-surface-container-low border border-outline-variant/20">
            <button
              type="button"
              onClick={() => setActiveTab('today')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'today'
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tomorrow')}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'tomorrow'
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Ngày mai
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">Thêm hoạt động</span>
          </button>
        </div>
      </div>

      <div className="relative flex flex-col gap-6 pl-4 sm:pl-8 before:absolute before:left-4 sm:before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-surface-container-high">
        {timeline.map((item) => {
          const isDone = item.status === 'completed';
          return (
            <div
              key={item.id}
              className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl shadow-xs -ml-4 sm:-ml-8 pl-10 sm:pl-14 transition-all hover:shadow-md group border border-outline-variant/20 ${
                isDone ? 'bg-surface-container-low/70' : 'bg-surface-container-lowest'
              }`}
            >
              <div
                className={`absolute left-2.5 sm:left-6 top-6 sm:top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-4 flex items-center justify-center ${getDotStyle(
                  item
                )}`}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div className="flex items-start sm:items-center gap-4 flex-1">
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
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

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-label-md text-xs sm:text-sm font-bold ${
                        item.type === 'food'
                          ? 'text-secondary'
                          : item.type === 'place'
                          ? 'text-tertiary'
                          : 'text-primary'
                      }`}
                    >
                      {item.time}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-xs font-semibold ${getBadgeStyle(
                        item
                      )}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h4
                    className={`font-headline-sm text-base text-on-surface font-semibold ${
                      isDone ? 'line-through opacity-70' : ''
                    }`}
                  >
                    {item.title}
                  </h4>
                  <span className="font-body-sm text-xs text-on-surface-variant">
                    {item.location} • {item.note}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-full hover:bg-error-container/30 text-outline hover:text-error transition-colors cursor-pointer"
                  title="Xóa"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant font-body-sm text-xs sm:text-sm border-t border-surface-container">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
          <span>Khoảng trống tự do: 12:30 - 14:00 (Nghỉ trưa 90 phút)</span>
        </div>
        <button
          type="button"
          onClick={() =>
            alert('Đã tự động tối ưu hóa lịch trình hôm nay theo nhịp sinh học!')
          }
          className="hover:text-primary transition-colors flex items-center gap-1 font-label-md text-xs sm:text-sm cursor-pointer"
        >
          <span>Tự động sắp xếp lại lịch trình</span>
          <span className="material-symbols-outlined text-[16px]">sync</span>
        </button>
      </div>
    </div>
  );
}
