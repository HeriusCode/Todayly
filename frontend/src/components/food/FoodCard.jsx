import { useState } from 'react';
import { Bookmark, ChevronRight, MapPin, Star } from 'lucide-react';

export default function FoodCard({ food, saved, onSaveFavorite, onOpenDetail }) {
  const [localSaved, setLocalSaved] = useState(false);
  const isControlled = typeof saved === 'boolean';
  const isSaved = isControlled ? saved : localSaved;

  const toggleSaved = () => {
    if (!isControlled) setLocalSaved((current) => !current);
    onSaveFavorite?.(food);
  };

  return (
    <article className="food-place-card">
      <div className="food-place-image">
        <img src={food.image} alt={food.name} />
        <span className="food-place-badge">{food.badge || food.category || 'Món ngon'}</span>
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
          <strong><Star size={14} fill="currentColor" /> {food.rating || '4.8'}</strong>
        </div>
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <footer>
          <strong>{food.priceLabel || food.priceRange || 'Liên hệ'}</strong>
          <button type="button" onClick={() => onOpenDetail?.(food)}>
            Chi tiết <ChevronRight size={16} />
          </button>
        </footer>
      </div>
    </article>
  );
}
