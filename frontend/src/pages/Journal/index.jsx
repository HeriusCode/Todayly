import React, { useState } from 'react';

export default function Journal() {
  const [selectedMood, setSelectedMood] = useState('tuyet_voi');
  const [energyLevel, setEnergyLevel] = useState(85);
  const [reflection, setReflection] = useState(
    'Hôm nay thời tiết Đà Nẵng thật đẹp, mình đã hoàn thành được 3 phiên Pomodoro tập trung và có một buổi chiều thảnh thơi.'
  );
  const [isSaved, setIsSaved] = useState(false);

  const moods = [
    { id: 'tuyet_voi', label: 'Tuyệt vời', emoji: '🌟' },
    { id: 'tot', label: 'Hài lòng', emoji: '😊' },
    { id: 'binh_thuong', label: 'Bình thường', emoji: '😐' },
    { id: 'cang_thang', label: 'Cần nạp lại pin', emoji: '🔋' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-2 pb-2 border-b border-surface-container">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-semibold w-fit">
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            <span>Ghi Lại Khoảnh Khắc</span>
          </div>
          <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
            Nhật Ký Cảm Xúc 📖
          </h1>
          <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
            Dành 3 phút cuối ngày để lắng nghe cảm xúc bản thân và nuôi dưỡng lòng biết ơn.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <label className="font-headline-sm text-sm font-bold text-on-surface">
              Tâm trạng chủ đạo hôm nay:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMood(m.id)}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                    selectedMood === m.id
                      ? 'border-primary bg-primary-fixed/30 ring-2 ring-primary/20 scale-102'
                      : 'border-outline-variant/30 bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <span className="text-2xl">{m.emoji}</span>
                  <span className="font-label-md text-xs font-semibold text-on-surface">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-headline-sm text-sm font-bold text-on-surface">
                Mức năng lượng cơ thể:
              </label>
              <span className="font-headline-sm text-sm font-bold text-primary">
                {energyLevel}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-headline-sm text-sm font-bold text-on-surface">
              Điều bạn cảm thấy biết ơn hoặc điều đáng nhớ trong ngày:
            </label>
            <textarea
              rows="5"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Hôm nay có điều gì làm bạn mỉm cười?..."
              className="w-full p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-surface-container">
            {isSaved ? (
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Đã lưu nhật ký thành công!
              </span>
            ) : (
              <span className="text-xs text-outline">
                Lưu trữ an toàn trên thiết bị của bạn
              </span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold shadow-xs transition-all cursor-pointer"
            >
              Lưu nhật ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
