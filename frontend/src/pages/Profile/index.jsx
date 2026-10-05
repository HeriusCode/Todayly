import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, updateUserPreferences } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    city: '',
    wakeUpTime: '06:30',
    sleepTime: '23:00',
    dietaryPreference: 'Thanh đạm, ít ngọt',
    favoriteStyle: 'Smart-Casual',
    transportation: 'Xe máy & Đi bộ',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        city: user.city || '',
        wakeUpTime: user.wakeUpTime || '06:30',
        sleepTime: user.sleepTime || '23:00',
        dietaryPreference: user.dietaryPreference || 'Thanh đạm, ít ngọt',
        favoriteStyle: user.favoriteStyle || 'Smart-Casual',
        transportation: user.transportation || 'Xe máy & Đi bộ',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserPreferences(profileData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert('Không thể lưu cài đặt, vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto px-gutter py-8 flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-bold uppercase tracking-wider">
              Cá nhân hóa • Giai đoạn 1 Kết nối Backend
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold mt-1">
            Hồ Sơ & Cài Đặt Sở Thích ⚙️
          </h1>
          <p className="font-body-md text-on-surface-variant mt-1">
            Tùy chỉnh thói quen sinh hoạt và khẩu vị để thuật toán AI đưa ra gợi ý khớp nhất với nhịp sống của bạn.
          </p>
        </div>

        <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-10 shadow-sm border border-outline-variant/30 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-surface-container">
            <div className="relative">
              <img
                alt={profileData.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 shadow-md"
                src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5'}
              />
            </div>

            <div className="flex flex-col text-center sm:text-left gap-1">
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
                {profileData.name || 'Người dùng'}
              </h2>
              <span className="font-body-sm text-sm text-on-surface-variant">
                {profileData.email}
              </span>
              <span className="font-label-sm text-xs px-2.5 py-0.5 rounded-full bg-secondary-fixed text-secondary font-bold w-fit mx-auto sm:mx-0">
                Đã đồng bộ Cơ sở dữ liệu 🌐
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-on-surface font-label-md text-sm font-semibold mb-1.5">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="block text-on-surface font-label-md text-sm font-semibold mb-1.5">
                  Thành phố hiện tại
                </label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-on-surface font-label-md text-sm font-semibold mb-1.5">
                Giới thiệu ngắn
              </label>
              <textarea
                rows={2}
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm"
              />
            </div>

            <div className="pt-4 border-t border-surface-container">
              <h3 className="font-headline-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">bedtime</span>
                Nhịp Sinh Học Cá Nhân
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-on-surface font-label-sm text-xs font-semibold mb-1.5">
                    Giờ thức dậy thông thường
                  </label>
                  <input
                    type="time"
                    value={profileData.wakeUpTime}
                    onChange={(e) => setProfileData({ ...profileData, wakeUpTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                <div>
                  <label className="block text-on-surface font-label-sm text-xs font-semibold mb-1.5">
                    Giờ đi ngủ mục tiêu
                  </label>
                  <input
                    type="time"
                    value={profileData.sleepTime}
                    onChange={(e) => setProfileData({ ...profileData, sleepTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-container">
              <h3 className="font-headline-sm font-bold text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">tune</span>
                Sở Thích Lối Sống
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-on-surface font-label-sm text-xs font-semibold mb-1.5">
                    Khẩu vị ẩm thực
                  </label>
                  <select
                    value={profileData.dietaryPreference}
                    onChange={(e) => setProfileData({ ...profileData, dietaryPreference: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="Thanh đạm, ít ngọt">Thanh đạm, ít ngọt</option>
                    <option value="Ăn chay / Thuần chay">Ăn chay / Thuần chay</option>
                    <option value="Đậm đà truyền thống">Đậm đà truyền thống</option>
                    <option value="Eat clean & Healthy">Eat clean & Healthy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-on-surface font-label-sm text-xs font-semibold mb-1.5">
                    Phong cách trang phục
                  </label>
                  <select
                    value={profileData.favoriteStyle}
                    onChange={(e) => setProfileData({ ...profileData, favoriteStyle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="Smart-Casual">Smart-Casual</option>
                    <option value="Minimalist">Minimalist (Tối giản)</option>
                    <option value="Sporty">Sporty (Năng động)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-on-surface font-label-sm text-xs font-semibold mb-1.5">
                    Phương tiện di chuyển
                  </label>
                  <select
                    value={profileData.transportation}
                    onChange={(e) => setProfileData({ ...profileData, transportation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="Xe máy & Đi bộ">Xe máy & Đi bộ</option>
                    <option value="Ô tô cá nhân">Ô tô cá nhân</option>
                    <option value="Xe đạp & Đi bộ">Xe đạp & Đi bộ</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-surface-container mt-2">
              <span className="text-xs text-primary font-bold">
                {savedSuccess ? '✅ Đã lưu cài đặt lên máy chủ thành công!' : ''}
              </span>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold transition-all shadow-md cursor-pointer disabled:opacity-70"
              >
                {isSaving ? 'Đang lưu...' : 'Lưu cài đặt sở thích'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
