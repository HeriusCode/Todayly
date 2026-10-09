import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, LocateFixed, Minus, Navigation, Plus } from 'lucide-react';
import { loadGoogleMaps } from '../../utils/googleMaps';

const FALLBACK_CENTER = { lat: 20.9786444, lng: 105.7828063 };

const directionsUrl = (place) => {
  const destination = Number.isFinite(Number(place?.latitude)) && Number.isFinite(Number(place?.longitude))
    ? `${place.latitude},${place.longitude}`
    : place?.address || place?.name || '';
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
};

const validCenter = (center) => {
  const lat = Number(center?.lat);
  const lng = Number(center?.lng ?? center?.lon);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : FALLBACK_CENTER;
};

const createUserPin = () => {
  const pin = document.createElement('div');
  pin.className = 'google-user-location';
  pin.innerHTML = '<span></span><i></i>';
  return pin;
};

const createPlacePin = (place, index, selected) => {
  const pin = document.createElement('button');
  pin.type = 'button';
  pin.className = `google-place-marker${selected ? ' active' : ''}`;
  pin.setAttribute('aria-label', `Chọn ${place.name}`);
  pin.innerHTML = `<span>${index + 1}</span><strong>${place.name.split(' - ')[0]}</strong>`;
  return pin;
};

export default function PlaceMap({
  places = [],
  selected,
  onSelect,
  radius = 5000,
  selectedRadiusLimit = 5,
  onSelectRadius,
  userCenter,
  onRefreshLocation,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const radiusCircleRef = useRef(null);
  const userMarkerRef = useRef(null);
  const radiusDropdownRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState('');
  const [radiusDropdownOpen, setRadiusDropdownOpen] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapCenter = useMemo(() => validCenter(userCenter), [userCenter]);
  const currentRadiusMeters = selectedRadiusLimit === 'all'
    ? Number(radius || 5000)
    : Number(selectedRadiusLimit) * 1000;

  useEffect(() => {
    const closeDropdown = (event) => {
      if (radiusDropdownRef.current && !radiusDropdownRef.current.contains(event.target)) setRadiusDropdownOpen(false);
    };
    document.addEventListener('mousedown', closeDropdown);
    return () => document.removeEventListener('mousedown', closeDropdown);
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps(apiKey).then(async (maps) => {
      const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
        maps.importLibrary('maps'),
        maps.importLibrary('marker'),
      ]);
      if (cancelled || !mapContainerRef.current) return;

      mapRef.current = new Map(mapContainerRef.current, {
        center: FALLBACK_CENTER,
        zoom: 13,
        mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID',
        disableDefaultUI: true,
        clickableIcons: false,
        gestureHandling: 'greedy',
        backgroundColor: '#e5eeff',
      });
      mapRef.current.__AdvancedMarkerElement = AdvancedMarkerElement;
      setMapReady(true);
    }).catch((error) => {
      if (!cancelled) setMapError(error.message || 'Không tải được Google Maps.');
    });

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => { marker.map = null; });
      markersRef.current = [];
      if (userMarkerRef.current) userMarkerRef.current.map = null;
      radiusCircleRef.current?.setMap(null);
      userMarkerRef.current = null;
      radiusCircleRef.current = null;
      mapRef.current = null;
    };
  }, [apiKey]);

  useEffect(() => {
    const map = mapRef.current;
    const maps = window.google?.maps;
    const AdvancedMarkerElement = map?.__AdvancedMarkerElement;
    if (!mapReady || !map || !maps || !AdvancedMarkerElement) return;

    markersRef.current.forEach((marker) => { marker.map = null; });
    markersRef.current = [];
    if (userMarkerRef.current) userMarkerRef.current.map = null;
    radiusCircleRef.current?.setMap(null);

    radiusCircleRef.current = new maps.Circle({
      map,
      center: mapCenter,
      radius: currentRadiusMeters,
      strokeColor: '#4f46e5',
      strokeOpacity: 0.78,
      strokeWeight: 2,
      fillColor: '#818cf8',
      fillOpacity: 0.09,
      clickable: false,
    });

    userMarkerRef.current = new AdvancedMarkerElement({
      map,
      position: mapCenter,
      title: 'Vị trí hiện tại của bạn',
      content: createUserPin(),
      zIndex: 1000,
    });

    places.slice(0, 80).forEach((place, index) => {
      const lat = Number(place.latitude);
      const lng = Number(place.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
      const marker = new AdvancedMarkerElement({
        map,
        position: { lat, lng },
        title: place.name,
        content: createPlacePin(place, index, selected?.id === place.id),
        zIndex: selected?.id === place.id ? 900 : 100 + index,
      });
      marker.addListener('click', () => onSelect(place));
      markersRef.current.push(marker);
    });

    const bounds = radiusCircleRef.current.getBounds();
    if (bounds) map.fitBounds(bounds, 42);
  }, [places, selected?.id, mapCenter, currentRadiusMeters, mapReady, onSelect]);

  useEffect(() => {
    const lat = Number(selected?.latitude);
    const lng = Number(selected?.longitude);
    if (mapReady && Number.isFinite(lat) && Number.isFinite(lng)) mapRef.current?.panTo({ lat, lng });
  }, [selected, mapReady]);

  const fitRadius = () => {
    const bounds = radiusCircleRef.current?.getBounds();
    if (bounds) mapRef.current?.fitBounds(bounds, 42);
    else mapRef.current?.panTo(mapCenter);
  };

  return (
    <aside className="places-map">
      <div className="places-map-canvas">
        <div ref={mapContainerRef} className="google-map-surface" />

        {!mapReady && !mapError && <div className="google-map-status"><span /> Đang tải Google Maps…</div>}
        {mapError && (
          <div className="google-map-status error">
            <LocateFixed size={28} />
            <strong>Chưa thể tải Google Maps</strong>
            <p>{mapError === 'Thiếu VITE_GOOGLE_MAPS_API_KEY' ? 'Thêm VITE_GOOGLE_MAPS_API_KEY vào frontend/.env.local rồi khởi động lại Vite.' : mapError}</p>
          </div>
        )}

        <div className="places-map-tools">
          <div ref={radiusDropdownRef} className="places-radius-control">
            <button type="button" className="places-radius-button" onClick={() => setRadiusDropdownOpen((value) => !value)}>
              <LocateFixed size={16} />
              <span>Bán kính quét: {selectedRadiusLimit === 'all' ? 'Toàn bộ' : `${selectedRadiusLimit} km`}</span>
              <ChevronDown size={14} className={radiusDropdownOpen ? 'open' : ''} />
            </button>
            {radiusDropdownOpen && (
              <div className="places-radius-menu">
                <strong>Chọn bán kính quét</strong>
                {[
                  [2, '2 km', 'Đi bộ hoặc xe đạp'],
                  [3, '3 km', 'Khoảng 5–10 phút'],
                  [5, '5 km', 'Bán kính tiêu chuẩn'],
                  [10, '10 km', 'Mở rộng khu vực'],
                  [15, '15 km', 'Phạm vi toàn thành phố'],
                  ['all', 'Toàn bộ', 'Không lọc khoảng cách'],
                ].map(([value, label, description]) => (
                  <button type="button" key={value} className={selectedRadiusLimit === value ? 'active' : ''} onClick={() => { onSelectRadius?.(value); setRadiusDropdownOpen(false); }}>
                    <span><b>{label}</b><small>{description}</small></span>
                    {selectedRadiusLimit === value && <Check size={15} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            className="places-center-button"
            onClick={() => {
              if (onRefreshLocation) onRefreshLocation();
              else fitRadius();
            }}
            title="Định vị & về vị trí hiện tại"
            aria-label="Về vị trí hiện tại"
          >
            <LocateFixed size={19} />
          </button>
        </div>

        <div className="places-map-zoom">
          <button type="button" onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 13) + 1)} aria-label="Phóng to"><Plus size={17} /></button>
          <button type="button" onClick={() => mapRef.current?.setZoom((mapRef.current?.getZoom() || 13) - 1)} aria-label="Thu nhỏ"><Minus size={17} /></button>
        </div>

        {selected && (
          <article className="places-map-selected" onClick={() => onSelect(selected)}>
            <img src={selected.image} alt={selected.name} />
            <div><span>Đang chọn · Cách {selected.distance}</span><strong>{selected.name}</strong><p>{selected.isOpen ? 'Đang mở cửa' : 'Đang đóng cửa'} · {selected.rating} ⭐ ({selected.reviewsCount})</p></div>
            <a href={directionsUrl(selected)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><Navigation size={17} /> <span>Bắt đầu đi</span></a>
          </article>
        )}
      </div>
    </aside>
  );
}
