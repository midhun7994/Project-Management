import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  LogOut, 
  Menu, 
  Command, 
  Settings, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/authStore';
import CommandPalette from '../components/common/CommandPalette';

interface HeaderProps {
  onMobileMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  const userName = user?.full_name || 'Midhun S.';
  const userRole = user?.role ? user.role.replace(/_/g, ' ') : 'Product Lead';
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-black/50 backdrop-blur-xl border-b border-zinc-800/80 px-4 md:px-8 flex items-center justify-between transition-colors">
        
        {/* Left Section: Mobile Menu + Minimal Search Trigger */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onMobileMenuClick}
            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>

          {/* Minimal Search Button */}
          <div 
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-2.5 bg-zinc-900/80 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 px-3.5 py-1.5 rounded-xl border border-zinc-800/80 cursor-pointer transition-all duration-200 w-44 sm:w-72 group"
          >
            <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            <span className="text-xs truncate flex-1 font-normal">Search projects or tasks...</span>
            <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-black border border-zinc-800 text-[10px] font-mono text-zinc-400">
              <Command size={10} />
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Right Section: Status Indicator & User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Smooth Running Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-beacon" />
            <span className="text-[11px] font-medium text-zinc-300">Sprint 4 • 24 Tasks Active</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifMenuRef}>
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
              aria-label="View notifications"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            </button>

            {/* Notification Popover */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50 animate-page">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold text-white">Notifications</h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700">2 New</span>
                  </div>
                  <button 
                    onClick={() => {
                      setIsNotifOpen(false);
                      navigate('/notifications');
                    }}
                    className="text-xs text-zinc-400 hover:text-white font-medium flex items-center gap-1"
                  >
                    View all <ExternalLink size={12} />
                  </button>
                </div>

                <div className="py-2 space-y-2">
                  <div className="p-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 transition-colors border border-zinc-800/60 cursor-pointer">
                    <p className="text-xs font-medium text-zinc-200">You were assigned to <span className="text-white font-semibold">ENG-104</span> (Async engine)</p>
                    <span className="text-[10px] text-zinc-500 mt-1 block">5 minutes ago</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 transition-colors border border-zinc-800/40 cursor-pointer">
                    <p className="text-xs font-medium text-zinc-200">Sprint velocity updated to 94%</p>
                    <span className="text-[10px] text-zinc-500 mt-1 block">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-zinc-800 mx-0.5 sm:mx-1"></div>

          {/* User Profile Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-zinc-900 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center font-semibold text-[11px] shadow-sm">
                {userInitials}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-medium text-zinc-200 truncate max-w-[120px]">{userName}</span>
                <span className="text-[10px] text-zinc-500 font-medium capitalize truncate">{userRole}</span>
              </div>
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl py-1.5 z-50 animate-page">
                <div className="px-3.5 py-2 border-b border-zinc-800">
                  <p className="text-xs font-medium text-white truncate">{userName}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{user?.email || 'admin@projectflow.io'}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
                  >
                    <Settings size={13} className="text-zinc-500" />
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/admin');
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
                  >
                    <Sparkles size={13} className="text-zinc-500" />
                    Admin Settings
                  </button>
                </div>

                <div className="border-t border-zinc-800 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut size={13} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)} 
      />
    </>
  );
};

export default Header;
