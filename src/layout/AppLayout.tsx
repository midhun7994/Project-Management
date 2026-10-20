import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-transparent text-zinc-100 flex font-sans selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Smooth Subtle Ambient Glows - Pitch Black Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft floating spotlight */}
        <div className="absolute -top-32 left-1/3 w-[600px] h-[400px] bg-indigo-600/[0.07] rounded-full blur-[140px] animate-ambient" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[400px] bg-emerald-600/[0.04] rounded-full blur-[160px] animate-ambient" style={{ animationDelay: '-7s' }} />
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[350px] bg-purple-600/[0.04] rounded-full blur-[140px] animate-ambient" style={{ animationDelay: '-12s' }} />
        
        {/* Elegant minimal hairline grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Obsidian Black Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 relative z-10 ${
          collapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <Header onMobileMenuClick={() => setCollapsed(!collapsed)} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto relative">
          <div key={location.pathname} className="animate-page w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
