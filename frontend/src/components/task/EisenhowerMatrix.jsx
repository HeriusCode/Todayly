import React from 'react';

export default function EisenhowerMatrix({ tasks = [] }) {
  const q1 = tasks.filter((t) => t.matrixQuadrant === 'important_urgent');
  const q2 = tasks.filter((t) => t.matrixQuadrant === 'important_not_urgent');
  const q3 = tasks.filter((t) => t.matrixQuadrant === 'not_important_urgent');
  const q4 = tasks.filter((t) => t.matrixQuadrant === 'not_important_not_urgent');

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </div>
          <h2 className="font-headline-sm text-base text-on-surface font-bold">
            Ma Trận Eisenhower
          </h2>
        </div>
        <span className="font-label-sm text-xs text-on-surface-variant font-medium">
          Ưu tiên thông minh
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Q1: Urgent & Important */}
        <div className="p-4 rounded-2xl bg-error-container/20 border border-error/20 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-error font-bold uppercase tracking-wider">
              Khẩn cấp & Quan trọng
            </span>
            <span className="w-5 h-5 rounded-full bg-error text-white font-bold text-xs flex items-center justify-center">
              {q1.length}
            </span>
          </div>
          <p className="font-label-sm text-xs text-on-surface-variant">Làm ngay hôm nay</p>
          <div className="flex flex-col gap-1.5 mt-1">
            {q1.map((t) => (
              <div
                key={t.id}
                className="p-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-xs truncate shadow-2xs"
              >
                🔴 {t.title}
              </div>
            ))}
            {q1.length === 0 && (
              <span className="text-outline font-body-sm text-xs italic">
                Không có việc khẩn cấp
              </span>
            )}
          </div>
        </div>

        {/* Q2: Important & Not Urgent */}
        <div className="p-4 rounded-2xl bg-primary-fixed/30 border border-primary/20 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-primary font-bold uppercase tracking-wider">
              Quan trọng • Không khẩn
            </span>
            <span className="w-5 h-5 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center">
              {q2.length}
            </span>
          </div>
          <p className="font-label-sm text-xs text-on-surface-variant">Lên kế hoạch tập trung</p>
          <div className="flex flex-col gap-1.5 mt-1">
            {q2.map((t) => (
              <div
                key={t.id}
                className="p-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-xs truncate shadow-2xs"
              >
                🔵 {t.title}
              </div>
            ))}
            {q2.length === 0 && (
              <span className="text-outline font-body-sm text-xs italic">
                Không có việc trong mục này
              </span>
            )}
          </div>
        </div>

        {/* Q3: Urgent & Not Important */}
        <div className="p-4 rounded-2xl bg-secondary-fixed/40 border border-secondary/20 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-wider">
              Khẩn cấp • Ít quan trọng
            </span>
            <span className="w-5 h-5 rounded-full bg-secondary text-white font-bold text-xs flex items-center justify-center">
              {q3.length}
            </span>
          </div>
          <p className="font-label-sm text-xs text-on-surface-variant">Giải quyết nhanh</p>
          <div className="flex flex-col gap-1.5 mt-1">
            {q3.map((t) => (
              <div
                key={t.id}
                className="p-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-xs truncate shadow-2xs"
              >
                🟠 {t.title}
              </div>
            ))}
            {q3.length === 0 && (
              <span className="text-outline font-body-sm text-xs italic">Trống</span>
            )}
          </div>
        </div>

        {/* Q4: Not Urgent & Not Important */}
        <div className="p-4 rounded-2xl bg-tertiary-fixed/30 border border-tertiary/20 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-tertiary font-bold uppercase tracking-wider">
              Không khẩn • Ít quan trọng
            </span>
            <span className="w-5 h-5 rounded-full bg-tertiary text-white font-bold text-xs flex items-center justify-center">
              {q4.length}
            </span>
          </div>
          <p className="font-label-sm text-xs text-on-surface-variant">Thư giãn hoặc loại bỏ</p>
          <div className="flex flex-col gap-1.5 mt-1">
            {q4.map((t) => (
              <div
                key={t.id}
                className="p-2 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-xs truncate shadow-2xs"
              >
                🟢 {t.title}
              </div>
            ))}
            {q4.length === 0 && (
              <span className="text-outline font-body-sm text-xs italic">Trống</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
