import { APLevel } from './ap';

export interface PFMEATableRow {
  riskStateId: string;
  processStep: string;
  failureMode: string;
  failureEffect: string;
  failureCause: string;
  preventionControls: string[];
  detectionControls: string[];
  severity: number;
  occurrence: number;
  detection: number;
  apLevel: APLevel;
  status: 'DRAFT' | 'ACTIVE' | 'UNDER_REVIEW';
  lastUpdated: string;
  specialCharacteristic?: 'CC' | 'SC' | null;
}