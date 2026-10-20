export interface StatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'IN_REVIEW' | 'COMPLETED' | 'ON_HOLD';
  progress: number;
  updatedAt: string;
  category: string;
  membersCount: number;
  accentColor: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'project' | 'task' | 'profile' | 'upload' | 'security';
}

export interface AnalyticsDataPoint {
  name: string;
  completed: number;
  created: number;
  productivity: number;
}

export const statsData: StatItem[] = [
  {
    id: '1',
    label: 'TOTAL PROJECTS',
    value: '24',
    change: '+12% vs last month',
    isPositive: true,
    iconName: 'FolderKanban',
  },
  {
    id: '2',
    label: 'ACTIVE PROJECTS',
    value: '08',
    change: '4 due this week',
    isPositive: true,
    iconName: 'Clock',
  },
  {
    id: '3',
    label: 'TASKS COMPLETED',
    value: '156',
    change: '+28 this week',
    isPositive: true,
    iconName: 'CheckCircle2',
  },
  {
    id: '4',
    label: 'PRODUCTIVITY',
    value: '87%',
    change: '+5% performance efficiency',
    isPositive: true,
    iconName: 'TrendingUp',
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'ProjectFlow Core Engine',
    description: 'High-throughput async backend microservices with FastAPI & PostgreSQL ORM layer.',
    status: 'ACTIVE',
    progress: 78,
    updatedAt: '12m ago',
    category: 'Backend Architecture',
    membersCount: 6,
    accentColor: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'proj-2',
    name: 'Cinematic SaaS UI Redesign',
    description: 'Next-generation floating layout, glassmorphic widgets, and ultra-fluid animations.',
    status: 'ACTIVE',
    progress: 92,
    updatedAt: '1h ago',
    category: 'Design System',
    membersCount: 4,
    accentColor: 'from-amber-400 to-rose-500',
  },
  {
    id: 'proj-3',
    name: 'Real-time WebSocket Chat & PubSub',
    description: 'Instant notification pipeline, channel threads, and Redis pub/sub cluster.',
    status: 'IN_REVIEW',
    progress: 64,
    updatedAt: '3h ago',
    category: 'Realtime Infrastructure',
    membersCount: 5,
    accentColor: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'proj-4',
    name: 'Security Audit & Argon2id Auth',
    description: 'BOLA protection, HTTP-only JWT cookies, rate-limiting & automated vulnerability scanning.',
    status: 'COMPLETED',
    progress: 100,
    updatedAt: '1d ago',
    category: 'Security & Compliance',
    membersCount: 3,
    accentColor: 'from-blue-500 to-cyan-500',
  },
];

export const activityData: ActivityItem[] = [
  {
    id: 'act-1',
    user: 'Midhun',
    avatar: 'M',
    action: 'created project',
    target: 'Cinematic SaaS UI Redesign',
    timestamp: '2 minutes ago',
    type: 'project',
  },
  {
    id: 'act-2',
    user: 'Sarah Chen',
    avatar: 'SC',
    action: 'completed task',
    target: 'Implement Argon2id password hashing',
    timestamp: '18 minutes ago',
    type: 'task',
  },
  {
    id: 'act-3',
    user: 'Alex Rivers',
    avatar: 'AR',
    action: 'uploaded attachment',
    target: 'Architecture_Diagram_v2.pdf',
    timestamp: '1 hour ago',
    type: 'upload',
  },
  {
    id: 'act-4',
    user: 'System Bot',
    avatar: 'SB',
    action: 'triggered automated security scan',
    target: '0 vulnerabilities detected',
    timestamp: '3 hours ago',
    type: 'security',
  },
];

export const weeklyAnalytics: AnalyticsDataPoint[] = [
  { name: 'Mon', completed: 18, created: 24, productivity: 75 },
  { name: 'Tue', completed: 28, created: 30, productivity: 82 },
  { name: 'Wed', completed: 42, created: 26, productivity: 89 },
  { name: 'Thu', completed: 35, created: 22, productivity: 85 },
  { name: 'Fri', completed: 50, created: 28, productivity: 94 },
  { name: 'Sat', completed: 22, created: 12, productivity: 78 },
  { name: 'Sun', completed: 15, created: 8, productivity: 70 },
];

export const monthlyAnalytics: AnalyticsDataPoint[] = [
  { name: 'Week 1', completed: 120, created: 140, productivity: 78 },
  { name: 'Week 2', completed: 165, created: 130, productivity: 85 },
  { name: 'Week 3', completed: 210, created: 175, productivity: 91 },
  { name: 'Week 4', completed: 190, created: 160, productivity: 88 },
];
