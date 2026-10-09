import React, { useState } from 'react';

export default function MoodBar() {
  const [selectedMood, setSelectedMood] = useState('vui');

  const moods = [
    { id: 'vui', label: 'Vui vẻ', emoji: '😊' },
    { id: 'binh_yen', label: 'Bình yên', emoji: '🌿' },
    { id: 'nang_luong', label: 'Đầy năng lượng', emoji: '⚡' },
    { id: 'met_moi', label: 'Cần nghỉ ngơi', emoji: '☕' },
    { id: 'dong_luc', label: 'Cần động lực', emoji: '🔥' },
  ];

  return (
    <div className="w-full rounded-2xl bg-surface-container-lowest p-4 sm:p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[22px]">sentiment_satisfied</span>
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-sm font-bold text-on-surface">
            Hôm nay bạn cảm thấy thế nào?
          </span>
          <span className="font-body-sm text-xs text-on-surface-variant">
            Lịch trình sẽ linh hoạt điều chỉnh theo tâm trạng của bạn
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {moods.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedMood(m.id)}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-primary text-on-primary shadow-xs ring-2 ring-primary/20 scale-105'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
