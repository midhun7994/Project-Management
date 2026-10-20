import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  Key,
  Activity,
  Server,
  Database,
  Lock,
  Search,
  UserPlus,
  RefreshCw,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
  Sparkles,
  Zap
} from 'lucide-react';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'PROJECT_MANAGER' | 'TEAM_MEMBER';
  status: 'ACTIVE' | 'SUSPENDED';
  lastLogin: string;
  avatar: string;
}

interface AuditLog {
  id: string;
  event: string;
  actor: string;
  ip: string;
  status: 200 | 201 | 401 | 403;
  timestamp: string;
}

export const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<ManagedUser[]>([
    {
      id: 'u-1',
      name: 'Midhun S.',
      email: 'midhun@projectflow.io',
      role: 'ADMIN',
      status: 'ACTIVE',
      lastLogin: 'Just now',
      avatar: 'M',
    },
    {
      id: 'u-2',
      name: 'Elena Rostova',
      email: 'elena@projectflow.io',
      role: 'ADMIN',
      status: 'ACTIVE',
      lastLogin: '12m ago',
      avatar: 'E',
    },
    {
      id: 'u-3',
      name: 'Sarah Chen',
      email: 'sarah.c@projectflow.io',
      role: 'PROJECT_MANAGER',
      status: 'ACTIVE',
      lastLogin: '1h ago',
      avatar: 'S',
    },
    {
      id: 'u-4',
      name: 'Marcus Vance',
      email: 'marcus@projectflow.io',
      role: 'TEAM_MEMBER',
      status: 'ACTIVE',
      lastLogin: '3h ago',
      avatar: 'MV',
    },
    {
      id: 'u-5',
      name: 'Alex Rivera',
      email: 'alex.r@projectflow.io',
      role: 'TEAM_MEMBER',
      status: 'ACTIVE',
      lastLogin: 'Yesterday',
      avatar: 'A',
    },
    {
      id: 'u-6',
      name: 'External Security Auditor',
      email: 'audit@secfirm.com',
      role: 'TEAM_MEMBER',
      status: 'SUSPENDED',
      lastLogin: '4 days ago',
      avatar: 'ES',
    },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: 'log-1', event: 'JWT_TOKEN_REFRESH_SUCCESS', actor: 'midhun@projectflow.io', ip: '192.168.1.104', status: 200, timestamp: '14:22:04' },
    { id: 'log-2', event: 'DB_CONNECTION_POOL_MIGRATED', actor: 'SYSTEM_DAEMON', ip: 'internal.k8s', status: 201, timestamp: '14:19:12' },
    { id: 'log-3', event: 'FAILED_LOGIN_RATE_LIMIT', actor: 'unknown_scanner@103.22.1.9', ip: '103.22.1.9', status: 401, timestamp: '14:05:30' },
    { id: 'log-4', event: 'RBAC_ROLE_POLICY_EVALUATED', actor: 'sarah.c@projectflow.io', ip: '192.168.1.189', status: 200, timestamp: '13:48:22' },
    { id: 'log-5', event: 'ARGON2ID_HASH_VALIDATED', actor: 'elena@projectflow.io', ip: '192.168.1.112', status: 200, timestamp: '13:30:15' },
  ]);

  const [searchUser, setSearchUser] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'ADMIN' | 'PROJECT_MANAGER' | 'TEAM_MEMBER'>('TEAM_MEMBER');

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' } : u
      )
    );
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newUser: ManagedUser = {
      id: `u-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: 'ACTIVE',
      lastLogin: 'Pending verification',
      avatar: inviteName.split(' ')[0][0].toUpperCase(),
    };

    setUsers([newUser, ...users]);
    setInviteName('');
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.role.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Security & Admin Console
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
              <Lock size={12} /> Root Access
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            System-wide identity orchestration, JWT token lifecycle management, database health, and real-time security auditing.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all duration-200"
        >
          <UserPlus size={16} />
          <span>Provision User</span>
        </button>
      </div>

      {/* Cluster Telemetry Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>FASTAPI LATENCY</span>
            <Zap size={16} className="text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">18.4 ms</span>
            <span className="text-xs font-bold text-emerald-400">99.98% SLA</span>
          </div>
          <p className="text-[11px] text-slate-500">Async ASGI worker pool (Uvicorn)</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>POSTGRESQL ASYNCPG</span>
            <Database size={16} className="text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-indigo-400">24 / 50 Active</span>
            <span className="text-xs text-slate-400">Pool Idle: 26</span>
          </div>
          <p className="text-[11px] text-slate-500">Read replica synchronized</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>REDIS CACHE HIT RATE</span>
            <Activity size={16} className="text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-400">96.8%</span>
            <span className="text-xs text-slate-400">Memory: 142MB</span>
          </div>
          <p className="text-[11px] text-slate-500">Sentinel high-availability active</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>ACTIVE SESSIONS</span>
            <Key size={16} className="text-purple-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-purple-400">42 Tokens</span>
            <span className="text-xs font-bold text-emerald-400">0 Leaks</span>
          </div>
          <p className="text-[11px] text-slate-500">Argon2id + HTTP-only cookies</p>
        </div>
      </div>

      {/* Main Grid: User Management (Left 2 Col) + Live Security Audit Feed (Right 1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Management Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Filter users by name, email, or role..."
                className="w-full bg-slate-800 text-slate-200 text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <span className="text-xs text-slate-400 font-semibold pr-2">
              Showing {filteredUsers.length} users
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="p-4">User</th>
                    <th className="p-4">Assigned Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Active</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-800">
                            {u.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-slate-200">{u.name}</p>
                            <p className="text-[11px] text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border ${
                          u.role === 'ADMIN'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : u.role === 'PROJECT_MANAGER'
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 font-bold text-[11px] ${
                          u.status === 'ACTIVE' ? 'text-emerald-400' : 'text-slate-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{u.lastLogin}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            u.status === 'ACTIVE'
                              ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Realtime Security Audit Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-indigo-400" size={18} />
              <h3 className="font-bold text-white text-sm">Security Audit Trail</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Stream
            </span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/40 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-indigo-300 truncate max-w-[170px]">
                    {log.event}
                  </span>
                  <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    log.status < 300 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[130px]">{log.actor}</span>
                  <span className="font-mono text-[10px] text-slate-500">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const newEntry: AuditLog = {
                  id: `log-${Date.now()}`,
                  event: 'MANUAL_CACHE_FLUSH_TRIGGERED',
                  actor: 'Midhun S. (ADMIN)',
                  ip: '192.168.1.104',
                  status: 200,
                  timestamp: new Date().toLocaleTimeString(),
                };
                setAuditLogs([newEntry, ...auditLogs]);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <RefreshCw size={14} />
              <span>Simulate Audit Event</span>
            </button>
          </div>
        </div>

      </div>

      {/* Provision User Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsInviteModalOpen(false)} />
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-400" />
                Provision New Identity
              </h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInviteUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="jordan.lee@projectflow.io"
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">RBAC Role Assignment</label>
                <select
                  value={inviteRole}
                  onChange={(e: any) => setInviteRole(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                >
                  <option value="TEAM_MEMBER">Team Member (Read & Update Tasks)</option>
                  <option value="PROJECT_MANAGER">Project Manager (Create/Assign Initiatives)</option>
                  <option value="ADMIN">Administrator (Full System & Audit Access)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Confirm Provisioning
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;
