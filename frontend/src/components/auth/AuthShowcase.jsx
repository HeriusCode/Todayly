import { CheckCircle2, MapPin, Shirt, Sparkles, Star, Utensils, Wind } from 'lucide-react';

const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiViG6imxv4sLgMhFOt2M82db3t5TxPXKm72pPMmmeaOIVwuS9uXaVlNp3mhjLkTEBGF3bstu3aDLZcZlW2Cxuxb_qXRgQfzYqpLOJtjkxcKOao_2pzTKol0D6Rp3cxYAGnGAwG_-i9ELkd_9TJQDlrr9KFAklXHZ8TJgIQQHH2-KEkHU6V3oh2nh7_4iE80acKj846LgZHXxAobZJ3Zb3V44I4HbSNe92ZlHy4NSuQdMQ1n0JUOWs';

const pillars = [
  { icon: CheckCircle2, title: 'Hôm nay làm gì', text: 'Timeline thông minh, cân bằng nhịp sống và tối ưu hiệu suất.', tone: 'text-violet-700 bg-violet-100' },
  { icon: Utensils, title: 'Hôm nay ăn gì', text: 'Gợi ý quán ngon hợp thời tiết, tâm trạng và khẩu vị.', tone: 'text-orange-700 bg-orange-100' },
  { icon: MapPin, title: 'Hôm nay đi đâu', text: 'Tọa độ dạo mát, cafe yên tĩnh và góc chill gần bạn.', tone: 'text-emerald-700 bg-emerald-100' },
  { icon: Shirt, title: 'Hôm nay mặc gì', text: 'Gợi ý outfit năng động theo nhiệt độ và độ ẩm sáng nay.', tone: 'text-rose-700 bg-rose-100' },
];

export default function AuthShowcase({ variant = 'login' }) {
  const register = variant === 'register';
  return (
    <aside className={`auth-showcase auth-reveal auth-reveal-right ${register ? 'auth-showcase-register' : ''}`}>
      <div className="auth-inspiration"><span className="auth-dot" /> Cảm hứng sáng mai</div>
      <div className="auth-photo-wrap">
        <img src={HERO_IMAGE} alt="Một ngày tích cực cùng Todayly" className="auth-photo" />
        {!register && <div className="auth-weather"><span className="auth-weather-icon">☀</span><span><strong>29°C</strong> Nắng nhẹ<br /><small>Đà Nẵng · Gió mát 12km/h</small></span></div>}
        <div className="auth-photo-copy">
          {!register && <span className="auth-quote-chip">❞ Cảm hứng sáng nay</span>}
          <strong>{register ? '“Hôm nay làm gì? Ăn gì? Đi đâu? Mặc gì? Mọi quyết định đều trở nên thảnh thơi từ hôm nay.”' : '“Mỗi ngày mới là một cơ hội để sống trọn vẹn từng khoảnh khắc.”'}</strong>
          <span className="auth-rating"><Star size={15} fill="currentColor" /> 4.9/5 từ 3.4k người dùng</span>
        </div>
      </div>

      {register ? (
        <div className="auth-pillars">
          <p>Khám phá 4 trụ cột sống mỗi ngày</p>
          <div className="auth-pillar-grid">{pillars.map(({ icon: Icon, title, text, tone }) => <div className="auth-pillar" key={title}><span className={`auth-pillar-icon ${tone}`}><Icon size={16} /></span><div><strong>{title}</strong><span>{text}</span></div></div>)}</div>
        </div>
      ) : (
        <div className="auth-mini-grid">
          <div><span className="text-violet-700"><CheckCircle2 size={15} /> Làm gì</span><strong>Viết nhật ký & chạy bộ</strong><i><b style={{ width: '78%' }} /></i></div>
          <div><span className="text-orange-700"><Utensils size={15} /> Ăn gì</span><strong>Bún chả cá Đà Nẵng</strong><small>15 phút nấu</small></div>
          <div><span className="text-emerald-700"><MapPin size={15} /> Đi đâu</span><strong>Bãi biển Mỹ Khê</strong><small>Cách 1.8km</small></div>
        </div>
      )}

      <div className="auth-trust"><div className="auth-avatars"><span>NU</span><span>MK</span><span>TL</span><span>+12k</span></div><div><strong>Hơn 12.000+ bạn trẻ tin dùng</strong><p>Tối ưu nhịp sống và cân bằng mỗi ngày</p></div>{!register && <span className="auth-score"><Star size={15} /> 4.9/5.0</span>}</div>
      {!register && <div className="auth-sync"><span><i /> Hệ thống đồng bộ dữ liệu thời gian thực</span><span><Wind size={15} /> Phiên bản 2.4 · Lifestyle AI</span></div>}
      <Sparkles className="auth-sparkle" aria-hidden="true" />
      <span className="auth-showcase-orb auth-showcase-orb-one" aria-hidden="true" />
      <span className="auth-showcase-orb auth-showcase-orb-two" aria-hidden="true" />
    </aside>
  );
}
