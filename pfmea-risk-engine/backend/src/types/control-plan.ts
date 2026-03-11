import { APLevel } from './ap';

export interface ControlPlanRow {
  riskStateId: string;
  processStep: string;
  processCharacteristic: string;
  monitoringMethod: string;
  inspectionMethod: string;
  reactionPlan: string;
  severity: number;
  occurrence: number;
  detection: number;
  apLevel: APLevel;
  frequencyPrototype: string;
  frequencyPreLaunch: string;
  frequencyProduction: string;
  lastUpdated: string;
  specialCharacteristic?: 'CC' | 'SC' | null;
}