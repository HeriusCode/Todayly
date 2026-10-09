import React, { useState, useEffect } from 'react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(2);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setSessionsCompleted((prev) => prev + 1);
      alert('🎉 Chúc mừng! Bạn đã hoàn thành 1 phiên Pomodoro tập trung.');
      setTimeLeft(1500);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = ((1500 - timeLeft) / 1500) * 100;

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-secondary-fixed/50 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">timer</span>
          </div>
          <span className="font-headline-sm text-base text-on-surface font-bold">
            Pomodoro Tập Trung
          </span>
        </div>
        <span className="font-label-sm text-xs px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
          {sessionsCompleted} phiên hôm nay
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-4 relative">
        <div className="text-5xl font-extrabold tracking-tight text-on-surface font-mono">
          {formattedTime}
        </div>
        <span className="font-label-md text-xs sm:text-sm text-on-surface-variant mt-1">
          {isRunning ? 'Đang tập trung sâu... 🎧' : 'Sẵn sàng cho phiên mới ✨'}
        </span>
        <div className="w-48 h-2 rounded-full bg-surface-container-high mt-4 overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={toggleTimer}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-label-md text-sm font-semibold transition-all shadow-sm cursor-pointer ${
            isRunning
              ? 'bg-secondary-container text-on-secondary hover:bg-secondary'
              : 'bg-primary text-on-primary hover:bg-primary-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isRunning ? 'pause' : 'play_arrow'}
          </span>
          <span>{isRunning ? 'Tạm dừng' : 'Bắt đầu 25p'}</span>
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="p-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
          title="Đặt lại"
        >
          <span className="material-symbols-outlined text-[18px]">replay</span>
        </button>
      </div>
    </div>
  );
}
