import { Save, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { useAuth } from '../../hooks/useAuth';

const defaults = { name: '', email: '', bio: '', city: '', wakeUpTime: '06:30', sleepTime: '23:00', dietaryPreference: 'Thanh đạm, ít ngọt', favoriteStyle: 'Smart-Casual', transportation: 'Xe máy & Đi bộ' };

function ProfileForm({ user, onSave }) {
  const [form, setForm] = useState({ ...defaults, ...user });
  const [status, setStatus] = useState('');
  const set = (name) => (event) => setForm({ ...form, [name]: event.target.value });
  const submit = async (event) => { event.preventDefault(); setStatus('Đang lưu...'); try { await onSave(form); setStatus('Đã lưu hồ sơ thành công.'); } catch { setStatus('Không thể lưu hồ sơ.'); } };
  return <form onSubmit={submit} className="card space-y-6 p-6 sm:p-8">
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="field-label">Họ và tên</label><input className="field" value={form.name} onChange={set('name')} /></div><div><label className="field-label">Email</label><input className="field opacity-70" value={form.email} disabled /></div><div><label className="field-label">Thành phố</label><input className="field" value={form.city} onChange={set('city')} /></div><div><label className="field-label">Phong cách</label><select className="field" value={form.favoriteStyle} onChange={set('favoriteStyle')}><option>Smart-Casual</option><option>Minimalist</option><option>Sporty</option></select></div></div>
    <div><label className="field-label">Giới thiệu</label><textarea className="field" rows="3" value={form.bio} onChange={set('bio')} /></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div><label className="field-label">Giờ thức dậy</label><input type="time" className="field" value={form.wakeUpTime} onChange={set('wakeUpTime')} /></div><div><label className="field-label">Giờ đi ngủ</label><input type="time" className="field" value={form.sleepTime} onChange={set('sleepTime')} /></div><div><label className="field-label">Khẩu vị</label><select className="field" value={form.dietaryPreference} onChange={set('dietaryPreference')}><option>Thanh đạm, ít ngọt</option><option>Ăn chay / Thuần chay</option><option>Đậm đà truyền thống</option></select></div><div><label className="field-label">Di chuyển</label><select className="field" value={form.transportation} onChange={set('transportation')}><option>Xe máy & Đi bộ</option><option>Ô tô cá nhân</option><option>Xe đạp & Đi bộ</option></select></div></div>
    <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-5"><span className="text-sm font-semibold text-brand-700">{status}</span><button className="btn-primary" type="submit"><Save size={17} />Lưu thay đổi</button></div>
  </form>;
}

export default function Profile() {
  const { user, isAuthenticated, updateUserPreferences } = useAuth();
  if (!isAuthenticated) return <div className="page-container"><div className="card p-10 text-center"><UserRound className="mx-auto text-brand-600" size={38} /><h1 className="mt-4 text-2xl font-black">Bạn chưa đăng nhập</h1><Link to="/login" className="btn-primary mt-5">Đăng nhập</Link></div></div>;
  return <div className="page-container max-w-5xl space-y-6"><PageHeader eyebrow="Cá nhân hóa" title="Hồ Sơ & Sở Thích ⚙️" description="Cập nhật thông tin để Todayly đưa ra gợi ý phù hợp hơn." /><ProfileForm key={user.id || user.email} user={user} onSave={updateUserPreferences} /></div>;
}
