import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Sparkles, Bell, User, Menu, X, LogOut, Settings, Globe } from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';

export const SupernovaNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userName = user?.full_name || 'Midhun';
  const userInitials = userName.substring(0, 2).toUpperCase();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Universe', path: '/supernova' },
    { name: 'Analytics', path: '/projects' },
    { name: 'Activity', path: '/kanban' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-[1100px] h-[60px] bg-slate-950/70 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_16px_50px_rgba(0,0,0,0.6)] px-6 flex items-center justify-between transition-all duration-300">
        
        {/* Logo */}
        <div 
          onClick={() => navigate('/supernova')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Sparkles size={18} />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
            Nova<span className="text-cyan-400 font-light">3D</span>
          </span>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-white/5">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right User & Actions */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-900/80 border border-white/10 hover:bg-slate-800 transition-colors text-white"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                {userInitials}
              </div>
              <span className="text-xs font-semibold hidden sm:inline">{userName}</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 space-y-1 text-xs">
                <button
                  onClick={() => { navigate('/settings'); setUserMenuOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
                >
                  <Settings size={14} /> Settings
                </button>
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:bg-rose-500/10 rounded-xl"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default SupernovaNavbar;
