import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant mt-space-xl border-t border-outline-variant/20">
      <div className="w-full max-w-7xl mx-auto px-gutter py-12 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <img
                src="/todayly-logo.png"
                alt="Todayly"
                className="h-10 w-auto object-contain"
              />
              <span className="font-headline-md text-headline-md font-bold text-on-surface">
                Todayly
              </span>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Trợ lý lối sống thông minh giúp bạn tối ưu từng ngày với kế hoạch công việc, ẩm thực, điểm hẹn và phong cách thời trang chuẩn thời tiết.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider">
              Khám Phá 4 Trụ Cột
            </h4>
            <ul className="flex flex-col gap-2 font-body-sm text-sm">
              <li><Link to="/tasks" className="hover:text-primary transition-colors">Hôm nay làm gì? (Pomodoro & Eisenhower)</Link></li>
              <li><Link to="/food" className="hover:text-primary transition-colors">Hôm nay ăn gì? (Gợi ý món ăn)</Link></li>
              <li><Link to="/drinks" className="hover:text-primary transition-colors">Hôm nay uống gì? (Quán cafe & đồ uống)</Link></li>
              <li><Link to="/places" className="hover:text-primary transition-colors">Hôm nay đi đâu? (Điểm hẹn thư giãn)</Link></li>
              <li><Link to="/outfit" className="hover:text-primary transition-colors">Hôm nay mặc gì? (Thời trang theo thời tiết)</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider">
              Tính Năng Hỗ Trợ
            </h4>
            <ul className="flex flex-col gap-2 font-body-sm text-sm">
              <li><Link to="/planner" className="hover:text-primary transition-colors">Lịch trình & Thời gian biểu</Link></li>
              <li><Link to="/wheel" className="hover:text-primary transition-colors">Vòng quay may mắn (Chọn ngẫu nhiên)</Link></li>
              <li><Link to="/favorites" className="hover:text-primary transition-colors">Bộ sưu tập đã lưu</Link></li>
              <li><Link to="/journal" className="hover:text-primary transition-colors">Nhật ký & Cảm xúc hàng ngày</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider">
              Về Todayly
            </h4>
            <p className="font-body-sm text-sm text-on-surface-variant">
              Sứ mệnh mang lại sự bình yên, giảm tải quyết định mệt mỏi trong cuộc sống đô thị hiện đại.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="p-2 rounded-full bg-surface-container text-on-surface hover:text-primary cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[18px]">share</span>
              </span>
              <span className="p-2 rounded-full bg-surface-container text-on-surface hover:text-primary cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </span>
              <span className="p-2 rounded-full bg-surface-container text-on-surface hover:text-primary cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-xs text-outline">
          <p>© 2026 Todayly. All rights reserved. Make Today Better.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-on-surface transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-on-surface transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-on-surface transition-colors">Hỗ trợ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
