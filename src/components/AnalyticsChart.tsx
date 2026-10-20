import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  ArrowUpRight
} from 'lucide-react';

const sprintVelocityData = [
  { name: 'Mon', completed: 18, planned: 20 },
  { name: 'Tue', completed: 25, planned: 24 },
  { name: 'Wed', completed: 32, planned: 28 },
  { name: 'Thu', completed: 44, planned: 35 },
  { name: 'Fri', completed: 58, planned: 45 },
  { name: 'Sat', completed: 62, planned: 48 },
  { name: 'Sun', completed: 68, planned: 50 },
];

const monthlyVelocity = [
  { name: 'Sprint 1', completed: 140, planned: 130 },
  { name: 'Sprint 2', completed: 195, planned: 180 },
  { name: 'Sprint 3', completed: 245, planned: 220 },
  { name: 'Sprint 4', completed: 280, planned: 250 },
];

export const AnalyticsChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7D' | '30D'>('7D');
  const data = timeframe === '7D' ? sprintVelocityData : monthlyVelocity;

  return (
    <div className="black-card p-6 rounded-2xl space-y-6">
      
      {/* Top Header & Timeframe */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <TrendingUp size={16} className="text-zinc-400" />
            Sprint Velocity & Task Delivery
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time track of completed tasks against planned sprint milestones.
          </p>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto text-xs">
          {(['7D', '30D'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                timeframe === t
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {t === '7D' ? 'Current Sprint' : 'Last 30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Micro-Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-zinc-950/70 rounded-xl border border-zinc-800/60">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">Completed</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold text-white">68 tasks</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight size={10} /> +18%
            </span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">Sprint Health</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold text-emerald-400">96.4%</span>
            <span className="text-[10px] text-zinc-500">Ahead of cycle</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">Average Velocity</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold text-zinc-200">14.2 / day</span>
            <span className="text-[10px] text-zinc-500">8 engineers</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 block">Cycle Time</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg font-bold text-zinc-200">1.8 days</span>
            <span className="text-[10px] text-emerald-400 font-semibold">-0.4d</span>
          </div>
        </div>
      </div>

      {/* Smooth Minimal Area Chart */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradientPlanned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#71717a" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#71717a" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />

            <Tooltip
              contentStyle={{
                backgroundColor: '#09090b',
                borderColor: '#27272a',
                borderRadius: '12px',
                color: '#f4f4f5',
                fontSize: '12px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.8)',
              }}
              itemStyle={{ color: '#d4d4d8' }}
            />

            <Area
              type="monotone"
              dataKey="completed"
              name="Completed Tasks"
              stroke="#ffffff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#gradientCompleted)"
            />
            <Area
              type="monotone"
              dataKey="planned"
              name="Planned Target"
              stroke="#71717a"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#gradientPlanned)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsChart;
