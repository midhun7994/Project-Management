import React from 'react';
import { FolderKanban, Clock, CheckCircle2, TrendingUp, ArrowUpRight } from 'lucide-react';
import { StatItem } from '../data/dashboardData';

interface StatCardProps {
  stat: StatItem;
}

const iconMap: Record<string, React.ElementType> = {
  FolderKanban,
  Clock,
  CheckCircle2,
  TrendingUp,
};

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const IconComponent = iconMap[stat.iconName] || FolderKanban;

  return (
    <div className="black-card-interactive p-5 rounded-2xl group flex flex-col justify-between relative overflow-hidden">
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-300" />

      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
          {stat.label}
        </span>
        <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-white transition-colors duration-200">
          <IconComponent size={15} />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-white tracking-tight">
          {stat.value}
        </span>
        <span className="inline-flex items-center text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <ArrowUpRight size={11} className="mr-0.5" />
          {stat.change}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
