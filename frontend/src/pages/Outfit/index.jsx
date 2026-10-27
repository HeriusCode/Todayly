import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  CalendarPlus,
  Check,
  CheckCircle2,
  CloudSun,
  Droplets,
  Heart,
  RefreshCw,
  Shirt,
  Sparkles,
  Sun,
  Umbrella,
  Wind,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { outfitService } from '../../services/outfitService';
import { scheduleService } from '../../services/scheduleService';
import { weatherService } from '../../services/weatherService';
import { toDateKey } from '../../utils/dates';

const activities = [
  { id: 'cafe', icon: '☕', label: 'Đi cafe sống ảo' },
  { id: 'office', icon: '💼', label: 'Đi làm văn phòng' },
  { id: 'street', icon: '👟', label: 'Đi chơi phố' },
  { id: 'date', icon: '🌹', label: 'Hẹn hò lãng mạn' },
  { id: 'beach', icon: '🏖️', label: 'Đi biển & Dã ngoại' },
  { id: 'sport', icon: '🏃', label: 'Thể thao & Tập luyện' },
  { id: 'party', icon: '✨', label: 'Tiệc tùng & Sự kiện' },
  { id: 'school', icon: '🎓', label: 'Đi học & Giảng đường' },
];

const initialSaved = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem('todayly_saved_outfits') || '[]'));
  } catch {
    return new Set();
  }
};

const getClimateAdvice = (temp, condition = '') => {
  const isRain = /mưa|phùn|dông|rào/i.test(condition);
  if (isRain) {
    return 'Hôm nay trời có mưa: Ưu tiên áo khoác gió trượt nước, quần ống gọn gàng và giày kháng ẩm.';
  }
  if (temp >= 32) {
    return 'Thời tiết nắng nóng gay gắt: Khuyên dùng chất liệu linen, đũi hoặc cotton 100% thoáng mát, đội mũ và thoa kem chống nắng SPF50+.';
  }
  if (temp >= 26) {
    return 'Thời tiết ấm áp lý tưởng: Thích hợp cho các gam màu sáng pastel, chất vải nhẹ nhàng thoáng khí.';
  }
  if (temp >= 20) {
    return 'Thời tiết mát mẻ dễ chịu: Phối đồ layer nhẹ nhàng với sơ mi, cardigan hoặc blazer mỏng.';
  }
  return 'Thời tiết se lạnh: Hãy giữ ấm cơ thể với áo len dệt kim, áo khoác măng tô hoặc khăn choàng nhẹ.';
};

function TimelineCard({ outfit, time, title, label, temp, text, tone, onSelect }) {
  if (!outfit) return null;
  return (
    <article className="outfit-timeline-card" onClick={onSelect} style={{ cursor: 'pointer' }}>
      <div className="outfit-timeline-image">
        <img
          src={outfit.image}
          alt={outfit.styleName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <span className={`outfit-time-pill ${tone || 'violet'}`}>
          <i />
          {time || outfit.timelineInfo?.timeRange || 'Trong ngày'}
        </span>
        <b>{temp || outfit.timelineInfo?.tempLabel || `${outfit.tempRange?.min || 25}°C`}</b>
      </div>
      <div className="outfit-timeline-copy">
        <div>
          <strong>{label || outfit.timelineInfo?.label || outfit.activityLabel}</strong>
          <small>{outfit.styleName}</small>
        </div>
        <h3>{title || outfit.styleName}</h3>
        <p>{text || outfit.timelineInfo?.summary || outfit.suitableFor}</p>
      </div>
      <button type="button" aria-label={`Xem ${outfit.styleName}`} onClick={onSelect}>
        <ArrowRight size={17} />
      </button>
    </article>
  );
}

export default function Outfit() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [allOutfits, setAllOutfits] = useState([]);
  const [timelineData, setTimelineData] = useState(null);
  const [activity, setActivity] = useState('cafe');
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [savedOutfits, setSavedOutfits] = useState(initialSaved);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load real weather and real outfits from MongoDB Atlas
  useEffect(() => {
    let active = true;

    // 1. Fetch live weather for device/IP
    weatherService
      .getCurrentForDevice()
      .then((data) => {
        if (active && data) setWeather(data);
      })
      .catch(() => {});

    // 2. Fetch real outfits from MongoDB database
    outfitService
      .getAll()
      .then((data) => {
        if (!active) return;
        const outfitsList = Array.isArray(data?.outfits) ? data.outfits : [];
        setAllOutfits(outfitsList);
        if (data?.timeline) {
          setTimelineData(data.timeline);
        }
      })
      .catch((err) => {
        console.warn('Lỗi tải outfits:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Filter outfits matching currently selected activity
  const matchingOutfits = useMemo(() => {
    const list = allOutfits.filter((o) => o.activity === activity);
    return list.length ? list : allOutfits;
  }, [allOutfits, activity]);

  // Selected outfit currently showcased
  const selected = useMemo(() => {
    if (!matchingOutfits.length) return null;
    return matchingOutfits[outfitIndex % matchingOutfits.length];
  }, [matchingOutfits, outfitIndex]);

  // Reset index when activity tab changes
  useEffect(() => {
    setOutfitIndex(0);
  }, [activity]);

  // Cycle to next outfit recommendation for current activity
  const nextSuggestion = () => {
    setRefreshing(true);
    setOutfitIndex((prev) => prev + 1);
    setTimeout(() => setRefreshing(false), 400);
  };

  // Force re-crawl fresh outfits into MongoDB
  const crawlFreshOutfits = async () => {
    setRefreshing(true);
    try {
      const data = await outfitService.getAll({ refresh: 'true' });
      const outfitsList = Array.isArray(data?.outfits) ? data.outfits : [];
      setAllOutfits(outfitsList);
      if (data?.timeline) setTimelineData(data.timeline);
      setToastMessage('Đã cập nhật các set đồ thời trang mới nhất từ cơ sở dữ liệu!');
      setTimeout(() => setToastMessage(''), 4000);
    } catch {
      setToastMessage('Không thể làm mới dữ liệu trang phục.');
      setTimeout(() => setToastMessage(''), 4000);
    } finally {
      setRefreshing(false);
    }
  };

  // Toggle save outfit to closet
  const toggleSave = (outfitId) => {
    if (!outfitId) return;
    setSavedOutfits((current) => {
      const next = new Set(current);
      if (next.has(outfitId)) {
        next.delete(outfitId);
        setToastMessage('Đã bỏ lưu outfit khỏi tủ đồ.');
      } else {
        next.add(outfitId);
        setToastMessage('Đã lưu outfit vào tủ đồ của bạn! ✨');
      }
      localStorage.setItem('todayly_saved_outfits', JSON.stringify([...next]));
      setTimeout(() => setToastMessage(''), 3500);
      return next;
    });
  };

  // Add selected outfit to daily schedule planner
  const addToSchedule = async (outfit) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!outfit) return;
    try {
      await scheduleService.addItem({
        title: `Chuẩn bị trang phục: ${outfit.styleName}`,
        scheduledDate: toDateKey(),
        startTime: '07:30',
        endTime: '08:00',
        type: 'outfit',
        category: 'Cá nhân',
        priority: 'medium',
        matrixQuadrant: 'important_not_urgent',
        location: outfit.suitableFor || 'Tại nhà',
        note: `Set đồ gồm: ${outfit.pieces?.map((p) => p.name).join(', ')}. Mẹo: ${outfit.tips || ''}`,
        badge: 'Outfit hôm nay',
        color: 'primary',
      });
      setToastMessage(`Đã thêm “${outfit.styleName}” vào lịch trình hôm nay!`);
      setTimeout(() => setToastMessage(''), 4000);
    } catch (error) {
      setToastMessage(error.response?.data?.message || 'Không thể thêm outfit vào lịch trình.');
      setTimeout(() => setToastMessage(''), 4000);
    }
  };

  const isCurrentSaved = selected ? savedOutfits.has(selected.id || selected._id) : false;

  // Real weather metrics
  const currentTemp = weather?.temperature ?? 28;
  const currentCondition = weather?.condition || 'Trời quang, thoáng mát';
  const currentLocation = weather?.location || 'Vị trí hiện tại';
  const currentHumidity = weather?.humidity ? `${weather.humidity}%` : '65%';
  const currentWind = weather?.windSpeed ? `${weather.windSpeed} km/h` : '12 km/h';
  const currentUv = currentTemp >= 30 ? '7.5 · Khá cao' : '4.5 · Trung bình';
  const climateAdvice = getClimateAdvice(currentTemp, currentCondition);

  return (
    <div className="outfit-page">
      <div className="outfit-shell">
        {/* Hero Section with Live Weather */}
        <section className="outfit-hero outfit-enter">
          <span className="outfit-orb outfit-orb-a" />
          <span className="outfit-orb outfit-orb-b" />

          <div className="outfit-hero-top">
            <div>
              <span className="outfit-eyebrow">
                <Shirt size={16} /> Trợ lý thời trang thông minh
              </span>
              <h1>
                Hôm nay mặc gì? <span>👕👗</span>
              </h1>
              <p>
                Gợi ý outfit thật từ hệ thống thời trang, cá nhân hóa theo thời tiết thực tế và hoạt động trong ngày của bạn.
              </p>
            </div>
            <div className="outfit-live">
              <i />
              <div>
                <small>Đồng bộ theo thời gian thực</small>
                <strong>{currentLocation} · Hôm nay</strong>
              </div>
            </div>
          </div>

          <div className="outfit-weather-grid">
            <div className="outfit-weather-main">
              <div>
                <small>KHÍ HẬU HIỆN TẠI</small>
                <strong>
                  {currentTemp}°C <em>{currentCondition}</em>
                </strong>
                <p>{climateAdvice}</p>
              </div>
              <span>
                <Sun size={34} />
              </span>
            </div>

            <div className="outfit-metrics">
              <div>
                <Umbrella />
                <small>
                  Thời tiết
                  <strong>{currentCondition}</strong>
                </small>
              </div>
              <div>
                <Droplets />
                <small>
                  Độ ẩm
                  <strong>{currentHumidity} · Thoải mái</strong>
                </small>
              </div>
              <div>
                <Zap />
                <small>
                  Chỉ số UV
                  <strong>{currentUv}</strong>
                </small>
              </div>
              <div>
                <Wind />
                <small>
                  Gió tự nhiên
                  <strong>{currentWind} · Mát dịu</strong>
                </small>
              </div>
            </div>
          </div>

          <div className="outfit-warning">
            <Sparkles size={18} />
            <span>
              <b>Lời khuyên thời trang:</b> {climateAdvice}
            </span>
          </div>
        </section>

        {/* Activity Selection Chips */}
        <section className="outfit-activities outfit-enter outfit-delay-1">
          <header>
            <div>
              <Sparkles size={21} />
              <h2>Hôm nay bạn chuẩn bị đi đâu / làm gì?</h2>
            </div>
            <span>Chọn ngữ cảnh để phối màu và phom dáng chuẩn gu</span>
          </header>

          <div className="outfit-chips">
            {activities.map((item) => (
              <button
                key={item.id}
                className={activity === item.id ? 'active' : ''}
                onClick={() => setActivity(item.id)}
                type="button"
              >
                <span>{item.icon}</span>
                {item.label}
                {activity === item.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </section>

        {/* Main Outfit Showcase: Loaded from Real MongoDB Data */}
        {selected ? (
          <section className="outfit-showcase outfit-enter outfit-delay-2">
            <div className="outfit-editorial">
              <div className="outfit-photo">
                <img
                  src={selected.image}
                  alt={selected.styleName}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85';
                  }}
                />
                <span>
                  <Sparkles size={14} /> Gợi ý từ cơ sở dữ liệu thời trang
                </span>
                <button
                  type="button"
                  onClick={() => toggleSave(selected.id || selected._id)}
                  aria-label={isCurrentSaved ? 'Bỏ lưu outfit' : 'Lưu outfit'}
                >
                  <Heart size={20} fill={isCurrentSaved ? 'currentColor' : 'none'} />
                </button>
              </div>

              {selected.colorPalette?.length > 0 && (
                <div className="outfit-palette">
                  <div>
                    <small>BẢNG MÀU HÔM NAY</small>
                    {selected.colorPalette.map((color, idx) => (
                      <i
                        key={idx}
                        style={{ background: color }}
                        title={selected.colorNames?.[idx] || color}
                      />
                    ))}
                  </div>
                  <span>
                    {selected.colorNames?.slice(0, 3).join(' • ') || 'Phối màu chuẩn phong cách'}
                  </span>
                </div>
              )}
            </div>

            <div className="outfit-details">
              <div className="outfit-detail-head">
                <div>
                  <span>GỢI Ý HÀNG ĐẦU ({matchingOutfits.indexOf(selected) + 1}/{matchingOutfits.length})</span>
                  <h2>{selected.styleName}</h2>
                  <p>Phù hợp: {selected.suitableFor}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleSave(selected.id || selected._id)}
                  className={isCurrentSaved ? 'saved' : ''}
                >
                  <Bookmark size={18} fill={isCurrentSaved ? 'currentColor' : 'none'} />
                  {isCurrentSaved ? 'Đã lưu vào tủ đồ' : 'Lưu set đồ'}
                </button>
              </div>

              {/* Pieces Grid */}
              <div className="outfit-piece-grid">
                {selected.pieces?.map((piece, idx) => (
                  <div key={piece.name || idx}>
                    <span className="material-symbols-outlined">{piece.icon || 'dry_cleaning'}</span>
                    <small>{piece.category || 'MÓN ĐỒ'}</small>
                    <strong>{piece.name}</strong>
                    <p>{piece.note}</p>
                  </div>
                ))}
              </div>

              {/* Pro Styling Tip */}
              {selected.tips && (
                <div className="outfit-tip">
                  <Sparkles size={19} />
                  <p>
                    <b>Mẹo phối đồ hôm nay: </b>
                    {selected.tips}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="outfit-actions">
                <button
                  type="button"
                  onClick={nextSuggestion}
                  className="primary"
                  title="Xem set đồ khác cùng danh mục"
                >
                  <Sparkles size={18} className={refreshing ? 'spin' : ''} /> Gợi ý outfit khác
                </button>
                <button
                  type="button"
                  onClick={() => addToSchedule(selected)}
                  className="warm"
                  style={{ background: '#3525cd', color: '#fff' }}
                >
                  <CalendarPlus size={17} /> Thêm vào lịch trình hôm nay
                </button>
                <button
                  type="button"
                  onClick={crawlFreshOutfits}
                  title="Cào và làm mới dữ liệu từ server"
                >
                  <RefreshCw size={17} className={refreshing ? 'spin' : ''} /> Cập nhật dữ liệu
                </button>
              </div>
            </div>
          </section>
        ) : (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              background: '#fff',
              borderRadius: '24px',
              border: '1px dashed #cbd5e1',
              margin: '20px 0',
            }}
          >
            {loading ? (
              <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
                Đang tải dữ liệu outfit thật từ database MongoDB…
              </p>
            ) : (
              <div>
                <p style={{ color: '#1e293b', fontSize: '16px', fontWeight: 700 }}>
                  Chưa có gợi ý outfit cho hoạt động này.
                </p>
                <button
                  type="button"
                  onClick={crawlFreshOutfits}
                  style={{
                    marginTop: '12px',
                    padding: '10px 20px',
                    background: '#3525cd',
                    color: '#fff',
                    borderRadius: '99px',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cào dữ liệu trang phục mới
                </button>
              </div>
            )}
          </div>
        )}

        {/* Daily Timeline Section: Morning, Afternoon, Evening */}
        <section className="outfit-timeline outfit-enter outfit-delay-3">
          <header>
            <div>
              <h2>Tủ đồ theo từng nhịp thời gian trong ngày</h2>
              <p>Linh hoạt biến đổi outfit theo từng giai đoạn nhiệt độ và ánh sáng trong ngày.</p>
            </div>
            <span>
              <CloudSun size={16} /> Đồng bộ theo diễn biến thời tiết
            </span>
          </header>

          <div className="outfit-timeline-grid">
            <TimelineCard
              outfit={timelineData?.morning || allOutfits[0]}
              time="Buổi sáng · 07:30 – 11:30"
              title="Thanh lịch & chỉn chu đầu ngày"
              label="ĐI LÀM & ĐI HỌC"
              temp={`${Math.round(currentTemp - 2)}°C · Nắng dịu`}
              tone="violet"
              onSelect={() => {
                const item = timelineData?.morning || allOutfits[0];
                if (item) {
                  setActivity(item.activity);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }
              }}
            />

            <TimelineCard
              outfit={timelineData?.afternoon || allOutfits[1] || allOutfits[0]}
              time="Buổi chiều · 14:30 – 18:00"
              title="Thoáng mát & dạo phố tự do"
              label="CAFE & DẠO PHỐ"
              temp={`${currentTemp}°C · Gió lộng`}
              tone="orange"
              onSelect={() => {
                const item = timelineData?.afternoon || allOutfits[1] || allOutfits[0];
                if (item) {
                  setActivity(item.activity);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }
              }}
            />

            <TimelineCard
              outfit={timelineData?.evening || allOutfits[2] || allOutfits[0]}
              time="Buổi tối · 18:30 – 22:30"
              title="Quyến rũ dưới ánh đèn"
              label="HẸN HÒ & TIỆC TỐI"
              temp={`${Math.round(currentTemp - 3)}°C · Mát dịu`}
              tone="violet"
              onSelect={() => {
                const item = timelineData?.evening || allOutfits[2] || allOutfits[0];
                if (item) {
                  setActivity(item.activity);
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }
              }}
            />
          </div>
        </section>

        {/* Closet Upload Banner */}
        <section className="outfit-closet">
          <div>
            <span>
              <Sparkles size={25} />
            </span>
            <div>
              <h2>Đã lưu {savedOutfits.size} set đồ yêu thích</h2>
              <p>Các set đồ bạn đã lưu được đồng bộ an toàn trên thiết bị và sẵn sàng sử dụng bất kỳ lúc nào.</p>
            </div>
          </div>
          <button type="button" onClick={crawlFreshOutfits}>
            <RefreshCw size={18} className={refreshing ? 'spin' : ''} /> Cập nhật xu hướng thời trang
          </button>
        </section>
      </div>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#1e293b',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '99px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: 600,
            zIndex: 9999,
          }}
        >
          <CheckCircle2 size={18} style={{ color: '#4ade80' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
