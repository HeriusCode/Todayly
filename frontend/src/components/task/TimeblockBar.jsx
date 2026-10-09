import React from 'react';

export default function TimeblockBar() {
  return (
    <section className="w-full">
      <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-xs border border-outline-variant/20 flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              view_timeline
            </span>
            <h2 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
              Dòng Chảy Thời Gian (08:30 — 18:00)
            </h2>
            <span className="font-label-sm text-xs px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-medium">
              Nhịp sinh học êm dịu
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-label-sm text-on-surface-variant flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-primary" />
              Tập trung sâu
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-surface-variant" />
              Họp & Trao đổi
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-secondary-fixed" />
              Khoảng nghỉ / Ăn trưa
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-tertiary-fixed" />
              Việc nhẹ & Đọc
            </span>
          </div>
        </div>

        <div className="w-full h-8 bg-surface-container-low rounded-xl overflow-hidden flex p-1 gap-1 relative shadow-inner">
          <div
            className="h-full rounded-lg bg-secondary-fixed/70 text-on-secondary-fixed flex items-center justify-center font-label-sm text-xs px-2 truncate cursor-pointer hover:opacity-90"
            style={{ width: '8%' }}
            title="08:30 - 09:00: Cà phê & Khởi động ngày"
          >
            ☕ Khởi động
          </div>
          <div
            className="h-full rounded-lg bg-primary text-on-primary flex items-center justify-center font-label-sm text-xs px-2 truncate font-semibold shadow-xs cursor-pointer hover:bg-primary-container transition-colors"
            style={{ width: '25%' }}
            title="09:00 - 10:30: Deep Work (3 Pomo)"
          >
            ⚡ Deep Work (3 Pomo)
          </div>
          <div
            className="h-full rounded-lg bg-tertiary-fixed/60 text-on-tertiary-fixed-variant flex items-center justify-center font-label-sm text-xs px-1 cursor-pointer"
            style={{ width: '5%' }}
            title="10:30 - 10:45: Nghỉ giải lao 15p"
          >
            🌿
          </div>
          <div
            className="h-full rounded-lg bg-surface-container-highest text-primary font-semibold flex items-center justify-center font-label-sm text-xs px-2 truncate cursor-pointer"
            style={{ width: '14%' }}
            title="10:45 - 11:30: Review thiết kế Frontend"
          >
            🎨 Review Figma
          </div>
          <div
            className="h-full rounded-lg bg-secondary-fixed-dim/80 text-on-secondary-fixed flex items-center justify-center font-label-sm text-xs px-2 truncate font-bold cursor-pointer"
            style={{ width: '20%' }}
            title="11:30 - 13:00: KHOẢNG TRỐNG THẢNH THƠI (Bún Chả Cá & Nghỉ trưa)"
          >
            🍜 1h30m Trống: Bún Chả Cá
          </div>
          <div
            className="h-full rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center font-label-sm text-xs px-1 cursor-pointer"
            style={{ width: '6%' }}
            title="13:00 - 13:30: Khởi động đầu giờ chiều"
          >
            ⚡
          </div>
          <div
            className="h-full rounded-lg bg-primary/80 text-on-primary flex items-center justify-center font-label-sm text-xs px-2 truncate cursor-pointer"
            style={{ width: '22%' }}
            title="13:30 - 16:00: Code Backend & Database"
          >
            💻 Code API Backend
          </div>
        </div>
      </div>
    </section>
  );
}
