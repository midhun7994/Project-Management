import React from 'react';
import { FolderPlus, CheckSquare, Upload, ShieldCheck, Activity } from 'lucide-react';
import { ActivityItem } from '../data/dashboardData';

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'project':
      return <FolderPlus size={12} className="text-zinc-300" />;
    case 'task':
      return <CheckSquare size={12} className="text-emerald-400" />;
    case 'upload':
      return <Upload size={12} className="text-amber-400" />;
    case 'security':
      return <ShieldCheck size={12} className="text-zinc-300" />;
    default:
      return <Activity size={12} className="text-zinc-400" />;
  }
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  return (
    <div className="black-card p-6 rounded-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <h2 className="text-xs font-semibold text-white tracking-wide uppercase flex items-center gap-2">
          <Activity size={14} className="text-zinc-400" /> Recent Activity
        </h2>
        <span className="text-[11px] text-zinc-400 hover:text-white font-medium cursor-pointer transition-colors">
          View all
        </span>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-800">
        {activities.map((item) => (
          <div key={item.id} className="relative group transition-transform">
            {/* Timeline Dot Icon */}
            <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center shadow-sm">
              {getActivityIcon(item.type)}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-zinc-200">{item.user}</span>
                <span className="text-zinc-500 font-normal">{item.action}</span>
              </div>
              <p className="text-xs font-medium text-zinc-300 leading-snug">
                {item.target}
              </p>
              <span className="text-[10px] text-zinc-500 font-medium">
                {item.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
