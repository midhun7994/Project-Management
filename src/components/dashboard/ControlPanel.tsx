import React, { useState } from 'react';
import { Sliders, RotateCcw, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { SimulationConfig } from '../../data/simulationDefaults';

interface ControlPanelProps {
  config: SimulationConfig;
  onChange: <K extends keyof SimulationConfig>(key: K, value: SimulationConfig[K]) => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ config, onChange, onReset }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="fixed right-6 bottom-6 md:top-24 md:bottom-auto z-40 w-[320px] bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-4 text-xs transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-lg text-white">
            <Sliders size={14} />
          </div>
          <span className="font-extrabold text-white tracking-wide uppercase text-[11px]">
            Simulation Parameters
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Defaults"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
          {/* Quality Preset Selection */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quality Preset</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900 rounded-xl border border-white/5">
              {(['HIGH', 'MEDIUM', 'LOW'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    onChange('quality', q);
                    onChange('particleCount', q === 'HIGH' ? 20000 : q === 'MEDIUM' ? 10000 : 5000);
                  }}
                  className={`py-1 rounded-lg text-[10px] font-bold transition-all ${
                    config.quality === q
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Explosion Speed */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-semibold">
              <span>Explosion Speed</span>
              <span className="text-cyan-400">{config.expansionSpeed.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={config.expansionSpeed}
              onChange={(e) => onChange('expansionSpeed', parseFloat(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Debris Chaos */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-semibold">
              <span>Debris Chaos</span>
              <span className="text-purple-400">{config.debrisChaos.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={config.debrisChaos}
              onChange={(e) => onChange('debrisChaos', parseFloat(e.target.value))}
              className="w-full accent-purple-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Binary Separation */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-semibold">
              <span>Binary Separation</span>
              <span className="text-amber-400">{config.binarySeparation.toFixed(1)} AU</span>
            </div>
            <input
              type="range"
              min="4"
              max="24"
              step="1"
              value={config.binarySeparation}
              onChange={(e) => onChange('binarySeparation', parseFloat(e.target.value))}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Binary Orbit Speed */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-semibold">
              <span>Binary Orbit Speed</span>
              <span className="text-indigo-400">{config.binaryOrbitSpeed.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="5.0"
              step="0.1"
              value={config.binaryOrbitSpeed}
              onChange={(e) => onChange('binaryOrbitSpeed', parseFloat(e.target.value))}
              className="w-full accent-indigo-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Particle Count */}
          <div className="space-y-1">
            <div className="flex justify-between text-slate-300 font-semibold">
              <span>Particle Density</span>
              <span className="text-emerald-400">{config.particleCount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="25000"
              step="2500"
              value={config.particleCount}
              onChange={(e) => onChange('particleCount', parseInt(e.target.value, 10))}
              className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
