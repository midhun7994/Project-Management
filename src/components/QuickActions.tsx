import React from 'react';
import { Plus, CheckSquare, UploadCloud, UserPlus, Zap } from 'lucide-react';

interface QuickActionsProps {
  onActionClick?: (actionType: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    {
      id: 'create_project',
      label: 'Create Project',
      desc: 'Launch new initiative',
      icon: Plus,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      id: 'add_task',
      label: 'Add Task',
      desc: 'Assign backlog item',
      icon: CheckSquare,
      color: 'from-purple-500 to-pink-600',
    },
    {
      id: 'upload_file',
      label: 'Upload File',
      desc: 'Share attachments',
      icon: UploadCloud,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'invite_member',
      label: 'Invite Member',
      desc: 'Add team collaborator',
      icon: UserPlus,
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="bg-slate-900/80 border border-white/[0.07] p-6 rounded-3xl shadow-xl space-y-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Zap size={18} className="text-amber-400" /> Quick Actions
        </h2>
        <span className="text-xs text-slate-400">Shortcuts</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((act) => (
          <button
            key={act.id}
            onClick={() => onActionClick?.(act.id)}
            className="group relative p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800/90 border border-white/[0.06] hover:border-indigo-500/30 transition-colors text-left flex flex-col justify-between space-y-3 hover-lift active:scale-95"
          >
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${act.color} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
              <act.icon size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                {act.label}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                {act.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
