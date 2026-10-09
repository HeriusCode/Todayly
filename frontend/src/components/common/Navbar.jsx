import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Trang chủ' },
  { to: '/planner', label: 'Lịch trình' },
  { to: '/places', label: 'Khám phá' },
  { to: '/tasks', label: 'Hôm nay làm gì?' },
  { to: '/food', label: 'Hôm nay ăn gì?' },
  { to: '/drinks', label: 'Hôm nay uống gì?' },
  { to: '/places', label: 'Hôm nay đi đâu?' },
  { to: '/outfit', label: 'Hôm nay mặc gì?' },
  { to: '/favorites', label: 'Yêu thích' },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => { logout(); setProfileOpen(false); navigate('/login'); };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-gutter flex items-center justify-between gap-space-md max-w-7xl mx-auto">
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm cursor-pointer">
            <img alt="Todayly Logo" className="h-10 w-auto object-contain" src="/todayly-logo.png" />
            <span className="font-headline-md text-headline-md tracking-tight text-on-surface font-extrabold hidden sm:inline">Todayly</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary uppercase tracking-widest self-start mt-1">BETA</span>
          </Link>
          <nav className="hidden 2xl:flex items-center gap-1">{navLinks.map((link, index) => <NavLink key={`${link.to}-${index}`} to={link.to} className={({ isActive }) => `px-3 py-2 rounded-full font-label-md text-label-md transition-colors cursor-pointer ${isActive ? 'bg-primary text-on-primary font-bold shadow-xs' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}>{link.label}</NavLink>)}</nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative hidden md:flex items-center"><span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">search</span><input type="text" placeholder="Tìm kiếm điểm đến, món ăn..." className="pl-10 pr-4 py-2 w-56 lg:w-72 bg-surface-container-low rounded-full font-body-md text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all" /></div>
          <Link to="/planner" className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:shadow-md hover:bg-primary-container transition-all cursor-pointer"><span className="material-symbols-outlined text-[18px]">auto_awesome</span><span>Lập kế hoạch hôm nay</span></Link>
          {isAuthenticated ? <div className="relative"><button type="button" onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant/30"><img src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'} alt={user?.name || 'User'} className="w-8 h-8 rounded-full object-cover" /><span className="font-label-md text-sm font-semibold text-on-surface hidden lg:inline max-w-[100px] truncate">{user?.name || 'Tài khoản'}</span><span className="material-symbols-outlined text-outline text-[18px]">expand_more</span></button>{profileOpen && <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 p-2 flex flex-col gap-1 z-50"><Link to="/profile" onClick={() => setProfileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-surface-container">Hồ sơ cá nhân</Link><Link to="/favorites" onClick={() => setProfileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-surface-container">Bộ sưu tập yêu thích</Link><button type="button" onClick={handleLogout} className="px-3 py-2 rounded-lg text-error hover:bg-error-container/20 text-left">Đăng xuất</button></div>}</div> : <div className="flex items-center gap-2"><Link to="/login" className="px-4 py-2 rounded-full font-label-md text-sm font-semibold text-on-surface hover:bg-surface-container">Đăng nhập</Link><Link to="/register" className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-sm font-bold">Đăng ký</Link></div>}
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-full hover:bg-surface-container 2xl:hidden text-on-surface cursor-pointer" aria-label="Menu"><span className="material-symbols-outlined text-[24px]">{mobileMenuOpen ? 'close' : 'menu'}</span></button>
        </div>
      </div>
      {mobileMenuOpen && <div className="2xl:hidden bg-surface border-t border-outline-variant/20 px-gutter py-4 flex flex-col gap-1 shadow-lg max-h-[80vh] overflow-y-auto">{navLinks.map((link, index) => <NavLink key={`${link.to}-${index}`} to={link.to} onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `px-4 py-3 rounded-xl font-label-md text-base ${isActive ? 'bg-primary text-on-primary font-bold' : 'text-on-surface hover:bg-surface-container'}`}>{link.label}</NavLink>)}</div>}
    </header>
  );
}
