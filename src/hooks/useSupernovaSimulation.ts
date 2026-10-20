import { useState, useCallback } from 'react';
import { DEFAULT_SIMULATION, SimulationConfig } from '../data/simulationDefaults';

export const useSupernovaSimulation = () => {
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_SIMULATION);

  const updateParam = useCallback(<K extends keyof SimulationConfig>(key: K, value: SimulationConfig[K]) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_SIMULATION);
  }, []);

  return {
    config,
    updateParam,
    resetConfig,
    setConfig,
  };
};

export default useSupernovaSimulation;
