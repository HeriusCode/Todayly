import { CalendarDays, MapPin, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="todayly-footer">
      <div className="todayly-footer-grid">
        <section><h3><CalendarDays size={22} /> Todayly <small>Lifestyle AI</small></h3><p>Người bạn đồng hành thảnh thơi mỗi ngày. Cân bằng công việc, ẩm thực, trải nghiệm và thời trang trong từng phút giây.</p><div className="todayly-city"><span>☀ Đà Nẵng 28°C</span><span>▦ TP. Hồ Chí Minh 31°C</span></div></section>
        <section><h4>Bốn trụ cột sống</h4><Link to="/tasks">● Làm gì: Kế hoạch & Mục tiêu ngày</Link><Link to="/food">● Ăn gì: Quán ngon & Công thức nhẹ</Link><Link to="/places">● Đi đâu: Cafe & Điểm hẹn cuối tuần</Link><Link to="/outfit">● Mặc gì: Gợi ý phối đồ theo thời tiết</Link></section>
        <section><h4>Trải nghiệm</h4><Link to="/planner">Dòng thời gian thông minh</Link><Link to="/places"><MapPin size={14} /> Bản đồ điểm hẹn lân cận</Link><Link to="/favorites">Bộ sưu tập đã lưu</Link><Link to="/profile">Hồ sơ & sở thích</Link></section>
        <section><h4>Tải ứng dụng di động</h4><p>Nhận thông báo nhắc lịch và gợi ý mặc đẹp, quán ngon ngay trên điện thoại.</p><div className="todayly-app-buttons"><span><Smartphone size={20} /> Tải trên<br /><b>App Store</b></span><span>Tải trên<br /><b>Google Play</b></span></div></section>
      </div>
      <div className="todayly-footer-bottom"><span>© 2026 Todayly. Thiết kế cho nhịp sống tích cực mỗi ngày.</span><span><a href="#terms">Điều khoản</a><a href="#privacy">Bảo mật</a><a href="mailto:support@todayly.vn">Góp ý kiến</a></span></div>
    </footer>
  );
}
