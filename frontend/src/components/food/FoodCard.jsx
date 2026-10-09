import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FoodCard({ food, onSaveFavorite }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onSaveFavorite) onSaveFavorite(food);
  };

  return (
    <div className="group rounded-3xl bg-surface-container-lowest p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 border border-outline-variant/30">
      <div className="flex flex-col gap-3">
        <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-surface-container">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label="Lưu món ăn"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs flex items-center justify-center text-outline hover:text-error transition-colors cursor-pointer shadow-xs"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isSaved ? 'text-error font-filled' : ''
              }`}
            >
              favorite
            </span>
          </button>
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-xs text-xs font-bold text-on-surface flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-amber-500 text-[14px]">
              star
            </span>
            <span>{food.rating}</span>
            <span className="text-outline font-normal">({food.reviewsCount})</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-outline">
            <span className="font-semibold text-secondary uppercase tracking-wider">
              {food.category}
            </span>
            <span>{food.distance}</span>
          </div>

          <h3 className="font-headline-sm text-base font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
            {food.name}
          </h3>

          <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
            {food.description}
          </p>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-surface-container flex items-center justify-between">
        <span className="font-headline-sm text-sm font-bold text-primary">
          {food.priceRange}
        </span>
        <span className="text-xs text-outline flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">schedule</span>
          <span>{food.openHours}</span>
        </span>
      </div>
    </div>
  );
}
