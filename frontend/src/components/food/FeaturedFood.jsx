import { useState } from 'react';
import {
  Bike,
  Bookmark,
  BrainCircuit,
  Map,
  MapPin,
  RefreshCw,
  Star,
  Utensils,
  WalletCards,
} from 'lucide-react';

export default function FeaturedFood({ food, weather, onChoose, onReroll }) {
  const [saved, setSaved] = useState(false);

  if (!food) return null;

  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(food.address || food.name)}`;
  const temperature = weather?.temperature ? `${weather.temperature}°C` : '29°C';
  const condition = weather?.condition || 'thời tiết dịu nhẹ';

  return (
    <article className="food-featured">
      <div className="food-featured-image">
        <img src={food.image} alt={food.name} />
        <div className="food-featured-overlay" />
        <div className="food-featured-status">
          <span>Món ngon hôm nay 👑</span>
          <small><i /> {food.isOpen === false ? 'Hiện đang đóng cửa' : `Đang mở cửa (${food.openHours || '06:00 - 22:00'})`}</small>
        </div>
        <button
          type="button"
          className={`food-featured-save ${saved ? 'saved' : ''}`}
          onClick={() => setSaved((current) => !current)}
          aria-label={saved ? 'Bỏ lưu món ăn' : 'Lưu món ăn'}
        >
          <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <div className="food-featured-title">
          <span>Gợi ý bữa trưa lý tưởng</span>
          <h2>{food.name}</h2>
        </div>
      </div>

      <div className="food-featured-content">
        <div className="food-featured-metrics">
          <div><Star size={20} /><span><strong>{food.rating || 4.8} / 5.0</strong><small>{food.reviewsCount || 0} đánh giá</small></span></div>
          <div><WalletCards size={20} /><span><strong>{food.priceRange || '35k – 55k'}</strong><small>Mức giá tham khảo</small></span></div>
          <div><MapPin size={20} /><span><strong>{food.distance || '1.2 km'}</strong><small>Từ vị trí của bạn</small></span></div>
          <div><Bike size={20} /><span><strong>{food.travelTime || '5 phút'}</strong><small>Đi xe máy</small></span></div>
        </div>

        <div className="food-featured-reason">
          <BrainCircuit size={24} />
          <div>
            <strong>Tại sao chọn món này?</strong>
            <p>{food.recommendation || `Với ${temperature} và ${condition.toLowerCase()}, món ăn đậm đà nhưng cân bằng này sẽ giúp bạn ngon miệng mà không gây cảm giác quá nặng bụng.`}</p>
          </div>
        </div>

        <div className="food-featured-actions">
          <div>
            <button type="button" className="choose" onClick={() => onChoose?.(food)}><Utensils size={18} /> Chọn món này</button>
            <button type="button" className="reroll" onClick={onReroll}><RefreshCw size={18} /> Đổi món khác</button>
          </div>
          <a href={mapUrl} target="_blank" rel="noreferrer"><Map size={18} /> Xem trên bản đồ</a>
        </div>
      </div>
    </article>
  );
}
