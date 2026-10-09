import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, updatePreferences, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [preferences, setPreferences] = useState({
    theme: user?.preferences?.theme || 'light',
    notificationEnabled: user?.preferences?.notificationEnabled ?? true,
    dailyReminderTime: user?.preferences?.dailyReminderTime || '07:30',
    primaryInterest: user?.preferences?.primaryInterest || 'Làm việc & Ẩm thực',
  });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updatePreferences(preferences);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Không thể lưu cài đặt, vui lòng thử lại.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-5xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2 border-b border-surface-container">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-semibold w-fit">
              <span className="material-symbols-outlined text-[16px]">account_circle</span>
              <span>Quản Lý Tài Khoản</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl tracking-tight text-on-surface font-extrabold">
              Hồ Sơ Của Bạn 👤
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Tùy chỉnh thông tin cá nhân và thiết lập ưu tiên sinh hoạt hàng ngày.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-error/30 text-error hover:bg-error-container/20 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Đăng xuất</span>
          </button>
        </div>

        {/* User Card */}
        <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
              }
              alt={user?.name || 'User'}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-fixed"
            />
            <div className="flex flex-col">
              <h2 className="font-headline-lg text-xl font-bold text-on-surface">
                {user?.name || 'Người dùng Todayly'}
              </h2>
              <p className="text-sm text-on-surface-variant">{user?.email || 'email@example.com'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-secondary text-xs font-bold uppercase tracking-wider">
                  {user?.role || 'Thành viên'}
                </span>
                <span className="text-xs text-outline">
                  Gia nhập: {new Date(user?.createdAt || Date.now()).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs sm:text-sm font-semibold transition-colors cursor-pointer self-start sm:self-center"
          >
            {isEditing ? 'Đóng chỉnh sửa' : 'Chỉnh sửa tùy chọn'}
          </button>
        </div>

        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-primary-fixed/50 text-primary text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Cập nhật tùy chọn thành công!</span>
          </div>
        )}

        {/* Preferences Form */}
        <form
          onSubmit={handleSave}
          className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between border-b border-surface-container pb-4">
            <h3 className="font-headline-md text-lg font-bold text-on-surface">
              Tùy Chọn Cá Nhân Hóa
            </h3>
            <span className="text-xs text-outline">Đồng bộ tự động vào đám mây</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Trụ cột bạn quan tâm nhất
              </label>
              <select
                disabled={!isEditing}
                value={preferences.primaryInterest}
                onChange={(e) => setPreferences({ ...preferences, primaryInterest: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm disabled:opacity-60"
              >
                <option value="Làm việc & Ẩm thực">Cân bằng làm việc & ăn ngon</option>
                <option value="Khám phá điểm hẹn">Quán cafe & Dạo mát bờ biển</option>
                <option value="Thời trang theo thời tiết">Mặc đẹp mỗi ngày</option>
                <option value="Quản lý thời gian">Pomodoro & Kế hoạch chi tiết</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Thời gian nhắc nhở lịch trình buổi sáng
              </label>
              <input
                type="time"
                disabled={!isEditing}
                value={preferences.dailyReminderTime}
                onChange={(e) => setPreferences({ ...preferences, dailyReminderTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm disabled:opacity-60"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="font-label-md text-sm font-semibold text-on-surface">
                Nhận thông báo lịch trình hàng ngày
              </span>
              <span className="text-xs text-on-surface-variant">
                Nhắc nhở nhẹ nhàng vào mỗi buổi sáng
              </span>
            </div>
            <input
              type="checkbox"
              disabled={!isEditing}
              checked={preferences.notificationEnabled}
              onChange={(e) => setPreferences({ ...preferences, notificationEnabled: e.target.checked })}
              className="w-5 h-5 accent-primary cursor-pointer disabled:opacity-60"
            />
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-outline hover:bg-surface-container font-semibold text-sm cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container cursor-pointer shadow-xs"
              >
                Lưu thay đổi
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
