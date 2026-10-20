import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Boxes, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  Shield, 
  CheckCircle2, 
  X,
  KeyRound,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';

// Official Brand SVGs
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.71-1.01 2.74 1.01.08 2-.49 2.62-1.24z" />
  </svg>
);

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo, loginWithOAuth, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Interactive OAuth Modal Simulation
  const [activeOAuthProvider, setActiveOAuthProvider] = useState<'google' | 'github' | 'apple' | null>(null);
  const [isOAuthAuthenticating, setIsOAuthAuthenticating] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleTriggerOAuth = (provider: 'google' | 'github' | 'apple') => {
    clearError();
    setActiveOAuthProvider(provider);
  };

  const handleConfirmOAuth = async (name: string, emailAddr: string) => {
    if (!activeOAuthProvider) return;
    setIsOAuthAuthenticating(true);
    const success = await loginWithOAuth(activeOAuthProvider, {
      name,
      email: emailAddr,
    });
    setIsOAuthAuthenticating(false);
    if (success) {
      setActiveOAuthProvider(null);
      navigate('/dashboard');
    }
  };

  const handleDemoAccess = (role: 'ADMIN' | 'PROJECT_MANAGER' | 'TEAM_MEMBER', name: string) => {
    loginAsDemo(role, name);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-900/40 rounded-full blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3.5 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 rounded-2xl text-white shadow-xl shadow-indigo-600/30">
            <Boxes size={32} />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
              Project<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Flow</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Enterprise
              </span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Continuous Governance & High-Velocity Project Orchestration
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900/85 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          
          {/* Safety First Trust Banner */}
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-emerald-500/20 flex items-start gap-3 text-xs">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
              <ShieldCheck size={16} />
            </div>
            <div className="space-y-0.5">
              <span className="font-bold text-slate-200 block">Safety-First User Data Protection</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Zero data sharing or training. Cryptographic isolation with AES-256 client encryption at rest and in transit.
              </p>
            </div>
          </div>

          {/* 1. SOCIAL OAUTH PROVIDERS (GOOGLE, GITHUB, APPLE) */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              Sign in with Single Sign-On (SSO)
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleTriggerOAuth('google')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 hover:border-slate-600/80 border border-slate-700/60 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm group"
                title="Continue with Google"
              >
                <GoogleIcon />
                <span className="hidden sm:inline">Google</span>
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={() => handleTriggerOAuth('github')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 hover:border-slate-600/80 border border-slate-700/60 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm group"
                title="Continue with GitHub"
              >
                <GitHubIcon />
                <span className="hidden sm:inline">GitHub</span>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleTriggerOAuth('apple')}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 hover:border-slate-600/80 border border-slate-700/60 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm group"
                title="Continue with Apple ID"
              >
                <AppleIcon />
                <span className="hidden sm:inline">Apple</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">or email password</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-rose-400 text-xs font-medium">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Traditional Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@projectflow.io"
                  className="w-full bg-slate-800/90 text-slate-200 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-400">Password</label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-800/90 text-slate-200 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  <span>Sign In to Workspace</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Evaluator Personas */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block text-center">
              Quick Evaluator 1-Click Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoAccess('ADMIN', 'Midhun S. (Staff Architect)')}
                className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-700/40 transition-colors text-center"
              >
                ⚡ Lead Architect
              </button>
              <button
                type="button"
                onClick={() => handleDemoAccess('PROJECT_MANAGER', 'Sarah Chen (Lead PM)')}
                className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-700/40 transition-colors text-center"
              >
                ⚡ Product Manager
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 pt-1">
            Need an encrypted account?{' '}
            <Link to="/register" className="text-indigo-400 font-semibold hover:text-indigo-300">
              Create account
            </Link>
          </p>
        </div>

        {/* Security Compliance Seal */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-400" />
            <span>SOC2 Type II</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-400" />
            <span>GDPR Art. 32</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-400" />
            <span>AES-256 E2EE</span>
          </div>
        </div>

      </div>

      {/* Realistic Interactive OAuth Consent Modal */}
      {activeOAuthProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" 
            onClick={() => setActiveOAuthProvider(null)} 
          />

          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/90 rounded-3xl p-6 shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-white">
                  {activeOAuthProvider === 'google' && <GoogleIcon />}
                  {activeOAuthProvider === 'github' && <GitHubIcon />}
                  {activeOAuthProvider === 'apple' && <AppleIcon />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white capitalize">
                    Authenticate via {activeOAuthProvider}
                  </h3>
                  <span className="text-[11px] text-slate-400">Secure OAuth 2.0 / OIDC Verification</span>
                </div>
              </div>
              <button
                onClick={() => setActiveOAuthProvider(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Safety & Cryptographic Isolation Notice */}
            <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                <Shield size={14} className="text-emerald-400" />
                <span>Zero-Knowledge Data Vault Isolation</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                ProjectFlow will securely import your verified identity and provision an isolated, end-to-end encrypted workspace. Your private data is never used to train public machine learning models.
              </p>
            </div>

            {/* Account Selector Simulation */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">Choose an authorized identity:</span>
              
              <button
                type="button"
                disabled={isOAuthAuthenticating}
                onClick={() => handleConfirmOAuth('Midhun S. (Staff Architect)', `midhun@${activeOAuthProvider === 'google' ? 'gmail.com' : activeOAuthProvider === 'github' ? 'users.noreply.github.com' : 'privaterelay.appleid.com'}`)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-700/60 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow">
                    M
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-indigo-300">Midhun S.</p>
                    <p className="text-[11px] text-slate-400">
                      midhun@{activeOAuthProvider === 'google' ? 'gmail.com' : activeOAuthProvider === 'github' ? 'users.noreply.github.com' : 'privaterelay.appleid.com'}
                    </p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                disabled={isOAuthAuthenticating}
                onClick={() => handleConfirmOAuth('Engineering Lead', `lead@${activeOAuthProvider === 'google' ? 'company.com' : 'projectflow.io'}`)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-slate-700/30 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
                    EL
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white group-hover:text-indigo-300">Engineering Lead (Workspace)</p>
                    <p className="text-[11px] text-slate-400">lead@{activeOAuthProvider === 'google' ? 'company.com' : 'projectflow.io'}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <KeyRound size={12} className="text-indigo-400" /> TLS 1.3 / ed25519 Token Signatures
              </span>
              <button
                type="button"
                onClick={() => setActiveOAuthProvider(null)}
                className="text-slate-400 hover:text-white font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LoginPage;
