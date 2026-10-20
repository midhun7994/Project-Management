import React from 'react';
import SupernovaScene from '../components/3d/SupernovaScene';
import SupernovaNavbar from '../components/dashboard/SupernovaNavbar';
import HeroContent from '../components/dashboard/HeroContent';
import ControlPanel from '../components/dashboard/ControlPanel';
import SimulationInfo from '../components/dashboard/SimulationInfo';
import { useSupernovaSimulation } from '../hooks/useSupernovaSimulation';
import { useNavigate } from 'react-router-dom';

export const SupernovaDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { config, updateParam, resetConfig } = useSupernovaSimulation();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
      
      {/* 1. GPU 3D PARTICLE CANVAS SCENE */}
      <SupernovaScene config={config} />

      {/* 2. FLOATING GLASS NAVBAR */}
      <SupernovaNavbar />

      {/* 3. HERO CONTENT OVERLAY */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <HeroContent
          onExploreClick={() => {
            const el = document.getElementById('controls');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onAnalyticsClick={() => navigate('/dashboard')}
        />

        {/* 4. LIVE TELEMETRY INFO PANEL (BOTTOM-LEFT) */}
        <SimulationInfo config={config} />
      </div>

      {/* 5. INTERACTIVE CONTROL PANEL (RIGHT) */}
      <div id="controls">
        <ControlPanel
          config={config}
          onChange={updateParam}
          onReset={resetConfig}
        />
      </div>

    </div>
  );
};

export default SupernovaDashboardPage;
