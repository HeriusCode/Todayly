import { Bookmark, Clock3, MapPin, Star } from 'lucide-react';

export default function DrinkCard({ drink, saved, onSave }) {
  return (
    <article className="drink-card">
      <div className="drink-card-media">
        <img src={drink.image} alt={drink.name} />
        <span className="drink-card-category">{drink.category}</span>
        <button
          type="button"
          className={saved ? 'saved' : ''}
          aria-label={saved ? 'Bỏ lưu thức uống' : 'Lưu thức uống'}
          onClick={() => onSave(drink.id)}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="drink-card-body">
        <div className="drink-card-meta">
          <span><Star size={14} fill="currentColor" /> {drink.rating} <small>({drink.reviewsCount})</small></span>
          <span><MapPin size={14} /> {drink.distance}</span>
        </div>
        <h3>{drink.name}</h3>
        <p className="drink-card-store">{drink.storeName}</p>
        <p className="drink-card-description">{drink.description}</p>
        <div className="drink-card-footer">
          <strong>{drink.priceRange}</strong>
          <span><Clock3 size={14} /> {drink.travelTime}</span>
        </div>
        {drink.badge && <span className="drink-card-badge">{drink.badge}</span>}
      </div>
    </article>
  );
}
