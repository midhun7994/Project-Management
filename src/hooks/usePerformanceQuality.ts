import { useState, useEffect } from 'react';

export const usePerformanceQuality = () => {
  const [quality, setQuality] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [targetParticleCount, setTargetParticleCount] = useState<number>(20000);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setQuality('LOW');
        setTargetParticleCount(5000);
      } else if (width < 1024) {
        setQuality('MEDIUM');
        setTargetParticleCount(10000);
      } else {
        setQuality('HIGH');
        setTargetParticleCount(20000);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { quality, targetParticleCount, setQuality };
};

export default usePerformanceQuality;
