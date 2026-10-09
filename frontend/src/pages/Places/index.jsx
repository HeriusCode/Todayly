import React, { useState, useEffect } from 'react';
import { placeService } from '../../services/placeService';
import PlaceCard from '../../components/place/PlaceCard';
import EmptyState from '../../components/common/EmptyState';

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedPlaces, setSavedPlaces] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await placeService.getAll();
        setPlaces(data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleToggleSave = (id) => {
    setSavedPlaces((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPlaces = places.filter((p) => {
    if (activeCategory === 'work')
      return p.category?.includes('làm việc') || p.tags?.includes('Yên tĩnh');
    if (activeCategory === 'nature')
      return p.category?.includes('Dạo mát') || p.tags?.includes('Thiên nhiên') || p.tags?.includes('Gió biển');
    if (activeCategory === 'photo')
      return p.tags?.includes('Check-in') || p.tags?.includes('Kiến trúc');
    return true;
  });

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2 border-b border-surface-container">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-md text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">explore</span>
              <span>Trụ cột Điểm hẹn • Không gian thư giãn & làm việc</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
              Hôm nay đi đâu? 🌿
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Khám phá quán cà phê làm việc yên tĩnh, góc dạo mát hoàng hôn biển hay không gian kết nối bạn bè.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-surface-container-low border border-outline-variant/20">
            {[
              ['all', 'Tất cả điểm đến'],
              ['work', 'Làm việc yên tĩnh'],
              ['nature', 'Dạo mát & Thiên nhiên'],
              ['photo', 'Check-in sống ảo'],
            ].map(([cat, label]) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-label-md text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-tertiary text-on-tertiary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isSaved={!!savedPlaces[place.id]}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <EmptyState
            icon="explore"
            title="Chưa có điểm hẹn trong mục này"
            description="Hãy thử chọn danh mục khác để khám phá thêm địa điểm thú vị."
            actionText="Xem tất cả địa điểm"
            onAction={() => setActiveCategory('all')}
          />
        )}
      </div>
    </div>
  );
}
