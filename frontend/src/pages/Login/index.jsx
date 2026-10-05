import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập không thành công, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center px-gutter py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="bg-surface-container-lowest p-6 sm:p-10 rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-bold uppercase tracking-wider mb-2">
                Chào mừng bạn quay lại
              </div>
              <h1 className="font-headline-lg text-headline-lg font-extrabold text-on-surface tracking-tight">
                Đăng Nhập Todayly 👋
              </h1>
              <p className="font-body-md text-on-surface-variant mt-1">
                Tiếp tục ngày mới cùng lịch trình và gợi ý lối sống thông minh.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-error-container text-error text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-sm font-semibold text-on-surface" htmlFor="login-email">
                  Địa chỉ Email
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">
                    mail
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-md text-sm font-semibold text-on-surface" htmlFor="login-password">
                    Mật khẩu
                  </label>
                  <a href="#" className="font-label-md text-xs text-primary hover:underline font-semibold">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">
                    lock
                  </span>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 p-1 text-outline hover:text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập ngay'}</span>
                <span className="material-symbols-outlined text-[20px]">login</span>
              </button>
            </form>

            <div className="text-center pt-4 border-t border-surface-container">
              <p className="text-xs text-on-surface-variant">
                Chưa có tài khoản hôm nay?{' '}
                <Link to="/register" className="text-primary font-bold hover:underline">
                  Đăng ký miễn phí
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex flex-col justify-center">
          <div className="relative bg-surface-container-lowest rounded-3xl p-4 sm:p-7 shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden group">
              <img
                alt="Aesthetic lifestyle"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5GDg42O8_Pj0HFuLSVIcYFzhfi-Osyh5FIJEnQqPLt0fpXDytH8Ysbvst1Pc6mXxwqvb-vpCeU2Cs74ZQICZBnnPEDUaZnaAFRo7AYyWA3ISLYq8VM7StZOzgRarvORjHpMHRj1-WvIjzvh_IXUuUh2jhEJIflKR6uY-ounNpkMs6EeNe5M5j7sPAOspTuC2kGNRU8VqFhQ8S_ZovRB1hy--6kGeQEs5bcuWPFbSu1RiQXjHq-mkf"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md self-start mb-3">
                  <span className="material-symbols-outlined text-secondary text-[16px]">format_quote</span>
                  <span className="font-label-sm text-xs text-on-surface font-bold">Cảm hứng sáng nay</span>
                </div>
                <p className="font-headline-md text-lg sm:text-xl text-white font-bold leading-snug">
                  "Mỗi ngày mới là một cơ hội để sống trọn vẹn từng khoảnh khắc."
                </p>
                <span className="text-xs text-white/80 mt-1">
                  Lắng nghe nhịp điệu của tâm trí • Lên lịch trình thảnh thơi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
