import React, { useState, useEffect } from 'react';
import { foodService } from '../../services/foodService';
import FoodCard from '../../components/food/FoodCard';
import FeaturedFood from '../../components/food/FeaturedFood';
import EmptyState from '../../components/common/EmptyState';

export default function Food() {
  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSort, setPriceSort] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const data = await foodService.getAll();
        setFoods(data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const featured = foods.find((f) => f.isFeatured) || foods[0];

  const filteredFoods = foods.filter((f) => {
    const matchesCategory =
      activeCategory === 'all' ||
      f.category?.toLowerCase().includes(activeCategory) ||
      f.mealType === activeCategory;
    const matchesSearch =
      !searchTerm ||
      f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.address?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2 border-b border-surface-container">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-md text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">restaurant</span>
              <span>Trụ cột Ẩm thực • Hương vị Đà Thành</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
              Hôm nay ăn gì? 🍜
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Khám phá món ngon theo từng bữa trong ngày, gợi ý đặc sản bản địa và quán xá chuẩn vị.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm bún chả cá, mì quảng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/30 text-sm focus:outline-none focus:border-secondary transition-all"
            />
          </div>
        </div>

        {/* Featured Food Banner */}
        {featured && <FeaturedFood food={featured} />}

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              ['all', 'Tất cả món'],
              ['breakfast', 'Ăn sáng'],
              ['lunch', 'Ăn trưa'],
              ['dinner', 'Ăn tối'],
              ['snack', 'Ăn vặt / Tráng miệng'],
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
            Tìm thấy {filteredFoods.length} quán ngon
          </span>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((f) => (
            <FoodCard key={f.id} food={f} />
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <EmptyState
            icon="restaurant"
            title="Không tìm thấy món ăn phù hợp"
            description="Hãy thử từ khóa tìm kiếm khác hoặc chuyển danh mục bữa ăn."
            actionText="Xem tất cả món"
            onAction={() => {
              setActiveCategory('all');
              setSearchTerm('');
            }}
          />
        )}
      </div>
    </div>
  );
}
