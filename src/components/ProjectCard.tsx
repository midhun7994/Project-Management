import React from 'react';
import { Clock, Users, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../data/dashboardData';

interface ProjectCardProps {
  project: ProjectItem;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'IN_REVIEW':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'COMPLETED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className="black-card-interactive p-5 rounded-2xl cursor-pointer group flex flex-col justify-between space-y-4 relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
            {project.category}
          </span>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getStatusBadge(project.status)}`}>
            {project.status.replace('_', ' ')}
          </span>
        </div>

        <div className="flex items-start justify-between">
          <h3 className="text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors leading-snug">
            {project.name}
          </h3>
          <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white transition-all shrink-0 ml-2" />
        </div>

        <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Progress Bar & Footer */}
      <div className="space-y-3 pt-2 border-t border-zinc-800/80">
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-zinc-400">Sprint Progress</span>
            <span className="text-zinc-200 font-semibold">{project.progress}%</span>
          </div>
          <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-white progress-bar-fill"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 pt-0.5">
          <span className="flex items-center gap-1.5">
            <Users size={12} className="text-zinc-500" />
            <span className="text-zinc-400 text-[11px]">{project.membersCount} engineers</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-zinc-500">
            <Clock size={11} />
            {project.updatedAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
