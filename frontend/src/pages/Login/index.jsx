import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/todayly-logo.png';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault(); setLoading(true); setError('');
    try { await login(form); navigate('/'); }
    catch (reason) { setError(reason.response?.data?.message || 'Đăng nhập không thành công.'); }
    finally { setLoading(false); }
  };

  return <div className="page-container grid min-h-[calc(100vh-160px)] place-items-center">
    <section className="card w-full max-w-md p-6 sm:p-8">
      <img src={logo} alt="Todayly" className="mx-auto h-20 w-20 rounded-2xl object-cover" />
      <div className="mt-5 text-center"><h1 className="text-3xl font-black">Đăng nhập Todayly</h1><p className="mt-2 text-sm text-slate-500">Tiếp tục quản lý ngày mới của bạn.</p></div>
      {error && <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}
      <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block"><span className="field-label">Email</span><div className="relative"><Mail className="absolute left-3 top-3 text-slate-400" size={18} /><input type="email" required className="field pl-10" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div></label>
        <label className="block"><span className="field-label">Mật khẩu</span><div className="relative"><LockKeyhole className="absolute left-3 top-3 text-slate-400" size={18} /><input type="password" required className="field pl-10" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></div></label>
        <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}<ArrowRight size={17} /></button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">Chưa có tài khoản? <Link to="/register" className="font-bold text-brand-700">Đăng ký miễn phí</Link></p>
    </section>
  </div>;
}
