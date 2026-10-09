import { useState } from 'react';
import { Bookmark, ChevronRight, MapPin, Star, Utensils } from 'lucide-react';

export default function FoodCard({ food, saved, onSaveFavorite, onOpenDetail }) {
  const [localSaved, setLocalSaved] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const isControlled = typeof saved === 'boolean';
  const isSaved = isControlled ? saved : localSaved;

  const openDetail = () => onOpenDetail?.(food);

  const toggleSaved = (event) => {
    event.stopPropagation();
    if (!isControlled) setLocalSaved((current) => !current);
    onSaveFavorite?.(food);
  };

  return (
    <article
      className="food-place-card"
      role="button"
      tabIndex={0}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDetail();
        }
      }}
      aria-label={`Xem thông tin ${food.name}`}
    >
      <div className="food-place-image">
        {food.image && !imageFailed ? <img src={food.image} alt={food.name} onError={() => setImageFailed(true)} /> : <div className="food-image-placeholder"><Utensils size={29} /><span>{food.category || 'Quán ăn gần bạn'}</span></div>}
        {food.photoAttributions?.[0] && !imageFailed && <a className="food-photo-credit" href={food.photoAttributions[0].uri || food.sourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Ảnh: {food.photoAttributions[0].displayName || 'Google Maps'}</a>}
        <button
          type="button"
          className={isSaved ? 'saved' : ''}
          onClick={toggleSaved}
          aria-label={isSaved ? 'Bỏ lưu quán' : 'Lưu quán'}
        >
          <Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="food-place-body">
        <div className="food-place-metrics">
          <span><MapPin size={14} /> {food.distance || 'Gần bạn'}</span>
          <strong><Star size={14} fill={food.rating ? 'currentColor' : 'none'} /> {food.rating ?? 'Chưa có ĐG'}</strong>
        </div>
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <footer>
          <strong>{food.priceLabel || food.priceRange || 'Chưa cập nhật giá'}</strong>
          <button type="button" onClick={(event) => { event.stopPropagation(); openDetail(); }}>
            Chi tiết <ChevronRight size={16} />
          </button>
        </footer>
      </div>
    </article>
  );
}
