import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Hash,
  User,
  Search,
  Smile,
  Paperclip,
  MoreVertical,
  CheckCheck,
  Pin,
  Sparkles,
  Users,
  Code2,
  ThumbsUp,
  Flame,
  Heart,
  Eye,
  Rocket
} from 'lucide-react';
import { useAuthStore } from '../../features/auth/authStore';

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    role: string;
    isCurrentUser?: boolean;
  };
  text: string;
  codeSnippet?: string;
  timestamp: string;
  reactions: { emoji: string; count: number; userReacted?: boolean }[];
}

const initialChannels = [
  { id: 'eng', name: 'engineering', description: 'Architecture, PR reviews, and sprint discussion', unread: 2 },
  { id: 'sec', name: 'security-audit', description: 'Argon2id, OWASP compliance, and token validation', unread: 1 },
  { id: 'dep', name: 'deployments', description: 'Automated CI/CD build outputs and K8s rolling releases', unread: 0 },
  { id: 'prod', name: 'product-releases', description: 'Milestones, feature launches, and user feedback', unread: 0 },
  { id: 'gen', name: 'general', description: 'All-hands workspace conversation', unread: 0 },
];

const directMessages = [
  { id: 'dm-1', name: 'Elena Rostova', role: 'Security Ops', status: 'online', avatar: 'E' },
  { id: 'dm-2', name: 'Sarah Chen', role: 'Lead PM', status: 'online', avatar: 'S' },
  { id: 'dm-3', name: 'Marcus Vance', role: 'DevOps Lead', status: 'busy', avatar: 'MV' },
  { id: 'dm-4', name: 'Alex Rivera', role: 'Fullstack Eng', status: 'away', avatar: 'A' },
];

export const ChatPage: React.FC = () => {
  const { user } = useAuthStore();
  const [activeChannel, setActiveChannel] = useState(initialChannels[0]);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: {
        name: 'Elena Rostova',
        avatar: 'E',
        role: 'Security Ops',
      },
      text: 'Team, the Argon2id hashing layer and HttpOnly cookie refresh routines have been merged into branch `feat/security-auth-v2`. Please pull the latest changes before testing the project endpoints.',
      codeSnippet: `// FastAPI Token Verification Middleware
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    payload = decode_jwt(token)
    if not payload.get("sub"):
        raise HTTPException(status_code=401, detail="Invalid token signature")
    return await user_service.get_by_id(db, payload["sub"])`,
      timestamp: '10:45 AM',
      reactions: [
        { emoji: '🚀', count: 4, userReacted: true },
        { emoji: '🔥', count: 3, userReacted: false },
        { emoji: '👀', count: 2, userReacted: false },
      ],
    },
    {
      id: 'm2',
      sender: {
        name: 'Sarah Chen',
        avatar: 'S',
        role: 'Lead PM',
      },
      text: 'Sprint 24 velocity is tracking at 94%. If we ship the Redis sentinel migration by tomorrow morning, we can deploy staging ahead of schedule!',
      timestamp: '11:02 AM',
      reactions: [
        { emoji: '👍', count: 5, userReacted: false },
        { emoji: '❤️', count: 2, userReacted: false },
      ],
    },
    {
      id: 'm3',
      sender: {
        name: 'Marcus Vance',
        avatar: 'MV',
        role: 'DevOps Lead',
      },
      text: 'Docker builds for arm64 and amd64 multi-arch images completed in 42 seconds. Ready on ghcr.io/projectflow/api:v1.2.',
      timestamp: '11:15 AM',
      reactions: [
        { emoji: '🚀', count: 3, userReacted: false },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentUserName = user?.full_name || 'Midhun (Lead Arch)';
    const currentUserAvatar = currentUserName.split(' ')[0][0].toUpperCase();

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: {
        name: currentUserName,
        avatar: currentUserAvatar,
        role: user?.role ? user.role.replace(/_/g, ' ') : 'Staff Architect',
        isCurrentUser: true,
      },
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleReact = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;

        const existingReaction = msg.reactions.find((r) => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions.map((r) =>
              r.emoji === emoji
                ? {
                    ...r,
                    count: r.userReacted ? r.count - 1 : r.count + 1,
                    userReacted: !r.userReacted,
                  }
                : r
            ).filter(r => r.count > 0),
          };
        } else {
          return {
            ...msg,
            reactions: [...msg.reactions, { emoji, count: 1, userReacted: true }],
          };
        }
      })
    );
  };

  return (
    <div className="h-[calc(100vh-125px)] flex flex-col md:flex-row bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
      
      {/* Channels & DMs Sidebar */}
      <div className="w-full md:w-64 lg:w-72 border-r border-slate-800/80 bg-slate-950/60 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-5">
          {/* Workspace Title */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm">Engineering Workspace</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          {/* Channels Section */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
              Channels ({initialChannels.length})
            </span>
            {initialChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  activeChannel.id === channel.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Hash size={14} className={activeChannel.id === channel.id ? 'text-white' : 'text-slate-500'} />
                  <span className="truncate">{channel.name}</span>
                </div>
                {channel.unread > 0 && activeChannel.id !== channel.id && (
                  <span className="px-1.5 py-0.2 rounded-full bg-indigo-500 text-white text-[10px] font-bold">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Direct Messages Section */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
              Direct Messages
            </span>
            {directMessages.map((dm) => (
              <div
                key={dm.id}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-[10px]">
                      {dm.avatar}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ring-2 ring-slate-950 ${
                        dm.status === 'online'
                          ? 'bg-emerald-400'
                          : dm.status === 'busy'
                          ? 'bg-rose-500'
                          : 'bg-amber-400'
                      }`}
                    ></span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-200 text-xs leading-none">{dm.name}</p>
                    <span className="text-[10px] text-slate-500">{dm.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Status Bottom Card */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-semibold">
            <span>WebSocket Gateway</span>
            <span className="text-emerald-400">Connected</span>
          </div>
          <p className="text-[10px] text-slate-500">Latency: 14ms • TLS 1.3</p>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 flex flex-col bg-slate-900/40">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Hash size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">{activeChannel.name}</h3>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700/60">
                  {messages.length} messages
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{activeChannel.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors" title="Pinned items">
              <Pin size={16} />
            </button>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors" title="Members">
              <Users size={16} />
            </button>
          </div>
        </div>

        {/* Pinned Broadcast Pill */}
        <div className="mx-4 mt-3 px-3.5 py-2 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-xs text-indigo-300">
          <div className="flex items-center gap-2">
            <Pin size={13} className="text-indigo-400 shrink-0" />
            <span>Pinned: Sprint 24 Code Freeze is scheduled for Friday 17:00 UTC.</span>
          </div>
          <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">Notice</span>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-5">
          {messages.map((message) => {
            const isMe = message.sender.isCurrentUser;

            return (
              <div key={message.id} className="flex items-start gap-3.5 group">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                  {message.sender.avatar}
                </div>

                {/* Message Body */}
                <div className="flex-1 space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{message.sender.name}</span>
                    <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded">
                      {message.sender.role}
                    </span>
                    <span className="text-[10px] text-slate-500">{message.timestamp}</span>
                  </div>

                  {/* Bubble */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-200 text-xs sm:text-sm leading-relaxed space-y-2.5">
                    <p>{message.text}</p>

                    {/* Optional Code Snippet block */}
                    {message.codeSnippet && (
                      <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 p-3 font-mono text-xs text-indigo-300/90 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-800">
                          <span className="flex items-center gap-1">
                            <Code2 size={12} className="text-indigo-400" /> Python / FastAPI
                          </span>
                          <span>Verified</span>
                        </div>
                        <pre className="overflow-x-auto whitespace-pre pt-1.5 text-[11px] leading-relaxed">
                          {message.codeSnippet}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Reactions & Quick Emote Bar */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {message.reactions.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => handleReact(message.id, r.emoji)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium border transition-all ${
                          r.userReacted
                            ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700/60 hover:text-slate-200'
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span className="text-[10px] font-bold">{r.count}</span>
                      </button>
                    ))}

                    {/* Quick Reactions Trigger */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 pl-1">
                      {['🚀', '👍', '❤️', '🔥'].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleReact(message.id, emoji)}
                          className="hover:scale-125 transition-transform text-xs p-1 rounded hover:bg-slate-800"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/80">
          <form onSubmit={handleSendMessage} className="space-y-2">
            <div className="relative flex items-center bg-slate-800 rounded-2xl border border-slate-700/80 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/30 transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message #${activeChannel.name}...`}
                className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-xs sm:text-sm pl-4 pr-24 py-3 focus:outline-none"
              />

              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setInputText((prev) => prev + ' 🚀')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
                  title="Add rocket"
                >
                  <Smile size={18} />
                </button>
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white rounded-xl transition-all shadow-md shadow-indigo-600/30"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>Press <strong>Enter</strong> to send. Formatting supports code and markdown.</span>
              <span className="font-mono text-[10px]">Active in #{activeChannel.name}</span>
            </div>
          </form>
        </div>

      </div>

    </div>
  );
};

export default ChatPage;
