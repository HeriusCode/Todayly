import { useState } from 'react';
import { ArrowRight, CalendarDays, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShowcase from '../../components/auth/AuthShowcase';
import GoogleIcon from '../../components/auth/GoogleIcon';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <span className="auth-ambient auth-ambient-one" aria-hidden="true" />
      <span className="auth-ambient auth-ambient-two" aria-hidden="true" />
      <span className="auth-ambient auth-ambient-three" aria-hidden="true" />
      <div className="auth-layout auth-login-layout">
        <section className="auth-form-panel auth-reveal auth-reveal-left">
          <div className="auth-brand"><span><CalendarDays size={27} /></span><div><strong>Todayly</strong><small>Make Today Better</small></div></div>
          <header className="auth-heading"><h1>Chào mừng trở lại! ✨</h1><p>Đăng nhập để tiếp tục nhịp sống tích cực, thảnh thơi và đón nhận kế hoạch trọn vẹn từng khoảnh khắc hôm nay.</p></header>

          <button type="button" className="auth-google" onClick={() => setError('Đăng nhập Google chưa được cấu hình. Vui lòng sử dụng email và mật khẩu.')}><GoogleIcon />Tiếp tục nhanh với Google<ArrowRight size={18} /></button>
          <div className="auth-divider"><span>Hoặc tiếp tục với email</span></div>
          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label><span>Địa chỉ Email <small>Cá nhân hoặc công việc</small></span><div className="auth-input"><Mail size={20} /><input type="email" required autoComplete="email" placeholder="ban@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /></div></label>
            <label><span>Mật khẩu <Link to="/login">Quên mật khẩu?</Link></span><div className="auth-input"><LockKeyhole size={20} /><input type={showPassword ? 'text' : 'password'} required autoComplete="current-password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button></div></label>
            <label className="auth-check"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>Duy trì đăng nhập trên thiết bị này</span></label>
            <button type="submit" disabled={loading} className="auth-submit">{loading ? 'Đang xác thực…' : 'Đăng nhập ngay'}<ArrowRight size={19} /></button>
          </form>

          <div className="auth-switch">Chưa có tài khoản hôm nay? <Link to="/register">Đăng ký miễn phí</Link></div>
          <p className="auth-security"><ShieldCheck size={16} /> Bảo mật thông tin & quyền riêng tư người dùng chuẩn SSL</p>
        </section>
        <AuthShowcase variant="login" />
      </div>
    </div>
  );
}
