export const mockSchedule = {
  date: 'Thứ Năm, 24 Tháng 10, 2024',
  location: 'Đà Nẵng, Việt Nam',
  weather: {
    temp: '29°C',
    condition: 'Trời nắng nhẹ, gió mát ven biển 🌤',
    humidity: '68% Dễ chịu',
    airQuality: 'Tốt (AQI 32)'
  },
  stats: {
    activeHours: '7.5 giờ',
    estimatedCost: '~180.000đ',
    targetSteps: '6.200 bước',
    completionRate: '2/6 việc (33%)'
  },
  timeline: [
    {
      id: 'sch-1',
      time: '08:00 – 09:30',
      title: '💻 Học lập trình React & Tailwind CSS',
      location: 'Góc học tập tại nhà',
      note: 'Hoàn thành 2 bài thực hành',
      status: 'completed',
      type: 'task',
      badge: 'Đã hoàn thành',
      color: 'primary'
    },
    {
      id: 'sch-2',
      time: '11:30 – 12:30',
      title: '🍜 Ăn trưa Mì Quảng Ếch cùng đồng nghiệp',
      location: 'Quán Bà Mua • 850m',
      note: 'Dự trù 55.000đ',
      status: 'upcoming',
      type: 'food',
      badge: 'Gợi ý từ Lịch trình',
      color: 'secondary'
    }
  ]
};

export const mockUser = {
  name: 'Mai Linh',
  email: 'mailinh@todayly.vn',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5',
  city: 'Đà Nẵng',
  wakeUpTime: '06:30',
  sleepTime: '23:00',
  dietaryPreference: 'Thanh đạm, ít ngọt',
  favoriteStyle: 'Smart-Casual',
  transportation: 'Xe máy & Đi bộ'
};
