import React from 'react';

export default function OutfitCard({ outfit, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between gap-4 border ${
        isSelected
          ? 'bg-surface-container-lowest border-primary shadow-md ring-2 ring-primary/20'
          : 'bg-surface-container-lowest border-outline-variant/30 hover:border-outline-variant'
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-xs px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-semibold">
            {outfit.items?.length || 4} món đồ
          </span>
          {isSelected && (
            <span className="material-symbols-outlined text-primary text-[20px]">
              check_circle
            </span>
          )}
        </div>
        <h4 className="font-headline-sm text-base text-on-surface font-bold">
          {outfit.styleName}
        </h4>
        <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
          {outfit.suitableFor}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-surface-container">
        {outfit.colorPalette?.map((color, idx) => (
          <span
            key={idx}
            className="w-5 h-5 rounded-full border border-outline-variant/40 shadow-2xs"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="font-label-sm text-xs text-outline ml-auto">
          {isSelected ? 'Đang chọn' : 'Bấm để xem'}
        </span>
      </div>
    </div>
  );
}
