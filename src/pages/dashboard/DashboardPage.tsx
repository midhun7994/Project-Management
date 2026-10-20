// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//   ArrowRight, 
//   ArrowUpRight, 
//   Play, 
//   Search, 
//   ChevronLeft, 
//   ChevronRight, 
//   Building2, 
//   Users, 
//   Globe2, 
//   Sparkles,
//   Layers,
//   CheckCircle2,
//   Clock,
//   Plus,
//   Compass,
//   LayoutGrid,
//   TrendingUp,
//   FolderKanban
// } from 'lucide-react';
// import { useAuthStore } from '../../features/auth/authStore';

// const featuredProjects = [
//   {
//     id: 'proj-1',
//     number: '01 / 04',
//     title: 'The Horizon Platform',
//     subtitle: 'High-throughput async backend orchestration with sub-20ms latency and real-time sprint synchronization.',
//     image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
//     category: 'CORE PLATFORM',
//     members: ['M', 'S', 'A'],
//     progress: 88,
//     status: 'ACTIVE SPRINT'
//   },
//   {
//     id: 'proj-2',
//     number: '02 / 04',
//     title: 'Vanguard Design System',
//     subtitle: 'Unified design tokens, ultra-smooth micro-interactions, and accessible glassmorphism components.',
//     image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
//     category: 'DESIGN SYSTEM',
//     members: ['E', 'K', 'V'],
//     progress: 74,
//     status: 'IN REVIEW'
//   },
//   {
//     id: 'proj-3',
//     number: '03 / 04',
//     title: 'Distributed Event Bus',
//     subtitle: 'Redis clustered event streaming with zero-packet-drop guarantee and live telemetry monitoring.',
//     image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
//     category: 'INFRASTRUCTURE',
//     members: ['D', 'R', 'T'],
//     progress: 92,
//     status: 'ACTIVE'
//   },
//   {
//     id: 'proj-4',
//     number: '04 / 04',
//     title: 'AI Telemetry Pipeline',
//     subtitle: 'Predictive sprint velocity modeling with anomaly detection and automated resource balancing.',
//     image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
//     category: 'ANALYTICS',
//     members: ['J', 'L', 'N'],
//     progress: 65,
//     status: 'PLANNING'
//   }
// ];

// export const DashboardPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { user } = useAuthStore();
//   const [activeProjectIndex, setActiveProjectIndex] = useState(0);
//   const [activeNav, setActiveNav] = useState<'Overview' | 'Projects' | 'Kanban' | 'Analytics' | 'About'>('Overview');
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);

//   const currentProject = featuredProjects[activeProjectIndex];

//   const handleNextProject = () => {
//     setActiveProjectIndex((prev) => (prev + 1) % featuredProjects.length);
//   };

//   const handlePrevProject = () => {
//     setActiveProjectIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
//   };

//   return (
//     <div className="relative w-full min-h-[calc(100vh-6rem)] rounded-[36px] overflow-hidden bg-black text-white selection:bg-white/20 select-none shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/[0.08]">
      
//       {/* 1. CINEMATIC HERO BACKGROUND WITH MOOD LIGHTING */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           src={currentProject.image} 
//           alt="Architectural Luxury Canvas" 
//           className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.12] transition-all duration-1000 scale-[1.02]"
//         />
//         {/* Cinematic Vignette & Ambient Black Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/70 pointer-events-none" />
//         {/* Warm Architectural Glow in Bottom Corner */}
//         <div className="absolute -bottom-20 -right-20 w-[600px] h-[500px] bg-amber-500/[0.08] rounded-full blur-[140px] pointer-events-none" />
//       </div>

//       {/* 2. FLOATING TOP NAVIGATION PILL (MATCHING REFERENCE) */}
//       <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-6">
        
//         {/* Brand Mark */}
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-xs tracking-tighter shadow-xl">
//             PF
//           </div>
//           <span className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase hidden sm:block">
//             ProjectFlow Studio
//           </span>
//         </div>

//         {/* Center Floating Pill Menu */}
//         <nav className="flex items-center gap-1 bg-black/60 backdrop-blur-2xl border border-white/10 px-2 py-1.5 rounded-full shadow-2xl">
//           {(['Overview', 'Projects', 'Kanban', 'Analytics', 'About'] as const).map((tab) => {
//             const isActive = activeNav === tab;
//             return (
//               <button
//                 key={tab}
//                 onClick={() => {
//                   setActiveNav(tab);
//                   if (tab === 'Projects') navigate('/projects');
//                   if (tab === 'Kanban') navigate('/kanban');
//                   if (tab === 'Analytics') navigate('/settings');
//                 }}
//                 className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
//                   isActive
//                     ? 'bg-white text-black font-semibold shadow-md'
//                     : 'text-zinc-300 hover:text-white hover:bg-white/5'
//                 }`}
//               >
//                 {tab}
//               </button>
//             );
//           })}
//         </nav>

//         {/* Right Action Buttons */}
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={() => navigate('/kanban')}
//             className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/30 transition-all shadow-lg"
//             title="Search Workspace"
//           >
//             <Search size={14} />
//           </button>

//           <button
//             onClick={() => navigate('/projects')}
//             className="group flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
//           >
//             <span>Start a Project</span>
//             <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
//               <ArrowRight size={12} />
//             </span>
//           </button>
//         </div>
//       </header>

//       {/* 3. HERO CONTENT SECTION */}
//       <div className="relative z-10 px-6 sm:px-12 pt-10 sm:pt-16 pb-12 flex flex-col justify-between min-h-[calc(100vh-20rem)]">
        
//         {/* Main Title & Subtitle */}
//         <div className="max-w-2xl space-y-5">
//           <p className="text-[11px] font-semibold tracking-[0.25em] text-zinc-300 uppercase">
//             Full-Stack SaaS — Agile Kanban — Cloud Database
//           </p>

//           <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.05]">
//             Projects <br />
//             <span className="font-display italic font-normal text-white/95">
//               That Inspire
//             </span>
//           </h1>

//           <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-lg font-light">
//             We architect high-velocity engineering workflows that blend intuitive task organization, real-time collaboration, and modern software design.
//           </p>

//           {/* Action CTAs */}
//           <div className="flex flex-wrap items-center gap-4 pt-3">
//             <button
//               onClick={() => navigate('/kanban')}
//               className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-black/80 hover:bg-black text-white text-xs font-semibold border border-white/20 hover:border-white/40 shadow-xl backdrop-blur-xl transition-all duration-300 group active:scale-95"
//             >
//               <span>Explore Workspace</span>
//               <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
//             </button>

//             <button
//               onClick={() => setIsVideoPlaying(!isVideoPlaying)}
//               className="flex items-center gap-2.5 px-4 py-2.5 rounded-full hover:bg-white/10 text-zinc-200 hover:text-white text-xs font-medium transition-all group"
//             >
//               <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-black/40 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
//                 <Play size={11} className="ml-0.5 fill-current" />
//               </span>
//               <span>Watch Walkthrough</span>
//             </button>
//           </div>
//         </div>

//         {/* 4. BOTTOM BENTO GRID (EXACT LAYOUT FROM REFERENCE IMAGE) */}
//         <div className="pt-16 grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          
//           {/* Card A: Featured Project Floating Glass Card (5 cols) */}
//           <div className="lg:col-span-5 bg-black/75 backdrop-blur-2xl border border-white/15 p-5 sm:p-6 rounded-[28px] shadow-2xl relative space-y-4">
            
//             <div className="flex gap-4 items-start">
//               {/* Project Mini Thumbnail */}
//               <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg">
//                 <img 
//                   src={currentProject.image} 
//                   alt={currentProject.title} 
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* Project Info */}
//               <div className="flex-1 min-w-0 space-y-1.5">
//                 <div className="flex items-center justify-between text-[10px] font-semibold tracking-wider text-zinc-400">
//                   <span className="uppercase">{currentProject.category}</span>
//                   <span className="font-mono text-zinc-500">{currentProject.number}</span>
//                 </div>

//                 <h3 className="text-base font-semibold text-white tracking-tight truncate">
//                   {currentProject.title}
//                 </h3>

//                 <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-light">
//                   {currentProject.subtitle}
//                 </p>

//                 <button
//                   onClick={() => navigate('/projects')}
//                   className="inline-flex items-center gap-1 text-xs font-medium text-white hover:text-zinc-300 pt-1 transition-colors group"
//                 >
//                   <span>View Project</span>
//                   <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>

//             {/* Bottom Row: Team Avatars & Carousel Arrows */}
//             <div className="flex items-center justify-between pt-2 border-t border-white/10">
//               {/* Team Stack */}
//               <div className="flex items-center -space-x-2">
//                 {currentProject.members.map((initial, i) => (
//                   <div 
//                     key={i} 
//                     className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-bold text-white flex items-center justify-center shadow-sm"
//                   >
//                     {initial}
//                   </div>
//                 ))}
//                 <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 text-[9px] font-bold text-zinc-400 flex items-center justify-center">
//                   +2
//                 </div>
//               </div>

//               {/* Carousel Indicators & Controls */}
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1">
//                   {featuredProjects.map((_, idx) => (
//                     <span 
//                       key={idx}
//                       className={`h-1 rounded-full transition-all duration-300 ${
//                         idx === activeProjectIndex ? 'w-5 bg-white' : 'w-2 bg-white/20'
//                       }`}
//                     />
//                   ))}
//                 </div>

//                 <div className="flex items-center gap-1.5">
//                   <button
//                     onClick={handlePrevProject}
//                     className="w-7 h-7 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all"
//                     aria-label="Previous Project"
//                   >
//                     <ChevronLeft size={13} />
//                   </button>
//                   <button
//                     onClick={handleNextProject}
//                     className="w-7 h-7 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all"
//                     aria-label="Next Project"
//                   >
//                     <ChevronRight size={13} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//           </div>

//           {/* Card B: Central Metrics Capsule Pill (4 cols) */}
//           <div className="lg:col-span-4 bg-black/75 backdrop-blur-2xl border border-white/15 px-6 py-5 rounded-[28px] shadow-2xl flex items-center justify-between">
            
//             <div className="text-left space-y-1">
//               <Building2 size={16} className="text-zinc-400" />
//               <div className="text-xl font-bold text-white tracking-tight">250+</div>
//               <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Tasks Shipped</div>
//             </div>

//             <div className="h-8 w-px bg-white/10" />

//             <div className="text-left space-y-1">
//               <Users size={16} className="text-zinc-400" />
//               <div className="text-xl font-bold text-white tracking-tight">120+</div>
//               <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Team Leads</div>
//             </div>

//             <div className="h-8 w-px bg-white/10" />

//             <div className="text-left space-y-1">
//               <Globe2 size={16} className="text-zinc-400" />
//               <div className="text-xl font-bold text-white tracking-tight">15+</div>
//               <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Cloud Microservices</div>
//             </div>

//           </div>

//           {/* Card C: Action Callout Card (3 cols) */}
//           <div 
//             onClick={() => navigate('/kanban')}
//             className="lg:col-span-3 bg-zinc-900/90 hover:bg-zinc-900 backdrop-blur-2xl border border-white/15 p-5 rounded-[28px] shadow-2xl cursor-pointer group transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[140px]"
//           >
//             <div className="flex items-center justify-between">
//               <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
//                 <img 
//                   src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=200&auto=format&fit=crop" 
//                   alt="Sprint View"
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
//                 />
//               </div>

//               <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-md">
//                 <ArrowUpRight size={15} />
//               </div>
//             </div>

//             <div className="space-y-0.5 pt-3">
//               <h4 className="text-sm font-semibold text-white tracking-tight group-hover:text-zinc-200">
//                 Bring Your Vision To Life
//               </h4>
//               <p className="text-[11px] text-zinc-400 leading-snug font-light">
//                 Launch your next sprint cycle with automated Kanban tracking.
//               </p>
//             </div>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default DashboardPage;


import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import {
  LayoutDashboard,
  FolderKanban,
  KanbanSquare,
  MessageSquare,
  Bell,
  Settings,
  Plus,
  Search,
  Check,
  ChevronDown,
  LayoutGrid,
  List,
  ArrowUpRight,
  MoreVertical,
} from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';
import { projectsData, statsData } from '../../data/dashboardData';

/* ---------- Data you can replace with API calls later ---------- */

// Weekly activity: replace with real per-day counts when you have them
const weeklyActivity = [
  { day: 'Mon', completed: 18, created: 24 },
  { day: 'Tue', completed: 28, created: 30 },
  { day: 'Wed', completed: 42, created: 26 },
  { day: 'Thu', completed: 35, created: 22 },
  { day: 'Fri', completed: 50, created: 28 },
  { day: 'Sat', completed: 22, created: 12 },
  { day: 'Sun', completed: 15, created: 8 },
];

const initialTasks = [
  { id: 't1', title: 'Migrate PostgreSQL pool to asyncpg', due: 'Tomorrow', done: false },
  { id: 't2', title: 'Implement Argon2id password hashing', due: 'Today', done: true },
  { id: 't3', title: 'Configure Redis sentinel failover', due: 'Oct 20', done: false },
  { id: 't4', title: 'OpenAPI schema tests with Pytest', due: 'Oct 22', done: false },
];

/* ---------- Small presentational pieces ---------- */

const Ring: React.FC<{ value: number; size?: number; stroke?: number; dark?: boolean }> = ({
  value,
  size = 28,
  stroke = 3,
  dark = false,
}) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(Math.max(value, 0), 100) / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={dark ? '#3a3a3d' : '#e5e5e7'} strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={dark ? '#ffffff' : '#111111'}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

const Card: React.FC<{ dark?: boolean; className?: string; children: React.ReactNode }> = ({
  dark,
  className = '',
  children,
}) => (
  <div
    className={`rounded-[24px] p-5 shadow-sm ${dark ? 'bg-[#1c1c1e] text-white shadow-lg' : 'bg-white text-neutral-900'} ${className}`}
  >
    {children}
  </div>
);

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { name: 'Projects', icon: FolderKanban, to: '/projects' },
  { name: 'Kanban', icon: KanbanSquare, to: '/kanban' },
  { name: 'Team Chat', icon: MessageSquare, to: '/chat' },
  { name: 'Notifications', icon: Bell, to: '/notifications' },
];

/* ---------- Page ---------- */

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const firstName = user?.full_name?.split(' ')[0] || 'there';
  const initials = (user?.full_name || 'U')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const [tasks, setTasks] = useState(initialTasks);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortKey, setSortKey] = useState<'name' | 'progress'>('name');

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  // Derived numbers from real data sources
  const completedProjects = projectsData.filter((p) => p.status === 'COMPLETED').length;
  const activeProjects = projectsData.filter((p) => p.status === 'ACTIVE').length;
  const inReviewProjects = projectsData.filter((p) => p.status === 'IN_REVIEW').length;
  const totalProjects = projectsData.length;
  const tasksDone = tasks.filter((t) => t.done).length;
  const taskPct = Math.round((tasksDone / (tasks.length || 1)) * 100);

  const sortedProjects = useMemo(() => {
    const copy = [...projectsData];
    return sortKey === 'name'
      ? copy.sort((a, b) => a.name.localeCompare(b.name))
      : copy.sort((a, b) => b.progress - a.progress);
  }, [sortKey]);

  return (
    <div className="min-h-screen w-full p-4 sm:p-6">
      <div className="mx-auto max-w-[1240px] flex gap-5">
        {/* Sidebar */}
        <aside className="hidden md:flex w-56 shrink-0 flex-col bg-white rounded-[28px] p-5 shadow-sm sticky top-6 self-start h-[calc(100vh-3rem)]">
          <div className="flex items-center gap-2 px-1 pb-8">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-xs font-bold">
              PF
            </div>
            <span className="text-base font-bold tracking-tight text-neutral-900">ProjectFlow</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    isActive ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'
                  }`
                }
              >
                <item.icon size={16} />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => navigate('/settings')}
            className="mt-auto flex items-center gap-3 px-3 py-2 text-sm text-neutral-600 hover:text-black"
          >
            <Settings size={16} /> Settings
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 space-y-5">
          {/* Header */}
          <header className="flex items-center justify-between pt-1">
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">Hi, {firstName}!</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/projects?create=true')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-black transition-colors"
              >
                <Plus size={15} /> Create
              </button>
              <button
                onClick={() => navigate('/kanban')}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-700 shadow-sm"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
              <button
                onClick={() => navigate('/notifications')}
                className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-700 shadow-sm"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500" />
              </button>
              <div className="w-10 h-10 rounded-full bg-neutral-800 text-white text-xs font-bold flex items-center justify-center">
                {initials}
              </div>
            </div>
          </header>

          {/* Row 1: overview, weekly chart, progress ring */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Card dark className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Overall Information</h3>
                <MoreVertical size={15} className="text-neutral-400" />
              </div>
              <div className="flex items-end gap-5">
                <div>
                  <div className="text-5xl font-bold leading-none">{tasksDone}</div>
                  <p className="text-[11px] text-neutral-400 mt-1">Tasks done<br />today</p>
                </div>
                <div className="h-10 w-px bg-neutral-700" />
                <div>
                  <div className="text-4xl font-bold leading-none">{totalProjects}</div>
                  <p className="text-[11px] text-neutral-400 mt-1">Total<br />projects</p>
                </div>
              </div>
              <div className="h-0.5 w-12 bg-white rounded" />
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: totalProjects, label: 'Projects', highlight: true },
                  { value: inReviewProjects + activeProjects, label: 'In Progress' },
                  { value: completedProjects, label: 'Completed' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl p-3 flex flex-col items-center gap-1 ${
                      s.highlight ? 'bg-neutral-200 text-neutral-900' : 'border border-white/10 text-white'
                    }`}
                  >
                    <span className="text-xl font-bold">{s.value}</span>
                    <span className="text-[10px] opacity-70">{s.label}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Weekly progress</h3>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neutral-900" /> Completed</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-neutral-300" /> Created</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyActivity} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#737373' }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
                    <Line type="monotone" dataKey="created" stroke="#c4c4c8" strokeWidth={1.5} dot={false} />
                    <Line type="monotone" dataKey="completed" stroke="#111111" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Task progress</h3>
              <div className="flex items-center justify-between gap-4">
                <ul className="space-y-2 text-xs text-neutral-600">
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neutral-900" /> Done: {tasksDone}</li>
                  <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neutral-300" /> Open: {tasks.length - tasksDone}</li>
                </ul>
                <div className="relative w-28 h-28">
                  <Ring value={taskPct} size={112} stroke={6} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold">{taskPct}%</span>
                    <span className="text-[9px] text-neutral-400">complete</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/kanban')}
                className="mt-auto w-full py-2.5 rounded-full border border-neutral-300 text-sm font-medium text-neutral-800 hover:bg-neutral-50 flex items-center justify-center gap-2"
              >
                Open board <ArrowUpRight size={14} />
              </button>
            </Card>
          </div>

          {/* Row 2: task checklist + task cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            <Card className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">My tasks</h3>
                <Ring value={taskPct} size={26} stroke={3} />
              </div>
              <ul className="space-y-3">
                {tasks.map((t) => (
                  <li
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className="flex items-center gap-3 text-sm cursor-pointer select-none"
                  >
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                        t.done ? 'bg-neutral-900 border-neutral-900 text-white' : 'border-neutral-300'
                      }`}
                    >
                      {t.done && <Check size={11} />}
                    </span>
                    <span className={`flex-1 truncate ${t.done ? 'text-neutral-400 line-through' : 'text-neutral-900'}`}>
                      {t.title}
                    </span>
                    <span className="text-[10px] text-neutral-400 shrink-0">{t.due}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-900">Tasks in process ({tasks.filter((t) => !t.done).length})</h3>
                <button onClick={() => navigate('/kanban')} className="text-xs text-neutral-500 hover:text-black flex items-center gap-1">
                  Open board <ArrowUpRight size={12} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tasks
                  .filter((t) => !t.done)
                  .slice(0, 2)
                  .map((t) => (
                    <div key={t.id} className="bg-white rounded-[22px] p-4 shadow-md space-y-6">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">{t.due}</span>
                        <MoreVertical size={15} className="text-neutral-400" />
                      </div>
                      <p className="text-sm font-medium leading-snug text-neutral-900">{t.title}</p>
                    </div>
                  ))}
                <button
                  onClick={() => navigate('/kanban?newTask=true')}
                  className="rounded-[22px] border-2 border-dashed border-neutral-300 flex items-center justify-center gap-2 text-sm font-medium text-neutral-700 hover:bg-white/60 min-h-[140px]"
                >
                  <Plus size={16} /> Add task
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: projects */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900">Projects</h3>
              <div className="flex items-center gap-3 text-xs text-neutral-500">
                <button
                  onClick={() => setSortKey(sortKey === 'name' ? 'progress' : 'name')}
                  className="flex items-center gap-1 hover:text-black"
                >
                  Sort by {sortKey} <ChevronDown size={13} />
                </button>
                <button
                  onClick={() => setView('grid')}
                  className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-200'}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={13} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-1.5 rounded-md ${view === 'list' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-200'}`}
                  aria-label="List view"
                >
                  <List size={13} />
                </button>
              </div>
            </div>

            <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : 'space-y-3'}>
              {sortedProjects.map((p) => (
                <Card
                  key={p.id}
                  dark
                  className="space-y-3 cursor-pointer hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold truncate pr-2">{p.name}</h4>
                    <Ring value={p.progress} size={26} stroke={3} dark />
                  </div>
                  <p className="text-[11px] text-neutral-300 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'COMPLETED' ? 'bg-emerald-400' : 'bg-white'}`} />
                    {p.status.replace('_', ' ')}
                  </p>
                  <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">{p.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
