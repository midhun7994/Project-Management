import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  KanbanSquare,
  MessageSquare,
  Bell,
  Settings,
  ShieldAlert,
  Plus,
  LogOut,
  Command,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      category: 'Navigation',
      items: [
        { id: 'nav-dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, path: '/dashboard', badge: 'Overview' },
        { id: 'nav-projects', label: 'Projects Directory', icon: FolderKanban, path: '/projects', badge: 'Active' },
        { id: 'nav-kanban', label: 'Interactive Kanban Board', icon: KanbanSquare, path: '/kanban', badge: 'Sprint' },
        { id: 'nav-chat', label: 'Team Collaboration Chat', icon: MessageSquare, path: '/chat', badge: 'Realtime' },
        { id: 'nav-notifications', label: 'Notification Center', icon: Bell, path: '/notifications', badge: 'Updates' },
        { id: 'nav-settings', label: 'Workspace Settings', icon: Settings, path: '/settings', badge: 'Prefs' },
        ...(user?.role === 'ADMIN'
          ? [{ id: 'nav-admin', label: 'Admin Security Center', icon: ShieldAlert, path: '/admin', badge: 'Root' }]
          : []),
      ],
    },
    {
      category: 'Quick Actions',
      items: [
        {
          id: 'action-new-project',
          label: 'Create New Project',
          icon: Plus,
          action: () => {
            onClose();
            if (onCreateProject) onCreateProject();
            else navigate('/projects?create=true');
          },
          badge: 'New',
        },
        {
          id: 'action-new-task',
          label: 'Create New Task',
          icon: KanbanSquare,
          action: () => {
            onClose();
            navigate('/kanban?newTask=true');
          },
          badge: 'Kanban',
        },
        {
          id: 'action-logout',
          label: 'Sign Out Session',
          icon: LogOut,
          action: () => {
            logout();
            onClose();
            navigate('/login');
          },
          badge: 'Auth',
        },
      ],
    },
  ];

  // Flatten items for filtering
  const allItems = actions.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
          setSelectedIndex(0);
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          executeItem(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  const executeItem = (item: any) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="h-5 w-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, page, or action..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
          />
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-slate-400 border border-slate-700">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-500">Try searching for "Kanban", "Projects", "Chat", or "Settings"</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm transition-colors ${
                    isSelected
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon size={16} />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700/60">
                      {item.badge}
                    </span>
                    {isSelected && <ArrowRight size={14} className="text-indigo-400" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Help */}
        <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] border border-slate-700">↑↓</kbd> navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-[10px] border border-slate-700">↵</kbd> select
            </span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[11px] text-indigo-400">
            <Command size={12} /> ProjectFlow Quick Commander
          </span>
        </div>

      </div>
    </div>
  );
};

export default CommandPalette;
