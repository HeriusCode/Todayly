import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    primaryInterest: 'Làm việc & Ẩm thực',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    setIsLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký không thành công, vui lòng thử lại.');
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-sm text-xs font-bold uppercase tracking-wider mb-2">
                Bắt đầu hành trình
              </div>
              <h1 className="font-headline-lg text-headline-lg font-extrabold text-on-surface tracking-tight">
                Tạo Tài Khoản Mới ✨
              </h1>
              <p className="font-body-md text-on-surface-variant mt-1">
                Gia nhập cộng đồng Todayly để nhận lịch trình thông minh mỗi sáng.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-error-container text-error text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-sm font-semibold text-on-surface">
                  Họ và tên của bạn *
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Mai Linh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-sm font-semibold text-on-surface">
                  Địa chỉ Email *
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-4 text-outline text-[20px]">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="mailinh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-sm font-semibold text-on-surface">
                    Mật khẩu *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-sm font-semibold text-on-surface">
                    Nhập lại mật khẩu *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-surface-container-low rounded-2xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <span>{isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký ngay'}</span>
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
              </button>
            </form>

            <div className="text-center pt-4 border-t border-surface-container">
              <p className="text-xs text-on-surface-variant">
                Đã có tài khoản Todayly?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex flex-col justify-center">
          <div className="relative bg-surface-container-lowest rounded-3xl p-4 sm:p-7 shadow-sm border border-outline-variant/30 overflow-hidden">
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden group">
              <img
                alt="Mindful living"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <p className="font-headline-md text-lg sm:text-xl text-white font-bold leading-snug">
                  "Bắt đầu ngày mới với sự thảnh thơi, không còn nỗi lo hôm nay làm gì, ăn gì."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
