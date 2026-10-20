import React from 'react';
import { ArrowRight, Sparkles, Orbit, Cpu } from 'lucide-react';

interface HeroContentProps {
  onExploreClick?: () => void;
  onAnalyticsClick?: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  onExploreClick,
  onAnalyticsClick,
}) => {
  return (
    <div className="relative z-10 max-w-2xl text-left space-y-6 pt-36 pb-12 px-6 sm:px-12 pointer-events-none">
      <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/70 border border-cyan-500/30 backdrop-blur-xl text-xs font-bold uppercase tracking-widest text-cyan-400 shadow-lg shadow-cyan-500/10">
        <Cpu size={14} className="animate-spin text-cyan-400" />
        <span>DISTRIBUTED CLUSTER • GPU 3D TELEMETRY</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-2xl">
        Where workflows become{' '}
        <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
          frictionless.
        </span>
      </h1>

      <p className="text-sm sm:text-base text-slate-300/90 font-normal leading-relaxed max-w-lg drop-shadow">
        Explore a real-time GPU particle simulation of ProjectFlow's distributed async pipeline. Manipulate cluster throughput, Redis replication nodes, and concurrency dynamics in 3D WebGL space.
      </p>

      <div className="pointer-events-auto flex flex-wrap items-center gap-4 pt-2">
        <button
          onClick={onExploreClick}
          className="px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
        >
          <span>Adjust Cluster Nodes</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onAnalyticsClick}
          className="px-6 py-3.5 rounded-full bg-slate-950/60 hover:bg-slate-900 text-slate-200 hover:text-white border border-white/10 backdrop-blur-xl font-semibold text-xs hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          <Sparkles size={16} className="text-purple-400" />
          <span>Return to Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
