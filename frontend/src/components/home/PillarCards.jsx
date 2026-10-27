import React from 'react';
import { Link } from 'react-router-dom';

export default function PillarCards() {
  const pillars = [
    {
      title: 'Hôm nay làm gì?',
      subtitle: 'Quản lý công việc thông minh',
      desc: 'Ma trận Eisenhower 4 góc phần tư & đồng hồ Pomodoro tập trung chuyên sâu.',
      icon: 'checklist',
      badge: 'Công việc',
      link: '/tasks',
      gradient: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-primary',
      badgeBg: 'bg-primary-fixed text-primary',
    },
    {
      title: 'Hôm nay ăn gì?',
      subtitle: 'Gợi ý ẩm thực đúng điệu',
      desc: 'Món ngon bản địa, bữa sáng tràn năng lượng & ẩm thực phù hợp túi tiền.',
      icon: 'restaurant',
      badge: 'Ẩm thực',
      link: '/food',
      gradient: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-secondary',
      badgeBg: 'bg-secondary-fixed text-secondary',
    },
    {
      title: 'Hôm nay đi đâu?',
      subtitle: 'Điểm hẹn & Không gian chill',
      desc: 'Quán cafe làm việc yên tĩnh, dạo mát hoàng hôn biển & góc check-in tuyệt đẹp.',
      icon: 'explore',
      badge: 'Điểm hẹn',
      link: '/places',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-tertiary',
      badgeBg: 'bg-tertiary-fixed text-tertiary',
    },
    {
      title: 'Hôm nay mặc gì?',
      subtitle: 'Phong cách theo thời tiết',
      desc: 'Phối đồ chuẩn nhiệt độ 29°C, bảng màu hài hòa và phụ kiện tinh tế.',
      icon: 'checkroom',
      badge: 'Thời trang',
      link: '/outfit',
      gradient: 'from-purple-500/10 to-pink-500/10',
      iconColor: 'text-primary',
      badgeBg: 'bg-primary-fixed text-primary',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {pillars.map((p) => (
        <Link
          key={p.title}
          to={p.link}
          className="group rounded-3xl bg-surface-container-lowest p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-outline-variant/30 hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full font-label-sm text-xs font-bold ${p.badgeBg}`}>
                {p.badge}
              </span>
              <span className={`material-symbols-outlined text-[28px] ${p.iconColor}`}>
                {p.icon}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-headline-sm text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                {p.title}
              </h3>
              <p className="font-label-sm text-xs text-outline font-medium">
                {p.subtitle}
              </p>
              <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-1">
                {p.desc}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-surface-container text-xs font-semibold text-primary">
            <span>Khám phá ngay</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
