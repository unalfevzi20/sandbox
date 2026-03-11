import { APLevel } from './ap';

export interface ProcessFlowNode {
  stepId: string;
  stepName: string;
  parentStepId?: string | null;
  isBranch?: boolean;
  failureCauses: string[];
  preventionControls: string[];
  detectionControls: string[];
  activeAPLevel: APLevel | null;
  lastUpdated: string;
}