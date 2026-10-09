import React, { useState } from 'react';
import { mockOutfits } from '../../data/mockOutfits';
import OutfitCard from '../../components/outfit/OutfitCard';

export default function Outfit() {
  const outfits = mockOutfits && mockOutfits.length > 0 ? mockOutfits : [
    {
      id: 'o-1',
      styleName: 'Smart-Casual Thoải Mái',
      weatherCondition: 'Nắng nhẹ • 29°C • Gió mát ven biển',
      suitableFor: 'Làm việc linh hoạt & Cà phê chiều',
      colorPalette: ['#ffffff', '#e5eeff', '#d3e4fe', '#fd761a'],
      colorNames: ['Trắng cotton', 'Xanh pastel', 'Denim sáng', 'Cam accent'],
      items: [
        { category: 'Áo trên', name: 'Áo sơ mi đũi cộc tay', icon: 'apparel', note: 'Chất liệu thoáng khí, thấm hút mồ hôi' },
        { category: 'Quần', name: 'Quần Chinos ống suông màu be', icon: 'straighten', note: 'Form rộng rãi, tôn dáng dễ di chuyển' },
        { category: 'Giày', name: 'Sneaker trắng tối giản', icon: 'steps', note: 'Êm ái cho mục tiêu 6.000 bước đi bộ' },
        { category: 'Phụ kiện', name: 'Đồng hồ dây da & Kính râm', icon: 'watch', note: 'Bảo vệ mắt dưới nắng dịu Đà Nẵng' }
      ],
      tips: 'Xịt nhẹ nước hoa hương cam chanh hoặc gỗ tuyết tùng thoang thoảng để duy trì cảm giác sảng khoái suốt ngày dài.',
    },
    {
      id: 'o-2',
      styleName: 'Minimalist Năng Động',
      weatherCondition: 'Trời trong • Nắng ráo 30°C',
      suitableFor: 'Đi lại nhiều & Gặp gỡ bạn bè',
      colorPalette: ['#1e293b', '#64748b', '#cbd5e1', '#ffffff'],
      colorNames: ['Xanh than', 'Xám ghi', 'Trắng sữa', 'Bạc kim'],
      items: [
        { category: 'Áo trên', name: 'Áo thun Polo dệt kim cao cấp', icon: 'apparel', note: 'Cổ bẻ lịch sự nhưng vẫn trẻ trung' },
        { category: 'Quần', name: 'Quần Tây cropped xắn gấu', icon: 'straighten', note: 'Chiều dài trên mắt cá chân thoáng mát' },
        { category: 'Giày', name: 'Loafer da lộn màu nâu đất', icon: 'steps', note: 'Dễ xỏ tháo, phong thái nhẹ nhàng' },
        { category: 'Phụ kiện', name: 'Túi tote vải canvas mộc', icon: 'shopping_bag', note: 'Đựng vừa laptop và sổ tay cá nhân' }
      ],
      tips: 'Nên chuẩn bị thêm một chiếc áo khoác gió mỏng nhẹ nếu có kế hoạch di chuyển qua bán đảo Sơn Trà vào lúc chiều muộn.',
    },
    {
      id: 'o-3',
      styleName: 'Chilling Nghỉ Ngơi Cuối Ngày',
      weatherCondition: 'Hoàng hôn biển mát lành • 27°C',
      suitableFor: 'Dạo biển Mỹ Khê & Ăn tối thư thái',
      colorPalette: ['#f8fafc', '#fed7aa', '#ea580c', '#334155'],
      colorNames: ['Trắng kem', 'Cam đào', 'Đất nung', 'Xanh đậm'],
      items: [
        { category: 'Áo trên', name: 'Áo phông Oversize cotton 100%', icon: 'apparel', note: 'Rộng rãi tối đa, cực kỳ dễ chịu' },
        { category: 'Quần', name: 'Quần Short linen đũi cạp chun', icon: 'straighten', note: 'Thoáng đãng hoàn hảo bên bờ biển' },
        { category: 'Giày', name: 'Sandal quai chéo thể thao', icon: 'steps', note: 'Không ngại cát biển, dễ chịu tuyệt đối' },
        { category: 'Phụ kiện', name: 'Mũ lưỡi trai phong cách vintage', icon: 'sports_baseball', note: 'Điểm nhấn cá tính, chống gió chiều' }
      ],
      tips: 'Trang phục này cực kỳ ăn ảnh khi check-in vào khung giờ vàng từ 17:00 đến 18:00 bên bờ biển.',
    }
  ];

  const [selectedOutfit, setSelectedOutfit] = useState(outfits[0]);
  const [savedOutfits, setSavedOutfits] = useState({});

  const toggleSave = (id) => {
    setSavedOutfits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isSaved = !!savedOutfits[selectedOutfit.id];

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2 border-b border-surface-container">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">checkroom</span>
              <span>Trụ cột Mặc gì • Tự tin & Hài hòa thời tiết</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
              Hôm nay mặc gì? ✨
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Gợi ý phối đồ thoáng mát, chuẩn form theo nhiệt độ 29°C và lịch trình di chuyển trong ngày của bạn.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-surface-container-lowest p-3.5 rounded-2xl shadow-xs border border-outline-variant/20">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">wb_sunny</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-xs text-outline uppercase tracking-wider">
                Thời tiết hiện tại
              </span>
              <span className="font-headline-sm text-sm font-bold text-on-surface">
                29°C • Nắng khô dịu
              </span>
            </div>
          </div>
        </div>

        {/* Selected Outfit Showcase */}
        <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm flex flex-col gap-8 border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container pb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-bold uppercase tracking-wider">
                  Gợi ý hàng đầu
                </span>
                <span className="text-secondary font-label-sm text-xs font-semibold">
                  {selectedOutfit.weatherCondition}
                </span>
              </div>
              <h2 className="font-headline-lg text-xl sm:text-2xl text-on-surface font-extrabold mt-1">
                {selectedOutfit.styleName}
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant">
                Mục đích: {selectedOutfit.suitableFor}
              </p>
            </div>

            <button
              type="button"
              onClick={() => toggleSave(selectedOutfit.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-sm transition-colors cursor-pointer self-start sm:self-center"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isSaved ? 'text-primary' : ''
                }`}
              >
                {isSaved ? 'bookmark' : 'bookmark_border'}
              </span>
              <span>{isSaved ? 'Đã lưu' : 'Lưu set đồ'}</span>
            </button>
          </div>

          {/* Clothing Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedOutfit.items?.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-surface-container-low flex flex-col gap-3 border border-outline-variant/20 hover:shadow-xs transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-2xs">
                  <span className="material-symbols-outlined text-[24px]">
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs text-outline uppercase font-semibold">
                    {item.category}
                  </span>
                  <h4 className="font-headline-sm text-sm font-bold text-on-surface mt-0.5">
                    {item.name}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Palette & Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-container">
            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-xs text-outline uppercase font-bold tracking-wider">
                Bảng màu gợi ý cho set đồ
              </span>
              <div className="flex items-center gap-3">
                {selectedOutfit.colorPalette?.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className="w-12 h-12 rounded-2xl shadow-2xs border border-outline-variant/40"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-label-sm text-xs text-on-surface-variant">
                      {selectedOutfit.colorNames?.[idx] || color}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-1.5 justify-center">
              <span className="font-label-sm text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  tips_and_updates
                </span>
                Lời khuyên thời trang hôm nay
              </span>
              <p className="font-body-sm text-sm text-on-surface-variant">
                {selectedOutfit.tips}
              </p>
            </div>
          </div>
        </div>

        {/* Style Selector */}
        <div className="flex flex-col gap-4">
          <h3 className="font-headline-md text-xl font-bold text-on-surface">
            Chọn Phong Cách Khác Cho Ngày Hôm Nay
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                isSelected={selectedOutfit.id === outfit.id}
                onSelect={() => setSelectedOutfit(outfit)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
