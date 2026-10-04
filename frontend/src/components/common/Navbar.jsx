import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Trang chủ' },
    { to: '/planner', label: 'Lịch trình' },
    { to: '/tasks', label: 'Hôm nay làm gì?' },
    { to: '/food', label: 'Hôm nay ăn gì?' },
    { to: '/drinks', label: 'Hôm nay uống gì?' },
    { to: '/places', label: 'Hôm nay đi đâu?' },
    { to: '/outfit', label: 'Hôm nay mặc gì?' },
    { to: '/wheel', label: 'Vòng quay' },
    { to: '/favorites', label: 'Yêu thích' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-gutter flex items-center justify-between gap-space-md max-w-7xl mx-auto">
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm cursor-pointer">
            <img
              alt="Lịch Trình Hôm Nay Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1X_cckjQ8sSo8_p6k11-pYDIHbPNhBvTWaKfI89wKBNKV8sbBOCOyj9ZA0p5SlzhxUDnYe0MhEuQQOp-i__sVVV7INsNsCNUbpv4Xpn2CgkB9FIbw3Amk9NXwpK5UiaU_pigK7A0TsM1aXlIlFg_oaAtc1Ma1ZUnXRjbkceKnr__Qs3OKQLtbH9G3xH8izHZFZXmRRzOweKCobLGAvFDHWkbljacwDDP-yCqpdhNG1ox4p7r37-VVO5nvQ"
            />
            <span className="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">
              Lịch Trình Hôm Nay
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary text-label-sm font-label-sm uppercase tracking-wider">
              Beta
            </span>
          </Link>

          <nav className="hidden 2xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                    isActive
                      ? 'bg-surface-container text-primary font-bold shadow-[0_2px_8px_rgba(53,37,205,0.08)]'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-space-sm">
          <Link
            to="/planner"
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container px-4 py-2 rounded-full font-label-md text-label-md transition-all shadow-[0_4px_14px_rgba(79,70,229,0.25)]"
          >
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span className="hidden sm:inline">Lập kế hoạch hôm nay</span>
          </Link>

          <div className="relative pl-1">
            {isAuthenticated && user ? (
              <div>
                <button
                  aria-label="Hồ sơ người dùng"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full p-1 hover:bg-surface-container-high transition-all cursor-pointer"
                >
                  <img
                    alt={user.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                    src={user.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5'}
                  />
                  <span className="hidden xl:inline font-label-md text-label-md text-on-surface font-semibold">
                    {user.name}
                  </span>
                  <span className="material-symbols-outlined text-outline text-[16px]">expand_more</span>
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-surface-container-lowest p-2 shadow-[0_12px_30px_-4px_rgba(15,23,42,0.12)] z-50 flex flex-col gap-1 border border-outline-variant/30"
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">person</span>
                      Hồ sơ & Sở thích
                    </Link>
                    <Link
                      to="/journal"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">book</span>
                      Nhật ký cuối ngày
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">bookmark</span>
                      Đã lưu yêu thích
                    </Link>
                    <div className="h-[1px] bg-surface-container my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                        navigate('/login');
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-error font-label-md text-label-md hover:bg-error-container hover:text-on-error-container transition-colors w-full text-left cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-on-surface font-label-md text-label-md hover:text-primary transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-surface-container 2xl:hidden text-on-surface"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="2xl:hidden bg-surface-container-lowest border-t border-surface-container px-6 py-4 flex flex-col gap-2 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl font-label-md text-label-md flex items-center justify-between ${
                  isActive ? 'bg-surface-container text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'
                }`
              }
            >
              <span>{link.label}</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
