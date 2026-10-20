import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutGrid, 
  KanbanSquare, 
  MessageSquare, 
  Bell, 
  Settings, 
  Command
} from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const pillItems = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Projects', path: '/projects', icon: LayoutGrid },
  { name: 'Kanban', path: '/kanban', icon: KanbanSquare },
  { name: 'Chat', path: '/chat', icon: MessageSquare },
  { name: 'Alerts', path: '/notifications', icon: Bell },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = () => {
  const { user } = useAuthStore();

  const name = user?.full_name || 'Midhun S.';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <aside className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center bg-black/80 backdrop-blur-2xl border border-white/15 rounded-full py-5 px-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none">
      
      {/* Top Logo / Brand Pill Item */}
      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs mb-3 shadow-lg">
        <Command size={16} />
      </div>

      {/* Navigation Icons Stack */}
      <nav className="flex flex-col items-center gap-2">
        {pillItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.name}
            className={({ isActive }) =>
              `w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group ${
                isActive
                  ? 'bg-white text-black shadow-lg scale-105'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={16} className={isActive ? 'text-black' : 'text-zinc-400 group-hover:text-white'} />
                {/* Tooltip on hover */}
                <span className="absolute left-14 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-[11px] font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-50">
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="w-6 h-px bg-white/10 my-3" />

      {/* User Avatar Circle */}
      <NavLink
        to="/settings"
        title={name}
        className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 text-white flex items-center justify-center text-xs font-bold hover:scale-105 transition-all shadow-md group relative mb-2"
      >
        {initials}
        <span className="absolute left-14 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-[11px] font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-50">
          {name}
        </span>
      </NavLink>

    </aside>
  );
};

export default Sidebar;
