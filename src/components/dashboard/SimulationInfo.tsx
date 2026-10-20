import React from 'react';
import { Activity, ShieldCheck, Zap } from 'lucide-react';
import { SimulationConfig } from '../../data/simulationDefaults';

interface SimulationInfoProps {
  config: SimulationConfig;
}

export const SimulationInfo: React.FC<SimulationInfoProps> = ({ config }) => {
  return (
    <div className="fixed left-6 bottom-6 z-40 max-w-sm bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-3.5 text-xs">
      
      {/* Header Badge */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
          <Activity size={14} className="animate-pulse" /> BINARY SUPERNOVA REMNANT
        </span>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
          LIVE
        </span>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Particles</span>
          <p className="text-sm font-extrabold text-white">{config.particleCount.toLocaleString()}</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Shockwave Shells</span>
          <p className="text-sm font-extrabold text-indigo-400">{config.shellCount}</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Binary Separation</span>
          <p className="text-sm font-extrabold text-amber-400">{config.binarySeparation} AU</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Expansion Speed</span>
          <p className="text-sm font-extrabold text-purple-400">{config.expansionSpeed.toFixed(1)}x</p>
        </div>
      </div>
    </div>
  );
};

export default SimulationInfo;
