import React, { useState } from 'react';
import { mockDrinks } from '../../data/mockDrinks';
import EmptyState from '../../components/common/EmptyState';

export default function Drinks() {
  const [drinks, setDrinks] = useState(mockDrinks || []);
  const [activeCategory, setActiveCategory] = useState('all');
  const [waterMl, setWaterMl] = useState(1250);
  const targetWaterMl = 2000;

  const addWater = (amount) => {
    setWaterMl((prev) => Math.min(targetWaterMl, prev + amount));
  };

  const waterPercent = Math.min(100, Math.round((waterMl / targetWaterMl) * 100));

  const filteredDrinks = drinks.filter((d) => {
    if (activeCategory === 'coffee') return d.drinkType === 'coffee' || d.category?.includes('cà phê');
    if (activeCategory === 'tea') return d.drinkType === 'tea' || d.category?.includes('trà');
    if (activeCategory === 'juice') return d.drinkType === 'juice' || d.category?.includes('nước ép');
    return true;
  });

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2 border-b border-surface-container">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-md text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">local_cafe</span>
              <span>Trụ cột Đồ uống • Nạp năng lượng & Giải khát</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
              Hôm nay uống gì? ☕
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Theo dõi lượng nước nạp vào cơ thể và khám phá quán cà phê, tiệm trà thanh mát.
            </p>
          </div>
        </div>

        {/* Water Tracker Widget */}
        <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-fixed/50 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">water_drop</span>
            </div>
            <div>
              <span className="font-label-sm text-xs text-outline uppercase font-bold tracking-wider">
                Theo dõi nước uống hôm nay
              </span>
              <h3 className="font-headline-lg text-2xl font-extrabold text-on-surface">
                {waterMl} / {targetWaterMl} ml ({waterPercent}%)
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Cơ thể cần đủ nước để giữ sự tập trung và sảng khoái dưới nắng 29°C.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="w-full sm:w-48 h-3 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 rounded-full"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => addWater(250)}
                className="px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                +250ml
              </button>
              <button
                type="button"
                onClick={() => addWater(500)}
                className="px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                +500ml
              </button>
            </div>
          </div>
        </div>

        {/* Drinks Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              ['all', 'Tất cả thức uống'],
              ['coffee', 'Cà phê tỉnh táo'],
              ['tea', 'Trà hoa & Trái cây'],
              ['juice', 'Nước ép & Sinh tố'],
            ].map(([cat, label]) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-secondary text-on-secondary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <span className="text-xs text-outline font-medium">
            {filteredDrinks.length} đồ uống gợi ý
          </span>
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrinks.map((d) => (
            <div
              key={d.id}
              className="group rounded-3xl bg-surface-container-lowest p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 border border-outline-variant/30"
            >
              <div className="flex flex-col gap-3">
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-surface-container">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs text-xs font-bold text-on-surface flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-amber-500 text-[14px]">
                      star
                    </span>
                    <span>{d.rating}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-xs font-semibold text-secondary uppercase tracking-wider">
                    {d.category}
                  </span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {d.name}
                  </h3>
                  <p className="text-xs text-outline font-medium">
                    {d.storeName}
                  </p>
                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-1">
                    {d.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-surface-container flex items-center justify-between">
                <span className="font-headline-sm text-sm font-bold text-primary">
                  {d.priceRange}
                </span>
                <span className="text-xs text-outline font-medium">
                  {d.distance}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredDrinks.length === 0 && (
          <EmptyState
            icon="local_cafe"
            title="Chưa có thức uống trong danh mục này"
            description="Hãy thử chọn danh mục khác để xem gợi ý."
            actionText="Xem tất cả đồ uống"
            onAction={() => setActiveCategory('all')}
          />
        )}
      </div>
    </div>
  );
}
