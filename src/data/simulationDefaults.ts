export interface SimulationConfig {
  particleCount: number;
  blastRadius: number;
  expansionSpeed: number;
  coreBrightness: number;
  debrisChaos: number;
  shellCount: number;
  binarySeparation: number;
  binaryOrbitSpeed: number;
  bloomStrength: number;
  quality: 'HIGH' | 'MEDIUM' | 'LOW';
}

export const DEFAULT_SIMULATION: SimulationConfig = {
  particleCount: 20000,
  blastRadius: 70,
  expansionSpeed: 6.0,
  coreBrightness: 2.5,
  debrisChaos: 1.8,
  shellCount: 3,
  binarySeparation: 12.0,
  binaryOrbitSpeed: 1.5,
  bloomStrength: 1.8,
  quality: 'HIGH',
};
