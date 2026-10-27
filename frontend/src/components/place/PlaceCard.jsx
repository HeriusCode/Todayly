import { ArrowRight, Bookmark, CalendarPlus, Clock3, MapPin, Navigation, Star } from 'lucide-react';

const directionsUrl = (place) => {
  const destination = Number.isFinite(Number(place.latitude)) && Number.isFinite(Number(place.longitude))
    ? `${place.latitude},${place.longitude}`
    : place.address || place.name;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
};

export default function PlaceCard({ place, isSaved, selected, onToggleSave, onSelect, onAddSchedule }) {
  return (
    <article className={`place-result-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(place)}>
      <div className="place-result-layout">
        <div className="place-result-photo">
          <img
            src={place.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'}
            alt={place.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <span>{place.rankLabel || 'Đề xuất'}</span>
          <small>{place.distance}</small>
        </div>
        <div className="place-result-content">
          <div>
            <div className="place-result-category">
              <span>{place.category}</span>
              <button
                type="button"
                className={isSaved ? 'saved' : ''}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleSave(place.id);
                }}
                aria-label={isSaved ? 'Bỏ lưu địa điểm' : 'Lưu địa điểm'}
              >
                <Bookmark size={19} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
            <h3 style={{ color: '#0f172a', fontWeight: 800 }}>{place.name}</h3>
            {place.address && (
              <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                <MapPin size={12} style={{ flexShrink: 0, color: '#94a3b8' }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{place.address}</span>
              </div>
            )}
            <div className="place-result-meta">
              <span>
                <Star size={15} fill="currentColor" />
                <b>{place.rating}</b> ({place.reviewsCount})
              </span>
              <i>•</i>
              <span>
                <Clock3 size={15} /> {place.openHours}
              </span>
              <i>•</i>
              <strong>{place.isOpen ? 'Mở cửa' : 'Đóng cửa'}</strong>
            </div>
            <p>{place.description}</p>
            <div className="place-result-tags">
              {place.tags?.slice(0, 3).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
          <footer>
            <button
              type="button"
              className="place-add-plan"
              onClick={(event) => {
                event.stopPropagation();
                onAddSchedule(place);
              }}
            >
              <CalendarPlus size={16} /> Thêm vào lịch trình
            </button>
            <a href={directionsUrl(place)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
              <Navigation size={16} /> Chỉ đường
            </a>
            <button
              type="button"
              className="place-detail"
              onClick={(event) => {
                event.stopPropagation();
                onSelect(place);
              }}
            >
              <MapPin size={15} /> Chi tiết <ArrowRight size={14} />
            </button>
          </footer>
        </div>
      </div>
    </article>
  );
}
