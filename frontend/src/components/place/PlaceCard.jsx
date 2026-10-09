import React from 'react';

export default function PlaceCard({ place, isSaved, onToggleSave }) {
  return (
    <div className="rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group border border-outline-variant/30">
      <div className="flex flex-col gap-4">
        <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-surface-container shadow-xs">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/70 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleSave && onToggleSave(place.id)}
              className="w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-outline hover:text-error transition-colors cursor-pointer shadow-xs"
              title="Lưu điểm hẹn"
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isSaved ? 'text-error font-filled' : ''
                }`}
              >
                {isSaved ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface font-semibold shadow-xs">
              {place.category}
            </span>
            <div className="flex items-center gap-1 bg-surface-container-lowest/80 backdrop-blur-md text-on-surface px-2.5 py-1 rounded-full font-bold shadow-xs">
              <span className="material-symbols-outlined text-amber-500 text-[14px]">star</span>
              <span>{place.rating}</span>
              <span className="text-outline font-normal">({place.reviewsCount})</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-outline">
            <span>{place.distance}</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>{place.openHours}</span>
            </span>
          </div>

          <h3 className="font-headline-sm text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
            {place.name}
          </h3>

          <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
            {place.description}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {place.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-surface-container text-xs text-outline font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-container">
        <span className="font-body-sm text-xs text-outline truncate max-w-[200px]">
          {place.address}
        </span>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(place.address || place.name)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          <span>Bản đồ</span>
          <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </a>
      </div>
    </div>
  );
}
