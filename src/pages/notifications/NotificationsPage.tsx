import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  ExternalLink,
  ShieldAlert,
  MessageSquare,
  KanbanSquare,
  Zap,
  Sparkles
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'mention' | 'task' | 'security' | 'system';
  unread: boolean;
  link?: string;
}

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'unread' | 'task' | 'security'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Ticket Assigned: SEC-102 (Argon2id hashing)',
      description: 'Elena Rostova assigned you to lead the cryptographic password hashing audit.',
      time: '12 minutes ago',
      category: 'task',
      unread: true,
      link: '/kanban',
    },
    {
      id: 'notif-2',
      title: 'Mention in #engineering channel',
      description: 'Sarah Chen: "Sprint 24 velocity is tracking at 94%. We are ahead of schedule."',
      time: '1 hour ago',
      category: 'mention',
      unread: true,
      link: '/chat',
    },
    {
      id: 'notif-3',
      title: 'PostgreSQL asyncpg Connection Pool Scaled',
      description: 'Internal telemetry: connection pool auto-scaled from 20 to 50 active workers without latency penalty.',
      time: '3 hours ago',
      category: 'system',
      unread: false,
      link: '/admin',
    },
    {
      id: 'notif-4',
      title: 'Security Scan: 0 Vulnerabilities Detected',
      description: 'Trivy and Snyk automated CI scan passed all dependency audit benchmarks.',
      time: 'Yesterday',
      category: 'security',
      unread: false,
      link: '/admin',
    },
    {
      id: 'notif-5',
      title: 'Task ENG-104 Moved to "Code Review"',
      description: 'PR #42 opened for statement caching optimizations.',
      time: 'Yesterday',
      category: 'task',
      unread: false,
      link: '/kanban',
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markItemRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'unread') return n.unread;
    if (filter === 'task') return n.category === 'task';
    if (filter === 'security') return n.category === 'security' || n.category === 'system';
    return true;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'task':
        return <KanbanSquare size={16} className="text-indigo-400" />;
      case 'mention':
        return <MessageSquare size={16} className="text-cyan-400" />;
      case 'security':
        return <ShieldAlert size={16} className="text-rose-400" />;
      case 'system':
        return <Zap size={16} className="text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Notification Center
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Real-time notifications for ticket assignments, code review mentions, and infrastructure telemetry.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors self-start sm:self-auto"
          >
            <CheckCheck size={14} className="text-indigo-400" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Updates' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'task', label: 'Task Assignments' },
          { id: 'security', label: 'Security & System' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filter === t.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-300">All caught up!</h4>
            <p className="text-xs text-slate-500">There are no notifications matching your active filter.</p>
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all duration-150 flex items-start justify-between gap-4 group ${
                n.unread
                  ? 'bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-950/20'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl border mt-0.5 ${
                  n.unread
                    ? 'bg-indigo-600/10 border-indigo-500/30'
                    : 'bg-slate-800/80 border-slate-700/60'
                }`}>
                  {getCategoryIcon(n.category)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-100">{n.title}</h4>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                    {n.description}
                  </p>
                  <span className="text-[11px] text-slate-500 font-mono block pt-1">
                    {n.time}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {n.link && (
                  <button
                    onClick={() => navigate(n.link!)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-400 border border-slate-700/80 transition-colors"
                  >
                    <span>View</span>
                    <ExternalLink size={12} />
                  </button>
                )}

                <button
                  onClick={() => markItemRead(n.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title={n.unread ? 'Mark as read' : 'Mark as unread'}
                >
                  <Check size={16} className={n.unread ? 'text-indigo-400' : 'text-slate-500'} />
                </button>

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default NotificationsPage;
