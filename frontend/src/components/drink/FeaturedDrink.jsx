import { Bookmark, MapPin, RefreshCw, Sparkles, Star } from 'lucide-react';

export default function FeaturedDrink({ drink, saved, onSave, onReroll, onChoose }) {
  if (!drink) return null;

  return (
    <article className="drink-featured">
      <span className="drink-featured-orb" />
      <header>
        <div>
          <span className="drink-hot"><Sparkles size={14} /> Hot trend tuần này</span>
          <span className="drink-cool">Thanh nhiệt</span>
        </div>
        <button
          type="button"
          className={saved ? 'saved' : ''}
          onClick={() => onSave(drink.id)}
          aria-label={saved ? 'Bỏ lưu gợi ý' : 'Lưu gợi ý'}
        >
          <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </header>

      <div className="drink-featured-main">
        <div className="drink-featured-photo">
          <img src={drink.image} alt={drink.name} />
          <span><Star size={14} fill="currentColor" /> {drink.rating}</span>
        </div>
        <div className="drink-featured-copy">
          <span className="drink-kicker">Thức uống lý tưởng hôm nay</span>
          <h2>{drink.name}</h2>
          <p className="drink-store"><MapPin size={15} /> {drink.storeName}</p>
          <p>{drink.description}</p>
          <div className="drink-featured-stats">
            <span><strong>{drink.priceRange}</strong>Khoảng giá</span>
            <span><strong>{drink.distance}</strong>Cách bạn</span>
            <span><strong>{drink.sugar}</strong>Tùy chọn</span>
          </div>
        </div>
      </div>

      <div className="drink-reason">
        <span><Sparkles size={18} /></span>
        <div><strong>Tại sao phù hợp cho bạn hôm nay?</strong><p>{drink.reason || drink.description}</p></div>
      </div>

      <footer>
        <button type="button" className="drink-primary-action" onClick={onChoose}>Chọn thức uống này</button>
        <button type="button" className="drink-secondary-action" onClick={onReroll}><RefreshCw size={17} /> Đổi gợi ý khác</button>
      </footer>
    </article>
  );
}
