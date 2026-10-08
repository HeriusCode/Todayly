import { CloudSun, LocateFixed, MapPin, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';
import { weatherService } from '../../services/weatherService';
import { formatVietnameseDate } from '../../utils/dates';

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState('Đang lấy vị trí hiện tại...');
  const [now, setNow] = useState(() => new Date());
  const load = async () => { setMessage('Đang lấy vị trí hiện tại...'); try { setWeather(await weatherService.getCurrentForDevice()); setMessage(''); } catch (error) { setMessage(error.code === 1 ? 'Bạn chưa cho phép truy cập vị trí.' : error.response?.data?.message || error.message); } };
  useEffect(() => { let active = true; weatherService.getCurrentForDevice().then((data) => { if (active) { setWeather(data); setMessage(''); } }).catch((error) => { if (active) setMessage(error.code === 1 ? 'Bạn chưa cho phép truy cập vị trí.' : error.response?.data?.message || error.message); }); const timer = setInterval(() => setNow(new Date()), 1000); return () => { active = false; clearInterval(timer); }; }, []);
  return <section className="card bg-gradient-to-br from-blue-50 to-violet-50 p-5 sm:p-6"><div className="flex items-start justify-between gap-3"><div><span className="text-sm text-slate-500">{formatVietnameseDate(now, { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span><strong className="mt-1 block text-lg">{now.toLocaleTimeString('vi-VN')}</strong><span className="mt-2 flex items-center gap-1.5 font-bold"><MapPin size={17} className="text-brand-600" />{weather?.location || message}</span></div><button type="button" onClick={load} className="cursor-pointer rounded-2xl bg-white p-3 text-amber-500 shadow-sm" title="Lấy lại vị trí"><LocateFixed size={22} /></button></div>{weather && <><div className="mt-5 flex items-center gap-3"><CloudSun size={34} className="text-amber-500" /><strong className="text-3xl">{weather.temperature}°C</strong><span className="text-sm font-semibold text-slate-600">{weather.condition}</span></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/80 p-3 text-sm"><span className="block text-slate-500">Độ ẩm</span><strong>{weather.humidity}</strong></div><div className="rounded-2xl bg-white/80 p-3 text-sm"><span className="flex items-center gap-1 text-slate-500"><Wind size={14} />Không khí</span><strong>{weather.airQuality}</strong></div></div></>}</section>;
}
