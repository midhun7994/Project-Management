import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, Star, ShieldCheck, Layers, CheckCircle2 } from 'lucide-react'
import useAuthStore from '../../features/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const [activeTab, setActiveTab] = useState('login')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const success = await login(email, password)
      if (success) {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090D16] p-4 sm:p-6 lg:p-10 font-sans text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Mesh Glows */}
      <div className="fixed -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[160px] pointer-events-none" />
      <div className="fixed -right-40 -bottom-40 h-[600px] w-[600px] rounded-full bg-purple-600/15 blur-[160px] pointer-events-none" />

      {/* Main Glassmorphic Split Container (Ghulaam Rasool Style) */}
      <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-900/60 backdrop-blur-2xl shadow-2xl shadow-black/80">
        
        {/* LEFT COLUMN: Interactive Form Container */}
        <div className="flex flex-1 flex-col justify-between p-8 sm:p-12 lg:p-14">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-lg shadow-indigo-500/25">
                <Layers className="h-6 w-6 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">ProjectPulse</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-bold text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" />
              SaaS v2.0
            </span>
          </div>

          {/* Center Form Section */}
          <div className="my-8">
            
            {/* Segmented Control Pill Tabs */}
            <div className="mb-8 grid grid-cols-2 rounded-2xl bg-slate-950/80 p-1.5 border border-slate-800/80">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(null); }}
                className={`rounded-xl py-2.5 text-xs font-extrabold transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(null); }}
                className={`rounded-xl py-2.5 text-xs font-extrabold transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="mb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {activeTab === 'login' ? 'Welcome Back 👋' : 'Join ProjectPulse 🚀'}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                {activeTab === 'login'
                  ? 'Enter your credentials to access your agile project workspace.'
                  : 'Start managing tasks, sprints, and teams with ease today.'}
              </p>
            </div>

            {/* Social Auth Option Pills */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/50 py-3 text-xs font-bold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 active:scale-[0.97]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/50 py-3 text-xs font-bold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 active:scale-[0.97]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/50 py-3 text-xs font-bold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 active:scale-[0.97]"
              >
                <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.13c.64-.78 1.08-1.85.96-2.93-.93.04-2.06.62-2.73 1.4-.6.69-1.12 1.79-.98 2.85 1.05.08 2.11-.53 2.75-1.32z"/>
                </svg>
                Apple
              </button>
            </div>

            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-full border-t border-slate-800/80" />
              <span className="absolute bg-[#0D121F] px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Or continue with email
              </span>
            </div>

            {error && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-xs font-semibold text-rose-400">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300">Full Name</label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Johnson"
                      className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 py-3.5 pl-4 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:bg-slate-950 focus:ring-4 focus:ring-indigo-500/15"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300">Email Address</label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:bg-slate-950 focus:ring-4 focus:ring-indigo-500/15"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300">Password</label>
                  {activeTab === 'login' && (
                    <a href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 py-3.5 pl-11 pr-11 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:bg-slate-950 focus:ring-4 focus:ring-indigo-500/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 text-sm font-extrabold text-white shadow-xl shadow-indigo-500/25 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60 mt-6"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    {activeTab === 'login' ? 'Sign In to Workspace' : 'Get Started Free'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs text-slate-500">
            <span>&copy; 2026 ProjectPulse Inc.</span>
            <div className="flex gap-4 font-semibold">
              <a href="#" className="hover:text-slate-300">Privacy</a>
              <a href="#" className="hover:text-slate-300">Terms</a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Ghulaam Rasool Style Hero Card */}
        <div className="relative hidden flex-1 items-center justify-center overflow-hidden rounded-[28px] border border-slate-800/80 bg-gradient-to-br from-indigo-950/40 via-slate-950 to-purple-950/40 p-10 lg:flex">
          {/* Ambient Glows */}
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-500/20 blur-[120px]" />

          <div className="relative z-10 w-full max-w-md">
            
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-400 backdrop-blur-md mb-8">
              <div className="flex text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <span>Rated 4.9/5 by 2,000+ Teams</span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white leading-tight">
              Streamline project workflows with absolute precision.
            </h2>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Experience the next-generation project management platform built for modern engineering teams.
            </p>

            {/* 3D Glass Workspace Preview Card */}
            <div className="mt-8 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 font-bold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Security & RBAC Controls</h4>
                    <p className="text-xs text-slate-400">Enterprise grade access management</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3 text-xs">
                  <span className="font-semibold text-slate-300">Admin Permissions</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Full Access
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-950/60 p-3 text-xs">
                  <span className="font-semibold text-slate-300">Project Manager</span>
                  <span className="text-indigo-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Manage Tasks
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
