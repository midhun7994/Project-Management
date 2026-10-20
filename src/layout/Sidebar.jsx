import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  KanbanSquare, 
  MessageSquare, 
  Bell, 
  Settings, 
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Boxes,
  Zap
} from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: null },
  { name: 'Projects', path: '/projects', icon: FolderKanban, badge: '6' },
  { name: 'Kanban Board', path: '/kanban', icon: KanbanSquare, badge: 'Live' },
  { name: 'Team Chat', path: '/chat', icon: MessageSquare, badge: '3' },
  { name: 'Notifications', path: '/notifications', icon: Bell, badge: '2' },
  { name: 'Settings', path: '/settings', icon: Settings, badge: null },
  { name: 'Admin Console', path: '/admin', icon: ShieldAlert, badge: 'Root' },
];

export const Sidebar = ({ collapsed, onToggle }) => {
  const { user } = useAuthStore();

  const name = user?.full_name || 'Midhun (Lead Arch)';
  const role = user?.role ? user.role.replace(/_/g, ' ') : 'Administrator';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <aside 
      className={`fixed left-0 top-0 z-30 h-screen bg-slate-900/95 backdrop-blur-2xl text-slate-100 transition-all duration-300 flex flex-col border-r border-slate-800/80 shadow-2xl ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 shrink-0">
            <Boxes className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                Project<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Flow</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">v1.2</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">Enterprise Workspace</span>
            </div>
          )}
        </div>
        <button 
          onClick={onToggle}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden md:block"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Workspace Quick Tag */}
      {!collapsed && (
        <div className="mx-3 mt-4 px-3 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="font-semibold text-slate-200 truncate">Acme Core Platform</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">Pro</span>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon className={`h-5 w-5 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.badge === 'Live' || item.badge === 'Root'
                        ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Pro Badge Feature Box */}
      {!collapsed && (
        <div className="mx-3 mb-3 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/20 space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
            <Zap size={14} className="text-amber-400" />
            <span>High Concurrency API</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Connected to PostgreSQL async cluster with zero-downtime cache.
          </p>
        </div>
      )}

      {/* Bottom Profile Summary */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/70">
        <NavLink 
          to="/settings"
          className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-800/60 transition-colors group"
        >
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              {initials}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-indigo-300 transition-colors">{name}</span>
              <span className="text-[10px] text-indigo-400 font-medium capitalize truncate">{role}</span>
            </div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;