import { ChevronDown, LogOut, Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/todayly-logo.png';

const links = [
  { to: '/', label: 'Trang chủ' },
  { to: '/planner', label: 'Lịch trình' },
  { to: '/tasks', label: 'Hôm nay làm gì?' },
  { to: '/food', label: 'Ăn gì?' },
  { to: '/places', label: 'Đi đâu?' },
  { to: '/outfit', label: 'Mặc gì?' },
  { to: '/favorites', label: 'Yêu thích' },
];

const navClass = ({ isActive }) => `rounded-xl px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`;

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = () => { logout(); setProfileOpen(false); navigate('/login'); };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img src={logo} alt="Todayly" className="h-11 w-11 rounded-xl object-cover" />
            <div className="hidden sm:block">
              <strong className="block text-base leading-none text-slate-950">Todayly</strong>
              <span className="text-[10px] font-semibold tracking-[.2em] text-slate-400">MAKE TODAY BETTER</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 xl:flex">
            {links.map((link) => <NavLink key={link.to} to={link.to} className={navClass}>{link.label}</NavLink>)}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link to="/planner" className="btn-primary hidden sm:inline-flex"><Sparkles size={17} />Lập kế hoạch</Link>
          {isAuthenticated ? (
            <div className="relative">
              <button type="button" onClick={() => setProfileOpen((value) => !value)} className="flex cursor-pointer items-center gap-2 rounded-xl p-2 hover:bg-slate-100">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 font-bold text-brand-700">{user?.name?.[0]?.toUpperCase() || 'T'}</span>
                <span className="hidden text-sm font-semibold lg:block">{user?.name}</span><ChevronDown size={16} />
              </button>
              {profileOpen && <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <Link to="/profile" onClick={() => setProfileOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold hover:bg-slate-50">Hồ sơ & sở thích</Link>
                <button type="button" onClick={signOut} className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut size={16} />Đăng xuất</button>
              </div>}
            </div>
          ) : <div className="hidden items-center gap-2 sm:flex"><Link to="/login" className="btn-secondary">Đăng nhập</Link><Link to="/register" className="btn-primary">Đăng ký</Link></div>}
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="cursor-pointer rounded-xl p-2 hover:bg-slate-100 xl:hidden" aria-label="Mở menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-slate-200 bg-white p-4 xl:hidden">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-1 sm:grid-cols-2">
          {links.map((link) => <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className={navClass}>{link.label}</NavLink>)}
          {!isAuthenticated && <><NavLink to="/login" className={navClass}>Đăng nhập</NavLink><NavLink to="/register" className={navClass}>Đăng ký</NavLink></>}
        </div>
      </nav>}
    </header>
  );
}
