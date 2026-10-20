import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Calendar,
  CheckCircle2,
  Clock,
  MoreVertical,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  X,
  Sparkles,
  Users,
  Layers,
  Activity
} from 'lucide-react';

export interface ProjectData {
  id: string;
  name: string;
  key: string;
  description: string;
  status: 'In Progress' | 'In Review' | 'Planning' | 'Completed';
  health: 'On Track' | 'At Risk' | 'Ahead';
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
  team: { name: string; avatar: string }[];
  tags: string[];
  dueDate: string;
  budgetUsed: string;
}

const initialProjectsData: ProjectData[] = [
  {
    id: 'proj-1',
    name: 'ProjectFlow Core Engine',
    key: 'PFC',
    description: 'High-throughput async backend orchestration using FastAPI, SQLAlchemy 2.0, and Redis cache clusters.',
    status: 'In Progress',
    health: 'On Track',
    progress: 78,
    tasksCompleted: 28,
    totalTasks: 36,
    team: [
      { name: 'Midhun S.', avatar: 'M' },
      { name: 'Elena Rostova', avatar: 'E' },
      { name: 'Marcus Vance', avatar: 'MV' },
    ],
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'Docker'],
    dueDate: 'Nov 14, 2026',
    budgetUsed: '$42,500 / $60,000',
  },
  {
    id: 'proj-2',
    name: 'Glassmorphic Design System',
    key: 'GDS',
    description: 'Next-generation modern UI component library with Tailwind CSS v4, dark mode tokens, and fluid Framer micro-interactions.',
    status: 'In Progress',
    health: 'Ahead',
    progress: 92,
    tasksCompleted: 23,
    totalTasks: 25,
    team: [
      { name: 'Sarah Chen', avatar: 'S' },
      { name: 'Alex Rivera', avatar: 'A' },
    ],
    tags: ['React 19', 'TailwindCSS', 'TypeScript', 'Framer'],
    dueDate: 'Oct 30, 2026',
    budgetUsed: '$18,000 / $25,000',
  },
  {
    id: 'proj-3',
    name: 'Cloud Infrastructure & K8s Mesh',
    key: 'CIK',
    description: 'Multi-region AWS ECS / Kubernetes deployment with automated zero-downtime rolling updates and TLS ingress.',
    status: 'In Review',
    health: 'On Track',
    progress: 64,
    tasksCompleted: 16,
    totalTasks: 25,
    team: [
      { name: 'Marcus Vance', avatar: 'MV' },
      { name: 'Midhun S.', avatar: 'M' },
    ],
    tags: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    dueDate: 'Dec 05, 2026',
    budgetUsed: '$72,000 / $90,000',
  },
  {
    id: 'proj-4',
    name: 'Enterprise RBAC & Security Audit',
    key: 'SEC',
    description: 'End-to-end pen-testing, Argon2id password derivation, strict CORS origin controls, and BOLA vulnerability shielding.',
    status: 'Completed',
    health: 'Ahead',
    progress: 100,
    tasksCompleted: 19,
    totalTasks: 19,
    team: [
      { name: 'Elena Rostova', avatar: 'E' },
      { name: 'Midhun S.', avatar: 'M' },
    ],
    tags: ['Argon2id', 'JWT', 'Security', 'PenTest'],
    dueDate: 'Oct 12, 2026',
    budgetUsed: '$31,000 / $35,000',
  },
  {
    id: 'proj-5',
    name: 'Mobile PWA Companion Client',
    key: 'MPC',
    description: 'Offline-capable progressive web application with biometric authentication and background push notifications.',
    status: 'Planning',
    health: 'On Track',
    progress: 25,
    tasksCompleted: 4,
    totalTasks: 16,
    team: [
      { name: 'Alex Rivera', avatar: 'A' },
      { name: 'Sarah Chen', avatar: 'S' },
    ],
    tags: ['PWA', 'Vite', 'Workbox', 'Mobile'],
    dueDate: 'Jan 15, 2027',
    budgetUsed: '$9,500 / $45,000',
  },
  {
    id: 'proj-6',
    name: 'Realtime WebSocket Telemetry',
    key: 'RWT',
    description: 'Low-latency event streaming pipeline linking FastAPI WebSocket endpoints with frontend dynamic charts.',
    status: 'In Progress',
    health: 'At Risk',
    progress: 45,
    tasksCompleted: 9,
    totalTasks: 20,
    team: [
      { name: 'Midhun S.', avatar: 'M' },
      { name: 'Sarah Chen', avatar: 'S' },
    ],
    tags: ['WebSockets', 'Recharts', 'AsyncIO'],
    dueDate: 'Nov 02, 2026',
    budgetUsed: '$24,000 / $30,000',
  },
];

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>(initialProjectsData);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New project state
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectStatus, setNewProjectStatus] = useState<ProjectData['status']>('In Progress');
  const [newProjectTags, setNewProjectTags] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newProject: ProjectData = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      key: newProjectName.substring(0, 3).toUpperCase(),
      description: newProjectDesc.trim() || 'Enterprise software project deliverable.',
      status: newProjectStatus,
      health: 'On Track',
      progress: 10,
      tasksCompleted: 1,
      totalTasks: 10,
      team: [{ name: 'Midhun S.', avatar: 'M' }],
      tags: newProjectTags ? newProjectTags.split(',').map((t) => t.trim()) : ['React', 'FastAPI'],
      dueDate: 'Nov 30, 2026',
      budgetUsed: '$5,000 / $25,000',
    };

    setProjects([newProject, ...projects]);
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectTags('');
    setIsModalOpen(false);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ProjectData['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'In Review':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Planning':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  const getHealthBadge = (health: ProjectData['health']) => {
    switch (health) {
      case 'Ahead':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'On Track':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      case 'At Risk':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Projects Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {projects.length} Total
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Central repository of multi-team software initiatives, milestones, velocity telemetry, and active deliverables.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>Create Project</span>
        </button>
      </div>

      {/* Senior Engineer Observability KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>ACTIVE INITIATIVES</span>
            <FolderKanban size={16} className="text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">{projects.filter(p => p.status !== 'Completed').length} Projects</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              <TrendingUp size={12} /> +2 this quarter
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-4/5 rounded-full"></div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>HEALTH ON-TRACK RATE</span>
            <Activity size={16} className="text-cyan-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-cyan-400">88.5%</span>
            <span className="text-xs text-slate-400">Stable benchmark</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full w-[88.5%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>SPRINT COMPLETION</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-400">99 Tasks</span>
            <span className="text-xs text-slate-400">76% overall</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[76%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4.5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>CAPITAL BURN</span>
            <TrendingUp size={16} className="text-purple-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-purple-400">$197k</span>
            <span className="text-xs text-slate-400">Under $255k budget</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full w-[77%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Filter, Search & View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, tags, or deliverables..."
            className="w-full bg-slate-800/80 text-slate-200 text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5 justify-between sm:justify-end overflow-x-auto">
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5">
            {['ALL', 'In Progress', 'In Review', 'Planning', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-slate-800 hidden md:block"></div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display: Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-indigo-500/40 rounded-2xl p-5 transition-all duration-200 shadow-xl shadow-black/20 flex flex-col justify-between space-y-4 hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Header status tags */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getHealthBadge(project.health)}`}>
                    ● {project.health}
                  </span>
                </div>

                {/* Project Title & Key */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20">
                      {project.key}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-800/90 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress & Team Footer */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                    <span className="text-slate-400">{project.tasksCompleted}/{project.totalTasks} tasks completed</span>
                    <span className="text-indigo-400 font-bold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {/* Team Avatars */}
                  <div className="flex items-center -space-x-1.5">
                    {project.team.map((member, i) => (
                      <div
                        key={i}
                        title={member.name}
                        className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-slate-900 shadow"
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Button */}
                  <button
                    onClick={() => navigate('/kanban')}
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Open Board</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Projects Display: Detailed Table View */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Project</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Health</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Team</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs font-medium">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                          {project.key}
                        </span>
                        <div>
                          <p className="font-bold text-slate-100 text-sm">{project.name}</p>
                          <p className="text-slate-400 text-[11px] truncate max-w-xs">{project.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block font-bold px-2 py-0.5 rounded-full border ${getHealthBadge(project.health)}`}>
                        ● {project.health}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="w-32 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center -space-x-1.5">
                        {project.team.map((m, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-slate-900"
                          >
                            {m.avatar}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">{project.dueDate}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => navigate('/kanban')}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        View Board →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-400" />
                Initialize New Project
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Project Name</label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Realtime Analytics Pipeline"
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Executive Summary / Scope</label>
                <textarea
                  rows={3}
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Describe the architectural milestones and target outputs..."
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Initial Phase</label>
                  <select
                    value={newProjectStatus}
                    onChange={(e: any) => setNewProjectStatus(e.target.value)}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Planning">Planning</option>
                    <option value="In Review">In Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tech Tags</label>
                  <input
                    type="text"
                    value={newProjectTags}
                    onChange={(e) => setNewProjectTags(e.target.value)}
                    placeholder="React, FastAPI, Docker"
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectsPage;
