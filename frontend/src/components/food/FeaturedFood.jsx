import React, { useState } from 'react';

export default function FeaturedFood({ food }) {
  const [isSaved, setIsSaved] = useState(false);

  if (!food) return null;

  return (
    <div className="flex flex-col lg:flex-row bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden border border-outline-variant/30">
      <div className="lg:w-1/2 relative min-h-[260px] sm:min-h-[320px]">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-xs font-bold uppercase tracking-wider shadow-sm">
          Gợi ý hàng đầu hôm nay
        </div>
      </div>

      <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs font-bold text-secondary uppercase tracking-wider">
              {food.category} • {food.mealType === 'lunch' ? 'Bữa trưa đặc sản' : 'Món ngon nổi bật'}
            </span>
            <div className="flex items-center gap-1 text-sm font-bold text-on-surface">
              <span className="material-symbols-outlined text-amber-500 text-[18px]">
                star
              </span>
              <span>{food.rating}</span>
              <span className="text-xs text-outline font-normal">({food.reviewsCount} đánh giá)</span>
            </div>
          </div>

          <h2 className="font-headline-lg text-xl sm:text-2xl font-extrabold text-on-surface">
            {food.name}
          </h2>

          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            {food.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {food.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-surface-container text-xs font-medium text-on-surface-variant"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-surface-container">
          <div className="flex flex-col">
            <span className="font-label-sm text-xs text-outline">Mức giá tham khảo</span>
            <span className="font-headline-md text-lg font-bold text-primary">
              {food.priceRange}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                isSaved
                  ? 'border-error text-error bg-error-container/20'
                  : 'border-outline-variant text-outline hover:text-error'
              }`}
              title="Lưu vào danh sách"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isSaved ? 'favorite' : 'favorite_border'}
              </span>
            </button>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(food.address || food.name)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">directions</span>
              <span>Chỉ đường</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
