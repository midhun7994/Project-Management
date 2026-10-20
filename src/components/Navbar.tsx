import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Boxes, 
  Bell, 
  ChevronDown, 
  Menu, 
  X, 
  LogOut, 
  User as UserIcon, 
  Settings, 
  CheckCircle2, 
  FolderKanban,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const userName = user?.full_name || 'Midhun';
  const userEmail = user?.email || 'midhun@projectflow.io';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Projects', path: '/projects' },
    { name: 'Kanban', path: '/kanban' },
    { name: 'Team Chat', path: '/chat' },
    { name: 'Settings', path: '/settings' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <div className="fixed top-5 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-[1150px] h-[64px] bg-slate-900/80 backdrop-blur-2xl border border-slate-700/60 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.4)] px-5 flex items-center justify-between transition-all duration-300">
        
        {/* LEFT: Logo & Brand */}
        <div 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <Boxes className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
            Project<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Flow</span>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full hidden sm:inline-block">
              PRO
            </span>
          </span>
        </div>

        {/* CENTER: Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1.5 rounded-full border border-slate-800/80">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: User & Notification Actions */}
        <div className="flex items-center gap-2.5">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700/50"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </button>

            {/* Notification Drawer */}
            {notificationOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-indigo-400" /> Notifications
                  </span>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-semibold px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors text-xs space-y-1 border border-slate-700/40">
                    <p className="font-semibold text-slate-100">Task assigned by Alex</p>
                    <p className="text-slate-400 text-[11px]">"Implement Argon2id security policy"</p>
                    <span className="text-[10px] text-indigo-400">10 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors text-xs space-y-1 border border-slate-700/40">
                    <p className="font-semibold text-slate-100">Project status updated</p>
                    <p className="text-slate-400 text-[11px]">Cinematic SaaS UI is 92% complete</p>
                    <span className="text-[10px] text-indigo-400">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-all text-slate-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-inner">
                {userInitials}
              </div>
              <span className="text-xs font-semibold text-slate-100 hidden sm:inline max-w-[100px] truncate">
                {userName}
              </span>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <div className="px-3 py-2.5 border-b border-slate-800">
                  <p className="text-xs font-bold text-white truncate">{userName}</p>
                  <p className="text-[11px] text-slate-400 truncate">{userEmail}</p>
                </div>
                <button
                  onClick={() => { navigate('/settings'); setUserDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
                >
                  <Settings size={15} /> Account Settings
                </button>
                <button
                  onClick={() => { navigate('/projects'); setUserDropdownOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors"
                >
                  <FolderKanban size={15} /> My Projects
                </button>
                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-24 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-4 shadow-2xl space-y-2 pointer-events-auto md:hidden z-40 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
