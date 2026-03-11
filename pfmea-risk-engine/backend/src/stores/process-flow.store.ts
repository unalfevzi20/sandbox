import { Injectable } from '@nestjs/common';
import { ProcessFlowNode } from '../types/process-flow';

@Injectable()
export class ProcessFlowStore {
  private byFamily = new Map<string, ProcessFlowNode[]>();

  constructor() {
    const now = new Date().toISOString();
    this.byFamily.set('FAMILY-THERMOPLASTIC', [
      {
        stepId: 'S1',
        stepName: 'Material Feeding',
        parentStepId: null,
        isBranch: false,
        failureCauses: [],
        preventionControls: [],
        detectionControls: [],
        activeAPLevel: null,
        lastUpdated: now,
      },
      {
        stepId: 'S2',
        stepName: 'Plasticizing',
        parentStepId: 'S1',
        isBranch: false,
        failureCauses: [],
        preventionControls: [],
        detectionControls: [],
        activeAPLevel: null,
        lastUpdated: now,
      },
      {
        stepId: 'S3',
        stepName: 'Injection / Filling',
        parentStepId: 'S2',
        isBranch: false,
        // 🔶 Burada yeni Failure Cause eklendi
        failureCauses: [
          'Short Shot (Low pressure)',
          'Nozzle clog / material flow restriction', // YENİ
        ],
        // Mevcut kontroller korunuyor
        preventionControls: ['Closed-loop pressure'],
        detectionControls: ['Vision inspector'],
        activeAPLevel: 'HIGH',
        lastUpdated: now,
      },
      {
        stepId: 'S4',
        stepName: 'Cooling & Ejection',
        parentStepId: 'S3',
        isBranch: false,
        failureCauses: [],
        preventionControls: [],
        detectionControls: [],
        activeAPLevel: null,
        lastUpdated: now,
      },
      {
        stepId: 'S5',
        stepName: 'Deflashing',
        parentStepId: 'S4',
        isBranch: false,
        failureCauses: [],
        preventionControls: [],
        detectionControls: [],
        activeAPLevel: null,
        lastUpdated: now,
      },
      {
        stepId: 'B1',
        stepName: 'Magnetization',
        parentStepId: 'S4',
        isBranch: true,
        failureCauses: [],
        preventionControls: [],
        detectionControls: [],
        activeAPLevel: null,
        lastUpdated: now,
      },
      {
        stepId: 'B2',
        stepName: 'Flame Production (Pan Handles)',
        parentStepId: 'S4',
        isBranch: true,
        failureCauses: [],
        preventionControls: [],
        detectionControls: [],
        activeAPLevel: null,
        lastUpdated: now,
      },
    ]);
  }

  getByFamily(familyId: string): ProcessFlowNode[] {
    return this.byFamily.get(familyId) ?? [];
  }
}