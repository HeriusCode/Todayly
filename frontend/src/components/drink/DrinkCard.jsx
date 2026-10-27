import { useState } from 'react';
import { Bookmark, Clock3, MapPin, Star } from 'lucide-react';

export default function DrinkCard({ drink, saved, onSave, onOpenDetail }) {
  const [imgSrc, setImgSrc] = useState(drink.image);
  const displayName = drink.storeName || drink.name;

  return (
    <article
      className="drink-card"
      style={{ cursor: onOpenDetail ? 'pointer' : 'default' }}
      onClick={() => onOpenDetail?.(drink)}
    >
      <div className="drink-card-media">
        <img
          src={imgSrc || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'}
          alt={displayName}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80')}
        />
        <span className="drink-card-category">{drink.category || 'Quán nước'}</span>
        <button
          type="button"
          className={saved ? 'saved' : ''}
          aria-label={saved ? 'Bỏ lưu quán' : 'Lưu quán'}
          onClick={(e) => {
            e.stopPropagation();
            onSave(drink.id);
          }}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="drink-card-body">
        <div className="drink-card-meta">
          <span>
            <Star size={14} fill={drink.rating ? 'currentColor' : 'none'} />{' '}
            {drink.rating ? drink.rating : '4.8★'}
            {drink.reviewsCount ? <small> ({drink.reviewsCount})</small> : null}
          </span>
          <span><MapPin size={14} /> {drink.distance || 'Gần đây'}</span>
        </div>

        {/* Tên quán màu đen, nổi bật và to hơn 1 tí */}
        <h3 style={{ color: '#0b1c30', fontSize: '18px', fontWeight: 800, margin: '6px 0 4px', lineHeight: 1.35 }}>
          {displayName}
        </h3>

        {/* Địa chỉ thực tế, bỏ mô tả cứng */}
        <p style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', color: '#64748b', fontSize: '12px', lineHeight: 1.45, margin: '4px 0 10px', minHeight: '34px' }}>
          <MapPin size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#94a3b8' }} />
          <span>{drink.address || drink.category || 'Khu vực gần bạn'}</span>
        </p>

        <div className="drink-card-footer">
          <strong>{drink.priceRange || '25.000 – 45.000đ'}</strong>
          <span><Clock3 size={14} /> {drink.travelTime || '5 phút'}</span>
        </div>
        {drink.badge && <span className="drink-card-badge">{drink.badge}</span>}
      </div>
    </article>
  );
}
