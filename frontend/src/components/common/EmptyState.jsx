import React from 'react';

export default function EmptyState({ icon = 'inbox', title = 'Chưa có dữ liệu', description = 'Hãy thêm mới để bắt đầu quản lý.', actionText, onAction }) {
  return (
    <div className="py-12 px-4 flex flex-col items-center justify-center text-center gap-3 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/40">
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline mb-1">
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <h4 className="font-headline-sm text-base font-bold text-on-surface">{title}</h4>
      <p className="font-body-sm text-sm text-on-surface-variant max-w-sm">{description}</p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-xs"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
