import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Plus, 
  ShieldCheck, 
  Calendar, 
  Download, 
  Layers, 
  Lock,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { useAuthStore } from '../features/auth/authStore';

interface HeroProps {
  onCreateProjectClick?: () => void;
  onViewActivityClick?: () => void;
  onExportAuditClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onCreateProjectClick, 
  onViewActivityClick,
  onExportAuditClick 
}) => {
  const { user } = useAuthStore();
  const name = user?.full_name ? user.full_name.split(' ')[0] : 'Midhun';
  const role = user?.role ? user.role.replace(/_/g, ' ') : 'Staff Architect';

  return (
    <section className="relative w-full pt-28 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800/80 bg-slate-950 font-sans">
      {/* Sleek Subdued Mesh Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 left-1/3 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-10 w-[400px] h-[250px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto space-y-6">
        
        {/* Top Breadcrumb & Live Governance Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <span className="text-slate-500">Workspace</span>
            <span className="text-slate-600">/</span>
            <span className="text-indigo-400 font-semibold">Production Cluster</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 font-bold">Policy & Task Control Platform</span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[11px] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% Guardrails Active</span>
            </div>
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium text-[11px]">
              <Lock size={12} className="text-indigo-400" />
              <span>AES-256 Vault Locked</span>
            </div>
          </div>
        </div>

        {/* Headline & Actions Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Control & Policy Operations,{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-200 bg-clip-text text-transparent">
                {name}.
              </span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              Continuous compliance monitoring, task lifecycle telemetry, and zero-knowledge data isolation across all active microservices.
            </p>
          </div>

          {/* Action Buttons Capsule */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Date Range Capsule */}
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 shadow-sm">
              <Calendar size={14} className="text-indigo-400" />
              <span>Oct 16, 2026 (Last 30D)</span>
            </div>

            <button
              onClick={onExportAuditClick || (() => alert('Audit Manifest generated: SHA256 verified.'))}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-semibold transition-colors shadow-sm"
              title="Download Compliance Report"
            >
              <Download size={14} />
              <span>Audit Manifest</span>
            </button>

            <button
              onClick={onCreateProjectClick}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus size={15} />
              <span>New Initiative</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
