import { useMemo, useState } from 'react';
import { CalendarDays, Eye, EyeOff, LockKeyhole, Mail, Rocket, ShieldCheck, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShowcase from '../../components/auth/AuthShowcase';
import GoogleIcon from '../../components/auth/GoogleIcon';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const update = (name) => (event) => setForm((current) => ({ ...current, [name]: event.target.value }));
  const strength = useMemo(() => Math.min(4, [form.password.length >= 8, /[A-Z]/.test(form.password), /\d/.test(form.password), /[^A-Za-z0-9]/.test(form.password)].filter(Boolean).length), [form.password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) return setError('Mật khẩu xác nhận không khớp.');
    if (!accepted) return setError('Bạn cần đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.');
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký không thành công. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page auth-register-page">
      <span className="auth-ambient auth-ambient-one" aria-hidden="true" />
      <span className="auth-ambient auth-ambient-two" aria-hidden="true" />
      <span className="auth-ambient auth-ambient-three" aria-hidden="true" />
      <div className="auth-layout auth-register-layout">
        <section className="auth-form-panel auth-reveal auth-reveal-left">
          <div className="auth-brand"><span><CalendarDays size={27} /></span><div><strong>Todayly</strong><small>Make Today Better</small></div></div>
          <header className="auth-heading"><h1>Bắt đầu ngày mới trọn vẹn! ✨</h1><p>Tạo tài khoản để cùng Todayly lên lịch trình cân bằng giữa công việc, ẩm thực, dạo chơi và phong cách mỗi ngày.</p></header>
          <button type="button" className="auth-google" onClick={() => setError('Đăng ký Google chưa được cấu hình. Vui lòng đăng ký bằng email.')}><GoogleIcon />Đăng ký nhanh với Google</button>
          <div className="auth-divider"><span>Hoặc đăng ký bằng email</span></div>
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form auth-register-form">
            <label><span>Họ và tên <small>Bắt buộc</small></span><div className="auth-input"><UserRound size={20} /><input type="text" required autoComplete="name" placeholder="Ví dụ: Nguyễn Mai Linh" value={form.name} onChange={update('name')} /></div></label>
            <label><span>Địa chỉ Email <small>Dùng để kích hoạt</small></span><div className="auth-input"><Mail size={20} /><input type="email" required autoComplete="email" placeholder="mailinh@example.com" value={form.email} onChange={update('email')} /></div></label>
            <div className="auth-password-row"><label><span>Mật khẩu</span><div className="auth-input"><LockKeyhole size={19} /><input type={showPassword ? 'text' : 'password'} minLength="8" required autoComplete="new-password" placeholder="Tối thiểu 8 ký tự" value={form.password} onChange={update('password')} /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label><label><span>Xác nhận mật khẩu</span><div className="auth-input"><ShieldCheck size={19} /><input type={showPassword ? 'text' : 'password'} minLength="8" required autoComplete="new-password" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={update('confirmPassword')} /></div></label></div>
            <div className="password-strength"><div><span>Độ an toàn mật khẩu</span><strong>{strength >= 4 ? 'Mạnh' : strength >= 2 ? 'Trung bình' : 'Cần mạnh hơn'}</strong></div><div>{[1, 2, 3, 4].map((part) => <i key={part} className={part <= strength ? 'active' : ''} />)}</div></div>
            <label className="auth-check"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} /><span>Tôi đồng ý với <a href="#terms">Điều khoản dịch vụ</a> và <a href="#privacy">Chính sách bảo mật quyền riêng tư</a> của Todayly.</span></label>
            <label className="auth-check auth-check-orange"><input type="checkbox" checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} /><span>Nhận gợi ý lịch trình thông minh, quán ngon & outfit mỗi sáng qua email.</span></label>
            <button type="submit" disabled={loading} className="auth-submit">{loading ? 'Đang tạo tài khoản…' : 'Tạo tài khoản ngay'}<Rocket size={19} /></button>
          </form>
          <div className="auth-register-bottom"><span>Đã có tài khoản hôm nay? <Link to="/login">Đăng nhập ngay →</Link></span><span><ShieldCheck size={15} /> Bảo mật chuẩn SSL</span></div>
        </section>
        <AuthShowcase variant="register" />
      </div>
    </div>
  );
}
