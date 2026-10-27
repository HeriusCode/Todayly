import { Bookmark, MapPin, RefreshCw, Sparkles, Star } from 'lucide-react';

export default function FeaturedDrink({ drink, saved, onSave, onReroll, onChoose }) {
  if (!drink) return null;
  const displayName = drink.storeName || drink.name;

  return (
    <article className="drink-featured">
      <span className="drink-featured-orb" />
      <header>
        <div>
          <span className="drink-hot"><Sparkles size={14} /> Điểm đến nổi bật</span>
          <span className="drink-cool">{drink.category || 'Đồ uống tươi mát'}</span>
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
          <img src={drink.image} alt={displayName} />
          <span><Star size={14} fill="currentColor" /> {drink.rating || '4.8'}</span>
        </div>
        <div className="drink-featured-copy">
          <span className="drink-kicker">Quán nước nổi bật hôm nay</span>
          <h2 style={{ color: '#0b1c30', fontSize: '26px', fontWeight: 800 }}>{displayName}</h2>
          <p className="drink-store"><MapPin size={15} /> {drink.address || displayName}</p>
          <p>{drink.category ? `Thể loại: ${drink.category} • Không gian: ${drink.workFriendly ? 'Có chỗ ngồi làm việc' : 'Thích hợp mang đi & thưởng thức'}` : ''}</p>
          <div className="drink-featured-stats">
            <span><strong>{drink.priceRange || '25.000 – 45.000đ'}</strong>Khoảng giá</span>
            <span><strong>{drink.distance || 'Gần bạn'}</strong>Cách bạn</span>
            <span><strong>{drink.sugar || 'Tùy chọn'}</strong>Tùy chọn</span>
          </div>
        </div>
      </div>

      <div className="drink-reason">
        <span><Sparkles size={18} /></span>
        <div>
          <strong>Gợi ý phù hợp cho bạn</strong>
          <p>{drink.address ? `Địa chỉ tại: ${drink.address}. ${drink.workFriendly ? 'Có không gian yên tĩnh và chỗ ngồi làm việc thuận tiện.' : ''}` : 'Quán nước được nhiều khách hàng yêu thích trong khu vực gần bạn.'}</p>
        </div>
      </div>

      <footer>
        <button type="button" className="drink-primary-action" onClick={onChoose}>Chọn quán này</button>
        <button type="button" className="drink-secondary-action" onClick={onReroll}><RefreshCw size={17} /> Đổi gợi ý khác</button>
      </footer>
    </article>
  );
}
