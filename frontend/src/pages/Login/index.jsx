import React, { useState } from 'react';
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
    <div className="w-full flex-1 flex items-center justify-center px-gutter py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Form Card */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-sm border border-outline-variant/30 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-sm text-xs font-bold uppercase tracking-wider w-fit">
              Chào mừng trở lại
            </span>
            <h1 className="font-display-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              Đăng Nhập Todayly ✨
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant">
              Khởi động ngày mới với kế hoạch sống thông minh và tràn đầy năng lượng.
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
              <label className="font-label-md text-sm font-semibold text-on-surface">
                Địa chỉ Email
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">
                  mail
                </span>
                <input
                  type="email"
                  required
                  placeholder="yourname@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-sm font-semibold text-on-surface">
                  Mật khẩu
                </label>
                <a href="#" className="font-label-sm text-xs text-primary font-semibold hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-outline hover:text-on-surface cursor-pointer"
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
              <span>{isLoading ? 'Đang xác thực...' : 'Đăng nhập vào Todayly'}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>

          <div className="text-center pt-2 border-t border-surface-container">
            <p className="text-xs text-on-surface-variant">
              Chưa có tài khoản Todayly?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Đăng ký tài khoản mới
              </Link>
            </p>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="lg:col-span-6 relative hidden lg:flex flex-col justify-center">
          <div className="relative bg-surface-container-lowest rounded-3xl p-4 sm:p-7 shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="relative w-full h-[440px] rounded-2xl overflow-hidden group">
              <img
                alt="Mindful living"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md self-start mb-3">
                  <span className="material-symbols-outlined text-primary text-[16px]">eco</span>
                  <span className="font-label-sm text-xs text-on-surface font-bold">
                    Lối sống tích cực
                  </span>
                </div>
                <p className="font-headline-md text-lg text-white font-bold leading-snug">
                  "Bắt đầu ngày mới với sự thảnh thơi, không còn nỗi lo 'Hôm nay ăn gì, đi đâu, làm gì'."
                </p>
                <span className="text-xs text-white/80 mt-1">
                  Đồng hành cùng hơn 10.000 bạn trẻ tại Việt Nam
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
