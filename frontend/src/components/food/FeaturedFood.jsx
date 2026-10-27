import { useState } from 'react';
import {
  Bike,
  Bookmark,
  BrainCircuit,
  MapPin,
  Navigation,
  RefreshCw,
  Star,
  Utensils,
  WalletCards,
} from 'lucide-react';

export default function FeaturedFood({ food, weather, onChoose, onReroll }) {
  const [saved, setSaved] = useState(false);
  const [failedImage, setFailedImage] = useState('');

  if (!food) return null;
  const imageFailed = Boolean(food.image) && failedImage === food.image;

  const [longitude, latitude] = food.location?.coordinates || [];
  const destination = Number.isFinite(longitude) && Number.isFinite(latitude)
    ? `${latitude},${longitude}`
    : food.address || food.name;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  const temperature = weather?.temperature ? `${weather.temperature}°C` : '29°C';
  const condition = weather?.condition || 'thời tiết dịu nhẹ';
  const distanceKm = Number(food.distanceNum);
  const travelTime = Number.isFinite(distanceKm) ? `${Math.max(2, Math.round(distanceKm * 4))} phút` : 'Chưa xác định';
  const openingLabel = food.isOpen === true
    ? `Đang mở cửa (${food.openHours || 'chưa rõ giờ'})`
    : food.isOpen === false
      ? 'Hiện đang đóng cửa'
      : food.openHours ? `Giờ mở: ${food.openHours}` : 'Chưa có giờ mở cửa';

  return (
    <article className="food-featured">
      <div className="food-featured-image">
        {food.image && !imageFailed ? <img src={food.image} alt={food.name} onError={() => setFailedImage(food.image)} /> : <div className="food-image-placeholder featured"><Utensils size={45} /><span>{food.category || 'Quán ăn gần bạn'}</span></div>}
        {food.photoAttributions?.[0] && !imageFailed && <a className="food-photo-credit featured" href={food.photoAttributions[0].uri || food.sourceUrl} target="_blank" rel="noreferrer">Ảnh: {food.photoAttributions[0].displayName || 'Google Maps'}</a>}
        <div className="food-featured-overlay" />
        <div className="food-featured-status">
          <span>Món ngon hôm nay 👑</span>
          <small><i /> {openingLabel}</small>
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
          <div><Star size={20} /><span><strong>{food.rating ? `${food.rating} / 5.0` : 'Chưa có đánh giá'}</strong><small>{food.reviewsCount ? `${food.reviewsCount} đánh giá` : 'Nguồn chưa cung cấp'}</small></span></div>
          <div><WalletCards size={20} /><span><strong>{food.priceRange || 'Chưa cập nhật'}</strong><small>Mức giá tham khảo</small></span></div>
          <div><MapPin size={20} /><span><strong>{food.distance || 'Chưa xác định'}</strong><small>Từ vị trí của bạn</small></span></div>
          <div><Bike size={20} /><span><strong>{travelTime}</strong><small>Ước tính đi xe máy</small></span></div>
        </div>

        <div className="food-featured-reason">
          <BrainCircuit size={24} />
          <div>
            <strong>Tại sao chọn món này?</strong>
            <p>{food.description || `Quán nằm gần vị trí hiện tại của bạn. Thời tiết đang ${condition.toLowerCase()}, khoảng ${temperature}; hãy kiểm tra thực đơn và giờ mở cửa trước khi đi.`}</p>
          </div>
        </div>

        <div className="food-featured-actions">
          <div>
            <button type="button" className="choose" onClick={() => onChoose?.(food)}><Utensils size={18} /> Chọn món này</button>
            <button type="button" className="reroll" onClick={onReroll}><RefreshCw size={18} /> Đổi món khác</button>
          </div>
          <a href={directionsUrl} target="_blank" rel="noreferrer"><Navigation size={18} /> Dẫn đường</a>
        </div>
      </div>
    </article>
  );
}
