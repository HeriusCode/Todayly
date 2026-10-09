import React, { useState } from 'react';
import { mockFoods } from '../../data/mockFoods';
import { mockDrinks } from '../../data/mockDrinks';
import { mockPlaces } from '../../data/mockPlaces';

export default function Wheel() {
  const [mode, setMode] = useState('food');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);

  const getItemsForMode = () => {
    if (mode === 'food') {
      return (mockFoods || []).slice(0, 8).map((f, i) => ({
        label: f.name.split(' - ')[0],
        item: f,
        color: ['#f87171', '#fb923c', '#facc15', '#4ade80', '#2dd4bf', '#38bdf8', '#818cf8', '#c084fc'][i % 8],
      }));
    }
    if (mode === 'drink') {
      return (mockDrinks || []).slice(0, 6).map((d, i) => ({
        label: d.name.split(' & ')[0],
        item: d,
        color: ['#fb923c', '#facc15', '#4ade80', '#38bdf8', '#818cf8', '#f472b6'][i % 6],
      }));
    }
    return (mockPlaces || []).slice(0, 6).map((p, i) => ({
      label: p.name.split(' - ')[0],
      item: p,
      color: ['#4ade80', '#2dd4bf', '#38bdf8', '#818cf8', '#c084fc', '#f472b6'][i % 6],
    }));
  };

  const segments = getItemsForMode();
  const numSegments = segments.length;
  const anglePerSegment = 360 / numSegments;

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);

    const randomIndex = Math.floor(Math.random() * numSegments);
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetAngle = 360 * extraSpins + (360 - randomIndex * anglePerSegment - anglePerSegment / 2);

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setWinner(segments[randomIndex].item);
    }, 4000);
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8 items-center text-center">
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-semibold w-fit mx-auto">
            <span className="material-symbols-outlined text-[16px]">casino</span>
            <span>Vòng Quay Ngẫu Nhiên • Trị bệnh "Ăn gì cũng được"</span>
          </div>
          <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
            Hôm nay chọn gì? 🎡
          </h1>
          <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
            Phân vân không biết chọn quán nào? Hãy để chiếc vòng quay may mắn quyết định giúp bạn!
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center p-1.5 rounded-full bg-surface-container-low border border-outline-variant/30 shadow-xs max-w-md w-full">
          {[
            ['food', 'Món ăn', 'restaurant'],
            ['drink', 'Thức uống', 'local_cafe'],
            ['place', 'Điểm đến', 'explore'],
          ].map(([key, label, icon]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                if (spinning) return;
                setMode(key);
                setWinner(null);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                mode === key
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Wheel Canvas / SVG */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 my-4">
          {/* Arrow Pointer on Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30 pointer-events-none">
            <div className="w-0 h-0 border-x-8 border-x-transparent border-t-[20px] border-t-red-600 filter drop-shadow-md" />
          </div>

          <div
            className="w-full h-full rounded-full shadow-2xl border-4 border-surface-container-lowest overflow-hidden transition-transform duration-[4000ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <svg viewBox="-100 -100 200 200" className="w-full h-full">
              {segments.map((seg, i) => {
                const startAngle = (i * anglePerSegment * Math.PI) / 180;
                const endAngle = ((i + 1) * anglePerSegment * Math.PI) / 180;
                const x1 = 100 * Math.cos(startAngle);
                const y1 = 100 * Math.sin(startAngle);
                const x2 = 100 * Math.cos(endAngle);
                const y2 = 100 * Math.sin(endAngle);
                const pathData = `M 0 0 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`;

                const midAngle = ((i + 0.5) * anglePerSegment * Math.PI) / 180;
                const textX = 62 * Math.cos(midAngle);
                const textY = 62 * Math.sin(midAngle);
                const textRotate = (i + 0.5) * anglePerSegment;

                return (
                  <g key={i}>
                    <path d={pathData} fill={seg.color} />
                    <text
                      x={textX}
                      y={textY}
                      fill="#ffffff"
                      fontSize="7"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textRotate}, ${textX}, ${textY})`}
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                    >
                      {seg.label.slice(0, 10)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Spin Button */}
          <button
            type="button"
            onClick={spinWheel}
            disabled={spinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-surface-container-lowest shadow-xl border-4 border-primary flex items-center justify-center font-bold text-xs uppercase text-primary hover:scale-105 active:scale-95 transition-transform z-20 cursor-pointer disabled:opacity-70"
          >
            {spinning ? 'Đang quay...' : 'QUAY!'}
          </button>
        </div>

        {/* Winner Announcement Card */}
        {winner && (
          <div className="w-full max-w-md p-6 rounded-3xl bg-surface-container-lowest border border-primary/30 shadow-lg flex flex-col gap-3 items-center animate-fade-in">
            <span className="text-xs uppercase font-bold text-secondary tracking-widest">
              🎉 Kết quả được chọn
            </span>
            <h3 className="font-headline-lg text-xl font-extrabold text-on-surface">
              {winner.name}
            </h3>
            {winner.address && (
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                <span>{winner.address}</span>
              </p>
            )}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={spinWheel}
                className="px-4 py-2 rounded-full border border-outline-variant font-label-md text-xs font-semibold hover:bg-surface-container transition-colors cursor-pointer"
              >
                Quay lại
              </button>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(winner.address || winner.name)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-bold shadow-xs hover:bg-primary-container transition-all cursor-pointer"
              >
                Đến địa điểm này ngay
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
