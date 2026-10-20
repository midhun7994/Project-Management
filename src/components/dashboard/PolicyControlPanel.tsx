import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Key, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  Settings2, 
  ExternalLink,
  Sparkles,
  Zap
} from 'lucide-react';

interface PolicyRule {
  id: string;
  name: string;
  category: 'Privacy' | 'Authorization' | 'Encryption' | 'AI Safety';
  description: string;
  mode: 'BLOCK' | 'REDACT' | 'AUDIT';
  status: 'ACTIVE' | 'AUDITING';
  violations: number;
  enabled: boolean;
}

const initialPolicies: PolicyRule[] = [
  {
    id: 'pol-1',
    name: 'PII & Credential Auto-Masking',
    category: 'Privacy',
    description: 'Auto-redacts OAuth tokens, passwords, and API secrets from ticket descriptions and logs.',
    mode: 'REDACT',
    status: 'ACTIVE',
    violations: 0,
    enabled: true,
  },
  {
    id: 'pol-2',
    name: 'Zero-Knowledge Data Vault Isolation',
    category: 'Encryption',
    description: 'Enforces AES-256 client-side cryptographic isolation across all project databases.',
    mode: 'BLOCK',
    status: 'ACTIVE',
    violations: 0,
    enabled: true,
  },
  {
    id: 'pol-3',
    name: 'BOLA Endpoint Authorization Guard',
    category: 'Authorization',
    description: 'Verifies per-request user tenancy and prohibits cross-tenant object manipulation.',
    mode: 'BLOCK',
    status: 'ACTIVE',
    violations: 0,
    enabled: true,
  },
  {
    id: 'pol-4',
    name: 'Public LLM Telemetry Leak Shield',
    category: 'AI Safety',
    description: 'Strict prohibition against forwarding internal workspace code or tickets to external AI training sets.',
    mode: 'BLOCK',
    status: 'ACTIVE',
    violations: 0,
    enabled: true,
  },
  {
    id: 'pol-5',
    name: 'Argon2id & JWT Token Rotation Guard',
    category: 'Encryption',
    description: 'Enforces memory-hard password derivation and invalidates stale refresh tokens after 15m.',
    mode: 'BLOCK',
    status: 'ACTIVE',
    violations: 0,
    enabled: true,
  },
];

export const PolicyControlPanel: React.FC = () => {
  const [policies, setPolicies] = useState<PolicyRule[]>(initialPolicies);
  const [activeTab, setActiveTab] = useState<'all' | 'encryption' | 'privacy'>('all');

  const togglePolicy = (id: string) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const filteredPolicies = policies.filter((p) => {
    if (activeTab === 'encryption') return p.category === 'Encryption';
    if (activeTab === 'privacy') return p.category === 'Privacy' || p.category === 'AI Safety';
    return true;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-400" />
            <h3 className="text-base font-bold text-white">Active Policy Guardrails & Data Privacy Control</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {policies.filter((p) => p.enabled).length}/{policies.length} Enforcing
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zero-knowledge governance policies protecting user data, preventing model training leaks, and enforcing encryption.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto">
          {['all', 'encryption', 'privacy'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as any)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                activeTab === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Policies List Table */}
      <div className="space-y-3">
        {filteredPolicies.map((policy) => (
          <div
            key={policy.id}
            className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              policy.enabled
                ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700/80'
                : 'bg-slate-950/20 border-slate-900 opacity-60'
            }`}
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-white">{policy.name}</span>
                <span className="text-[10px] font-semibold px-2 py-0.2 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                  {policy.category}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded-full border ${
                  policy.mode === 'BLOCK'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}>
                  {policy.mode}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {policy.description}
              </p>
            </div>

            {/* Status & Switch */}
            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {policy.enabled ? '0 Breaches' : 'Disabled'}
                </span>
                <span className="text-[10px] text-slate-500 block">100% compliant</span>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => togglePolicy(policy.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  policy.enabled ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
                role="switch"
                aria-checked={policy.enabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    policy.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Safety First Seal Footer */}
      <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex items-center justify-between text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
          <span>Continuous Automated Compliance: SOC2 Type II, GDPR Article 32, and ISO 27001 verified.</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 hidden md:inline-block">
          Grade A+
        </span>
      </div>

    </div>
  );
};

export default PolicyControlPanel;
