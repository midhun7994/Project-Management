import React, { useState } from 'react';
import {
  Settings,
  User,
  Shield,
  Key,
  Bell,
  Check,
  Copy,
  Trash2,
  Plus,
  Smartphone,
  Laptop,
  Lock,
  Globe,
  Sparkles,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'api' | 'notifications'>('profile');

  // Profile form state
  const [fullName, setFullName] = useState(user?.full_name || 'Midhun S.');
  const [email, setEmail] = useState(user?.email || 'midhun@projectflow.io');
  const [timezone, setTimezone] = useState('UTC+05:30 (Asia/Kolkata)');
  const [bio, setBio] = useState('Staff Software Architect specializing in distributed systems, FastAPI, and reactive frontends.');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Security state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 'sess-1', device: 'Chrome on Windows 11', ip: '192.168.1.104', location: 'Bengaluru, India', current: true },
    { id: 'sess-2', device: 'ProjectFlow Mobile App (iOS 18)', ip: '192.168.1.189', location: 'Bengaluru, India', current: false },
    { id: 'sess-3', device: 'Firefox on Ubuntu Linux', ip: '10.0.4.12', location: 'Internal Gateway', current: false },
  ]);

  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: 'key-1', name: 'Production CI/CD Deployer', prefix: 'pf_live_79a2f...', created: 'Oct 02, 2026', scope: 'Full Access' },
    { id: 'key-2', name: 'FastAPI Microservice Ingress', prefix: 'pf_test_884b1...', created: 'Oct 10, 2026', scope: 'Read/Write' },
  ]);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Notifications state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [deployAlerts, setDeployAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ full_name: fullName, email });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopyKey = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const handleRevokeSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const handleGenerateKey = () => {
    const newKey = {
      id: `key-${Date.now()}`,
      name: `Developer Token #${apiKeys.length + 1}`,
      prefix: `pf_live_${Math.random().toString(36).substring(2, 9)}...`,
      created: 'Just now',
      scope: 'Read/Write',
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Account & Workspace Settings
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Manage developer credentials, personal profile, encryption keys, and organizational preferences.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'profile', label: 'User Profile', icon: User },
          { id: 'security', label: 'Security & Sessions', icon: Shield },
          { id: 'api', label: 'API Keys & Secrets', icon: Key },
          { id: 'notifications', label: 'Notifications', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Profile Settings */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/20">
                  {fullName.split(' ')[0][0].toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-slate-900"></span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{fullName}</h3>
                <p className="text-xs text-indigo-400 font-medium">Enterprise Administrator • ProjectFlow Core</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Avatar automatically generated from workspace initials</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Timezone</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Primary Organization</label>
                <input
                  type="text"
                  disabled
                  value="ProjectFlow Core Engineering"
                  className="w-full bg-slate-800/50 text-slate-400 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700/60 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Professional Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              {saveSuccess ? (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold animate-in fade-in">
                  <CheckCircle2 size={16} /> Changes persisted successfully
                </span>
              ) : (
                <span className="text-xs text-slate-500">All session changes propagate across browser tabs.</span>
              )}

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200"
              >
                <Save size={16} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: Security & Sessions */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Two-Factor Authentication Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Shield size={18} className="text-emerald-400" />
                  Two-Factor Authentication (TOTP)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Enforce hardware keys or authenticator apps (Google Authenticator, YubiKey, 1Password).
                </p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  twoFactorEnabled
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {twoFactorEnabled ? 'Enabled & Enforced' : 'Disabled'}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between text-xs">
              <span className="text-slate-300">Password derivation algorithm: <strong className="text-indigo-400">Argon2id</strong> (Memory cost: 64MB, Parallelism: 4)</span>
              <span className="text-emerald-400 font-bold">Compliant</span>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Laptop size={18} className="text-indigo-400" />
              Active Hardware Sessions
            </h3>
            <p className="text-xs text-slate-400">
              Devices currently holding valid cryptographic JWT refresh tokens for your account.
            </p>

            <div className="space-y-3 pt-2">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60">
                      {sess.device.includes('Mobile') ? <Smartphone size={18} /> : <Laptop size={18} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">{sess.device}</span>
                        {sess.current && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            Current Device
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {sess.ip} • {sess.location}
                      </span>
                    </div>
                  </div>

                  {!sess.current && (
                    <button
                      onClick={() => handleRevokeSession(sess.id)}
                      className="text-xs text-rose-400 hover:text-rose-300 font-medium px-2 py-1 rounded hover:bg-rose-500/10 transition-colors"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: API Keys */}
      {activeTab === 'api' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key size={18} className="text-amber-400" />
                Personal API Access Tokens
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Keys authenticate automated CI/CD runners, CLI utilities, and background FastAPI microservices.
              </p>
            </div>
            <button
              onClick={handleGenerateKey}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
            >
              <Plus size={14} /> Generate New Key
            </button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{key.name}</span>
                    <span className="px-2 py-0.2 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-[10px] font-semibold border border-indigo-500/20">
                      {key.scope}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-slate-400 text-xs bg-slate-900 px-2 py-0.5 rounded border border-slate-700/60">
                      {key.prefix}
                    </span>
                    <span className="text-[11px] text-slate-500">Created {key.created}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyKey(key.id, `pf_secret_token_${key.id}_992x4a18c`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                  >
                    {copiedKeyId === key.id ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Secret</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleRevokeKey(key.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Revoke Token"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl animate-in fade-in duration-200">
          <div className="pb-4 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Bell size={18} className="text-indigo-400" />
              Notification & Webhook Dispatch Preferences
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select which system events trigger external email digests or team chat broadcasts.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <div>
                <p className="text-xs font-bold text-slate-200">Email Digest for Task Assignments</p>
                <p className="text-[11px] text-slate-400">Receive an immediate notification whenever you are tagged in tickets or PR reviews.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-700 border-slate-600"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <div>
                <p className="text-xs font-bold text-slate-200">Slack Webhook Broadcasts</p>
                <p className="text-[11px] text-slate-400">Dispatch critical project milestone alerts to #engineering-releases.</p>
              </div>
              <input
                type="checkbox"
                checked={slackAlerts}
                onChange={() => setSlackAlerts(!slackAlerts)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-700 border-slate-600"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/40">
              <div>
                <p className="text-xs font-bold text-slate-200">Production Deployment Notifications</p>
                <p className="text-[11px] text-slate-400">Receive telemetry pings when Docker containers or migrations complete.</p>
              </div>
              <input
                type="checkbox"
                checked={deployAlerts}
                onChange={() => setDeployAlerts(!deployAlerts)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-700 border-slate-600"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingsPage;
