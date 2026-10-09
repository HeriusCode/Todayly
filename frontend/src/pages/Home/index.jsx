import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import WeatherCard from '../../components/home/WeatherCard';
import MoodBar from '../../components/home/MoodBar';
import QuickStats from '../../components/home/QuickStats';
import PillarCards from '../../components/home/PillarCards';
import TimelineSection from '../../components/home/TimelineSection';
import Modal from '../../components/common/Modal';

export default function Home() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    time: '10:00 – 11:30',
    location: '',
    category: 'Công việc',
    note: '',
  });

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivity.title) return;
    alert(`Đã thêm hoạt động: "${newActivity.title}" vào lịch trình hôm nay!`);
    setIsModalOpen(false);
    setNewActivity({
      title: '',
      time: '10:00 – 11:30',
      location: '',
      category: 'Công việc',
      note: '',
    });
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-gutter py-8 flex flex-col gap-8">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 via-primary-fixed/20 to-transparent p-6 sm:p-8 rounded-3xl border border-primary/20">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-bold w-fit">
              <span className="material-symbols-outlined text-[16px]">wb_twilight</span>
              <span>Chào buổi sáng năng lượng</span>
            </div>
            <h1 className="font-display-lg text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
              Xin chào, {user?.name || 'Bạn'}! Chúc một ngày tuyệt vời ☀️
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant">
              Hôm nay Đà Nẵng đón nắng dịu 29°C. Hãy cùng Todayly tận hưởng trọn vẹn từng khoảnh khắc nhé!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Lên lịch nhanh</span>
          </button>
        </div>

        {/* Weather & Mood */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WeatherCard />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 justify-between">
            <MoodBar />
            <QuickStats />
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface font-bold">
              4 Trụ Cột Đời Sống Cùng Todayly
            </h2>
            <span className="font-label-md text-xs text-outline">
              Cá nhân hóa theo nhịp sống
            </span>
          </div>
          <PillarCards />
        </div>

        {/* Timeline Section */}
        <TimelineSection onOpenAddModal={() => setIsModalOpen(true)} />
      </div>

      {/* Add Activity Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thêm Hoạt Động Mới Vào Hôm Nay"
      >
        <form onSubmit={handleAddActivity} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-sm font-semibold text-on-surface">
              Tên hoạt động *
            </label>
            <input
              type="text"
              required
              placeholder="VD: Họp định kỳ, Ăn trưa bún chả cá..."
              value={newActivity.title}
              onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Khung giờ
              </label>
              <input
                type="text"
                placeholder="10:00 – 11:30"
                value={newActivity.time}
                onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Phân loại
              </label>
              <select
                value={newActivity.category}
                onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
              >
                <option value="Công việc">Công việc</option>
                <option value="Ăn uống">Ăn uống</option>
                <option value="Thư giãn">Thư giãn</option>
                <option value="Học tập">Học tập</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-sm font-semibold text-on-surface">
              Địa điểm
            </label>
            <input
              type="text"
              placeholder="VD: Văn phòng, Quán cafe The May..."
              value={newActivity.location}
              onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-sm font-semibold text-on-surface">
              Ghi chú thêm
            </label>
            <textarea
              rows="2"
              placeholder="Ghi chú quan trọng..."
              value={newActivity.note}
              onChange={(e) => setNewActivity({ ...newActivity, note: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 focus:outline-none focus:border-primary text-sm resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-surface-container">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl text-outline hover:bg-surface-container font-semibold text-sm cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container cursor-pointer shadow-xs"
            >
              Thêm vào lịch
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
