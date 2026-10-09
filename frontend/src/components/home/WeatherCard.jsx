import React from 'react';

export default function WeatherCard({
  weather = {
    date: 'Thứ Năm, 24 Tháng 10, 2024',
    location: 'Đà Nẵng, Việt Nam',
    temp: '29°C',
    condition: 'Trời nắng nhẹ, gió mát ven biển 🌤️',
    humidity: '68% Dễ chịu',
    airQuality: 'Tốt (AQI 32)'
  }
}) {
  return (
    <div className="rounded-2xl bg-surface-container-low p-5 sm:p-6 flex flex-col gap-4 shadow-sm border border-outline-variant/20">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-sm text-xs text-outline">{weather.date}</span>
          <h3 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
            <span>{weather.location}</span>
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-xs font-semibold text-secondary">
          Thời tiết lý tưởng
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-surface-container">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed/50 text-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">sunny</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display-lg text-3xl font-extrabold text-on-surface">
              {weather.temp}
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant">
              {weather.condition}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end text-right font-body-sm text-xs text-outline gap-1">
          <span>Độ ẩm: <strong className="text-on-surface">{weather.humidity}</strong></span>
          <span>Không khí: <strong className="text-primary">{weather.airQuality}</strong></span>
        </div>
      </div>
    </div>
  );
}
