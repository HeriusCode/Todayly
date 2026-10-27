import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { foodService } from '../../services/foodService';
import { mockPlaces } from '../../data/mockPlaces';
import { mockDrinks } from '../../data/mockDrinks';

export default function Detail() {
  const { type, id } = useParams();
  const [foodResource, setFoodResource] = useState({ id: null, item: null });
  const staticItem = type === 'places' || type === 'place'
    ? (mockPlaces || []).find((place) => place.id === id)
    : (mockDrinks || []).find((drink) => drink.id === id);
  const item = type === 'food' ? foodResource.item : staticItem;
  const loading = type === 'food' && foodResource.id !== id;

  useEffect(() => {
    let active = true;
    if (type === 'food') {
      foodService.getById(id)
        .then((data) => { if (active) setFoodResource({ id, item: data }); })
        .catch(() => { if (active) setFoodResource({ id, item: null }); });
    }
    return () => { active = false; };
  }, [id, type]);

  if (loading) {
    return <div className="w-full max-w-4xl mx-auto px-gutter py-16 text-center text-on-surface-variant">Đang tải dữ liệu quán ăn…</div>;
  }

  if (!item) {
    return (
      <div className="w-full max-w-4xl mx-auto px-gutter py-16 text-center">
        <h2 className="text-xl font-bold text-on-surface mb-2">Không tìm thấy thông tin</h2>
        <p className="text-sm text-on-surface-variant mb-6">Mục bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/" className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto px-gutter py-8 flex flex-col gap-6">
        <Link to={-1} className="flex items-center gap-1 text-sm font-semibold text-outline hover:text-primary w-fit">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Quay lại</span>
        </Link>

        <div className="rounded-3xl bg-surface-container-lowest overflow-hidden shadow-sm border border-outline-variant/30">
          <div className="relative w-full h-72 sm:h-96">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-xs font-bold text-primary shadow-xs">
              {item.category}
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">Chi tiết</span>
                {item.rating && (
                  <div className="flex items-center gap-1 text-sm font-bold text-on-surface">
                    <span className="material-symbols-outlined text-amber-500 text-[18px]">star</span>
                    <span>{item.rating}</span>
                  </div>
                )}
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface">
                {item.name}
              </h1>
              {item.address && (
                <p className="text-sm text-outline flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  <span>{item.address}</span>
                </p>
              )}
            </div>

            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {item.description}
            </p>

            <div className="pt-4 border-t border-surface-container flex items-center justify-between">
              {item.priceRange && (
                <div>
                  <span className="text-xs text-outline block">Mức giá:</span>
                  <span className="text-lg font-bold text-primary">{item.priceRange}</span>
                </div>
              )}
              {item.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(item.address || item.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all"
                >
                  Mở bản đồ chỉ đường
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
