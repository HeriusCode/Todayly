import React from 'react';

export default function QuickStats({
  stats = {
    activeHours: '7.5 giờ',
    estimatedCost: '~180.000đ',
    targetSteps: '6.200 bước',
  }
}) {
  return (
    <div className="w-full rounded-2xl bg-surface-container-high p-5 lg:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/20 shadow-xs">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[24px]">insights</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-sm font-bold text-on-surface">
            Tóm tắt mục tiêu ngày
          </span>
          <span className="font-body-sm text-xs text-on-surface-variant">
            Lịch trình cân đối giữa làm việc và nạp năng lượng
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex flex-col">
          <span className="font-label-sm text-xs text-outline">Thời gian hoạt động</span>
          <span className="font-headline-sm text-base text-on-surface font-bold">
            {stats.activeHours}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-xs text-outline">Chi phí ước tính</span>
          <span className="font-headline-sm text-base text-secondary font-bold">
            {stats.estimatedCost}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-xs text-outline">Vận động mục tiêu</span>
          <span className="font-headline-sm text-base text-tertiary font-bold">
            {stats.targetSteps}
          </span>
        </div>
      </div>
    </div>
  );
}
