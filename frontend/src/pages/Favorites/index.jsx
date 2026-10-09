import React, { useState } from 'react';
import { mockFoods } from '../../data/mockFoods';
import { mockDrinks } from '../../data/mockDrinks';
import { mockPlaces } from '../../data/mockPlaces';
import FoodCard from '../../components/food/FoodCard';
import PlaceCard from '../../components/place/PlaceCard';
import EmptyState from '../../components/common/EmptyState';

export default function Favorites() {
  const [activeTab, setActiveTab] = useState('all');

  const savedFoods = (mockFoods || []).slice(0, 2);
  const savedPlaces = (mockPlaces || []).slice(0, 2);
  const savedDrinks = (mockDrinks || []).slice(0, 1);

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2 border-b border-surface-container">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/30 text-error font-label-md text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">favorite</span>
              <span>Bộ Sưu Tập Của Bạn</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
              Danh Sách Yêu Thích ❤️
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Tất cả món ngon, quán cafe, điểm đến và phong cách bạn đã lưu lại để trải nghiệm.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-surface-container-low border border-outline-variant/20">
            {[
              ['all', 'Tất cả'],
              ['food', 'Món ăn'],
              ['drinks', 'Thức uống'],
              ['places', 'Điểm đến'],
            ].map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {(activeTab === 'all' || activeTab === 'food') && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">restaurant</span>
              <h2 className="font-headline-md text-xl font-bold text-on-surface">Món Ăn Đã Lưu</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedFoods.map((f) => (
                <FoodCard key={f.id} food={f} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'places') && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[22px]">explore</span>
              <h2 className="font-headline-md text-xl font-bold text-on-surface">Điểm Hẹn Đã Lưu</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPlaces.map((p) => (
                <PlaceCard key={p.id} place={p} isSaved={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
