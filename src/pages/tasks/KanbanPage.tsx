import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  Tag,
  MoreVertical,
  X,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export interface KanbanTask {
  id: string;
  key: string;
  title: string;
  description: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
  assignee: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  subtasks: { total: number; completed: number };
  dueDate: string;
}

const initialTasks: KanbanTask[] = [
  {
    id: 'task-1',
    key: 'ENG-104',
    title: 'Migrate PostgreSQL connection pool to asyncpg engine',
    description: 'Optimize max connections and statement caching for 10k concurrent query loads.',
    priority: 'HIGH',
    status: 'in_progress',
    assignee: { name: 'Midhun S.', avatar: 'M', role: 'Staff Architect' },
    tags: ['Backend', 'PostgreSQL', 'Performance'],
    subtasks: { total: 4, completed: 3 },
    dueDate: 'Tomorrow',
  },
  {
    id: 'task-2',
    key: 'SEC-209',
    title: 'Implement Argon2id password hashing & JWT cookie rotation',
    description: 'Ensure token refresh uses secure HTTP-only cookies with SameSite=Strict and anti-CSRF headers.',
    priority: 'CRITICAL',
    status: 'review',
    assignee: { name: 'Elena Rostova', avatar: 'E', role: 'Security Ops' },
    tags: ['Security', 'Auth', 'FastAPI'],
    subtasks: { total: 5, completed: 5 },
    dueDate: 'Today',
  },
  {
    id: 'task-3',
    key: 'UI-312',
    title: 'Design glassmorphic command palette with keyboard shortcuts',
    description: 'Build Cmd+K modal with instant fuzzy search across projects, tasks, and admin routes.',
    priority: 'MEDIUM',
    status: 'done',
    assignee: { name: 'Sarah Chen', avatar: 'S', role: 'Lead PM' },
    tags: ['Frontend', 'React', 'UX'],
    subtasks: { total: 3, completed: 3 },
    dueDate: 'Completed',
  },
  {
    id: 'task-4',
    key: 'OPS-441',
    title: 'Configure Redis cluster auto-failover and persistence',
    description: 'Set up Redis sentinel replication with AOF persistence on staging environment.',
    priority: 'HIGH',
    status: 'todo',
    assignee: { name: 'Marcus Vance', avatar: 'MV', role: 'DevOps Lead' },
    tags: ['DevOps', 'Redis', 'Infra'],
    subtasks: { total: 6, completed: 2 },
    dueDate: 'Oct 20',
  },
  {
    id: 'task-5',
    key: 'ENG-108',
    title: 'Implement WebSocket channels for real-time team collaboration',
    description: 'Provide sub-millisecond status broadcasts when cards are dragged or comments added.',
    priority: 'MEDIUM',
    status: 'backlog',
    assignee: { name: 'Alex Rivera', avatar: 'A', role: 'Fullstack Eng' },
    tags: ['WebSockets', 'Frontend'],
    subtasks: { total: 4, completed: 0 },
    dueDate: 'Oct 25',
  },
  {
    id: 'task-6',
    key: 'API-502',
    title: 'Create OpenAPI v3 automated schema tests with Pytest',
    description: 'Validate request/response contract matching between FastAPI schemas and client types.',
    priority: 'LOW',
    status: 'todo',
    assignee: { name: 'Midhun S.', avatar: 'M', role: 'Staff Architect' },
    tags: ['Testing', 'Pytest', 'CI/CD'],
    subtasks: { total: 3, completed: 1 },
    dueDate: 'Oct 22',
  },
  {
    id: 'task-7',
    key: 'ENG-119',
    title: 'Optimize Three.js GPU particle shader draw calls',
    description: 'Reduce vertex overhead on mobile devices to sustain locked 60 FPS under heavy particle fields.',
    priority: 'MEDIUM',
    status: 'in_progress',
    assignee: { name: 'Sarah Chen', avatar: 'S', role: 'Lead PM' },
    tags: ['WebGL', 'Graphics', 'Perf'],
    subtasks: { total: 4, completed: 2 },
    dueDate: 'Oct 24',
  },
  {
    id: 'task-8',
    key: 'SEC-301',
    title: 'Automated vulnerability scanning pipeline with Trivy & Snyk',
    description: 'Integrate container and package dependency audits into GitHub Actions workflow.',
    priority: 'HIGH',
    status: 'done',
    assignee: { name: 'Elena Rostova', avatar: 'E', role: 'Security Ops' },
    tags: ['Security', 'CI/CD'],
    subtasks: { total: 2, completed: 2 },
    dueDate: 'Shipped',
  },
];

const columnDefinitions = [
  { id: 'backlog', title: 'Backlog', accent: 'border-slate-700/60', badge: 'bg-slate-800 text-slate-400' },
  { id: 'todo', title: 'To Do', accent: 'border-blue-500/40', badge: 'bg-blue-500/10 text-blue-400' },
  { id: 'in_progress', title: 'In Progress', accent: 'border-indigo-500/50', badge: 'bg-indigo-500/10 text-indigo-400' },
  { id: 'review', title: 'Code Review', accent: 'border-purple-500/40', badge: 'bg-purple-500/10 text-purple-400' },
  { id: 'done', title: 'Completed', accent: 'border-emerald-500/40', badge: 'bg-emerald-500/10 text-emerald-400' },
];

export const KanbanPage: React.FC = () => {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [newStatus, setNewStatus] = useState<KanbanTask['status']>('todo');
  const [newTag, setNewTag] = useState('');

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((t) => t.id === draggableId);
    if (taskIndex === -1) return;

    const targetStatus = destination.droppableId as KanbanTask['status'];
    const [movedTask] = updatedTasks.splice(taskIndex, 1);
    movedTask.status = targetStatus;

    // Insert at destination position within that status
    const targetColumnTasks = updatedTasks.filter((t) => t.status === targetStatus);
    const otherTasks = updatedTasks.filter((t) => t.status !== targetStatus);

    targetColumnTasks.splice(destination.index, 0, movedTask);
    setTasks([...otherTasks, ...targetColumnTasks]);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      key: `ENG-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle.trim(),
      description: newDescription.trim() || 'No detailed description provided.',
      priority: newPriority,
      status: newStatus,
      assignee: { name: 'Midhun S.', avatar: 'M', role: 'Staff Architect' },
      tags: newTag ? newTag.split(',').map((t) => t.trim()) : ['Feature'],
      subtasks: { total: 3, completed: 0 },
      dueDate: 'In 3 days',
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setNewDescription('');
    setNewTag('');
    setIsNewTaskModalOpen(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getPriorityBadge = (priority: KanbanTask['priority']) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'HIGH':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'MEDIUM':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'LOW':
        return 'bg-slate-700/50 text-slate-300 border-slate-600/30';
    }
  };

  const completedCount = tasks.filter((t) => t.status === 'done').length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Kanban Board
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Sprint 24
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Drag-and-drop live workflow execution. Drag cards across columns to update task lifecycles in real-time.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Quick Metrics Capsule */}
          <div className="hidden sm:flex items-center gap-3 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 font-medium">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>{completedCount}/{tasks.length} Shipped</span>
            </div>
            <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>

          <button
            onClick={() => setIsNewTaskModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ticket key, title, or keywords..."
            className="w-full bg-slate-800/80 text-slate-200 text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1 pl-1">
            <Filter size={12} /> Priority:
          </span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                priorityFilter === p
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Drag and Drop Kanban Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
          {columnDefinitions.map((column) => {
            const columnTasks = filteredTasks.filter((t) => t.status === column.id);

            return (
              <div
                key={column.id}
                className={`bg-slate-900/70 border ${column.accent} rounded-2xl p-3.5 flex flex-col min-h-[580px] shadow-lg shadow-black/20`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-200">{column.title}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${column.badge}`}>
                      {columnTasks.length}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setNewStatus(column.id as KanbanTask['status']);
                      setIsNewTaskModalOpen(true);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title={`Add task to ${column.title}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Droppable Card Feed */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-3 p-1 rounded-xl transition-colors min-h-[480px] ${
                        snapshot.isDraggingOver ? 'bg-indigo-950/20 ring-1 ring-indigo-500/30' : ''
                      }`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setSelectedTask(task)}
                              className={`p-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 cursor-grab active:cursor-grabbing transition-all duration-150 space-y-2.5 shadow-md ${
                                snapshot.isDragging
                                  ? 'shadow-2xl ring-2 ring-indigo-500 rotate-1 scale-105 z-50 bg-slate-850'
                                  : ''
                              }`}
                            >
                              {/* Ticket Key & Priority Badge */}
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                                  {task.key}
                                </span>
                                <span
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getPriorityBadge(
                                    task.priority
                                  )}`}
                                >
                                  {task.priority}
                                </span>
                              </div>

                              {/* Title */}
                              <h4 className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug line-clamp-2">
                                {task.title}
                              </h4>

                              {/* Description Snippet */}
                              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                                {task.description}
                              </p>

                              {/* Tag Chips */}
                              <div className="flex flex-wrap gap-1 pt-1">
                                {task.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              {/* Card Footer: Assignee & Progress */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px] text-slate-400">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-[9px]">
                                    {task.assignee.avatar}
                                  </div>
                                  <span className="truncate max-w-[80px]">{task.assignee.name.split(' ')[0]}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="flex items-center gap-1 text-slate-400 font-mono text-[10px]">
                                    <Clock size={11} className="text-slate-500" />
                                    {task.dueDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {columnTasks.length === 0 && (
                        <div className="h-32 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-500 text-xs">
                          No tasks in this lane
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedTask(null)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {selectedTask.key}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedTask.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 space-y-2">
              <h5 className="text-xs font-semibold text-slate-300">Description</h5>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedTask.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Assignee</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    {selectedTask.assignee.avatar}
                  </div>
                  <span className="font-semibold text-slate-200">{selectedTask.assignee.name}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Priority</span>
                <span className={`inline-block font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(selectedTask.priority)}`}>
                  {selectedTask.priority}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-500">Status: <strong className="text-indigo-400 uppercase">{selectedTask.status.replace('_', ' ')}</strong></span>
              <button
                onClick={() => {
                  setTasks(tasks.filter((t) => t.id !== selectedTask.id));
                  setSelectedTask(null);
                }}
                className="text-xs text-rose-400 hover:text-rose-300 font-medium"
              >
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsNewTaskModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl z-10 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-indigo-400" />
                Create New Kanban Ticket
              </h3>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement automated Redis cache invalidation"
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description & Acceptance Criteria</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detail the technical specifications, endpoints, or requirements..."
                  className="w-full bg-slate-800 text-slate-200 text-sm px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e: any) => setNewPriority(e.target.value)}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Initial Lane</label>
                  <select
                    value={newStatus}
                    onChange={(e: any) => setNewStatus(e.target.value)}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Code Review</option>
                    <option value="done">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Backend, Security, Docker"
                  className="w-full bg-slate-800 text-slate-200 text-xs px-3.5 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default KanbanPage;
