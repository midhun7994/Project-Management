import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Layers, Sparkles } from 'lucide-react'
import useAuthStore from '../features/authStore'

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
      } else {
        setError('Invalid email or password.')
      }
    } catch (err) {
      setError('Authentication error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="compact-mobile-wrapper">
      {/* Background Ambient Glow */}
      <div className="bg-glow glow-top" />
      <div className="bg-glow glow-bottom" />

      {/* Compact Floating Mobile Card */}
      <div className="compact-card">
        
        {/* Header Logo & Title */}
        <div className="compact-header">
          <div className="logo-badge">
            <Layers className="logo-icon" />
          </div>
          <h1 className="compact-title">
            {activeTab === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="compact-subtitle">
            {activeTab === 'login'
              ? 'Sign in to access your workspace'
              : 'Start tracking projects in seconds'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="tab-pill-bar">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(null); }}
            className={`tab-item ${activeTab === 'login' ? 'active' : ''}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setError(null); }}
            className={`tab-item ${activeTab === 'register' ? 'active' : ''}`}
          >
            Sign Up
          </button>
        </div>

        {/* Social Auth Buttons */}
        <div className="social-row">
          <button type="button" className="compact-social-btn">
            <svg className="social-svg" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
            </svg>
            Google
          </button>
          <button type="button" className="compact-social-btn">
            <svg className="social-svg fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.13c.64-.78 1.08-1.85.96-2.93-.93.04-2.06.62-2.73 1.4-.6.69-1.12 1.79-.98 2.85 1.05.08 2.11-.53 2.75-1.32z"/>
            </svg>
            Apple
          </button>
        </div>

        <div className="or-divider">
          <span className="line" />
          <span className="text">or email</span>
          <span className="line" />
        </div>

        {error && (
          <div className="error-banner">
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="compact-form">
          {activeTab === 'register' && (
            <div className="input-group">
              <label className="input-lbl">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Johnson"
                className="input-box"
              />
            </div>
          )}

          <div className="input-group">
            <label className="input-lbl">Email Address</label>
            <div className="input-rel">
              <Mail className="input-icon-left" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="input-box padded-left"
              />
            </div>
          </div>

          <div className="input-group">
            <div className="lbl-row">
              <label className="input-lbl">Password</label>
              {activeTab === 'login' && (
                <a href="#" className="forgot-txt">Forgot?</a>
              )}
            </div>
            <div className="input-rel">
              <Lock className="input-icon-left" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-box padded-both"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pwd-toggle"
              >
                {showPassword ? <EyeOff className="icon-eye" /> : <Eye className="icon-eye" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="compact-submit-btn"
          >
            {isSubmitting ? (
              <div className="spin-loader" />
            ) : (
              <>
                <span>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="btn-ic" />
              </>
            )}
          </button>
        </form>

        <div className="compact-footer">
          <span>&copy; 2026 ProjectPulse</span>
          <div className="ftr-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>

      {/* Compact Embedded CSS */}
      <style>{`
        .compact-mobile-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #090C15;
          padding: 1rem;
          position: relative;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .glow-top { width: 350px; height: 350px; background: rgba(99, 102, 241, 0.15); top: -100px; }
        .glow-bottom { width: 350px; height: 350px; background: rgba(168, 85, 247, 0.12); bottom: -100px; }

        .compact-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 390px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(20px);
          padding: 2rem 1.75rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
        }

        .compact-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .logo-badge {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 0.85rem;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }

        .logo-icon { width: 22px; height: 22px; }

        .compact-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .compact-subtitle {
          font-size: 0.78rem;
          color: #94a3b8;
          margin-top: 0.25rem;
        }

        .tab-pill-bar {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 0.25rem;
          background: rgba(2, 6, 23, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          margin-bottom: 1.25rem;
        }

        .tab-item {
          padding: 0.5rem;
          border-radius: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #94a3b8;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tab-item.active {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
        }

        .social-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .compact-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(2, 6, 23, 0.4);
          color: #e2e8f0;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .social-svg { width: 14px; height: 14px; }

        .or-divider {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          position: relative;
        }

        .or-divider .line { flex: 1; height: 1px; background: rgba(255, 255, 255, 0.06); }
        .or-divider .text { font-size: 0.65rem; color: #64748b; padding: 0 0.5rem; text-transform: uppercase; font-weight: 700; }

        .error-banner {
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          font-size: 0.75rem;
          margin-bottom: 1rem;
        }

        .compact-form { display: flex; flex-direction: column; gap: 0.85rem; }
        .input-group { display: flex; flex-direction: column; gap: 0.3rem; }
        .lbl-row { display: flex; justify-content: space-between; align-items: center; }
        .input-lbl { font-size: 0.72rem; font-weight: 700; color: #cbd5e1; }
        .forgot-txt { font-size: 0.72rem; font-weight: 700; color: #818cf8; text-decoration: none; }

        .input-rel { position: relative; }
        .input-icon-left { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); width: 15px; height: 15px; color: #64748b; }
        
        .input-box {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(2, 6, 23, 0.6);
          color: white;
          font-size: 0.82rem;
          outline: none;
          box-sizing: border-box;
        }

        .input-box.padded-left { padding-left: 2.5rem; }
        .input-box.padded-both { padding-left: 2.5rem; padding-right: 2.5rem; }

        .input-box:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }

        .pwd-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
        }

        .icon-eye { width: 15px; height: 15px; }

        .compact-submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.75rem;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          font-size: 0.82rem;
          font-weight: 800;
          cursor: pointer;
          margin-top: 0.5rem;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
        }

        .btn-ic { width: 15px; height: 15px; }

        .compact-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.5rem;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 0.68rem;
          color: #64748b;
        }

        .ftr-links { display: flex; gap: 0.85rem; }
        .ftr-links a { color: #64748b; text-decoration: none; }
      `}</style>
    </div>
  )
}
