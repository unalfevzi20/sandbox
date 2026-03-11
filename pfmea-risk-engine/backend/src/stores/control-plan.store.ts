import { Injectable } from '@nestjs/common';
import { ControlPlanRow } from '../types/control-plan';
import { PFMEAStore } from './pfmea.store';
import { ProcessRiskProjection } from './process-risk-projection';

@Injectable()
export class ControlPlanStore {
  constructor(
    private readonly pfmeaStore: PFMEAStore,
    private readonly projection: ProcessRiskProjection
  ) {}

  getProduction(riskStateId: string): ControlPlanRow | undefined {
    const pfmea = this.pfmeaStore.getById(riskStateId);
    if (!pfmea) return undefined;

    // Process step bazlı en kötü AP
    const worstAP = this.projection.getWorstAPForProcess(pfmea.processStep);

    return {
      riskStateId: pfmea.riskStateId,
      processStep: pfmea.processStep,
      processCharacteristic: pfmea.failureCause,
      monitoringMethod: pfmea.preventionControls[0],
      inspectionMethod: pfmea.detectionControls[0],

      // HTML escape kaldırıldı
      reactionPlan: 'Stop line, root cause cleaning & record',

      severity: pfmea.severity,
      occurrence: pfmea.occurrence,
      detection: pfmea.detection,

      // PFMEA AP değil, process-level worst AP
      apLevel: worstAP,

      frequencyPrototype: '100% inspection',
      frequencyPreLaunch: this.calculateFreq(worstAP),
      frequencyProduction: this.calculateFreq(worstAP),

      // Her request anı değil, gerçek veri güncelleme zamanı
      lastUpdated: pfmea.lastUpdated,

      specialCharacteristic: pfmea.specialCharacteristic
    };
  }

  getByPhase(
    riskStateId: string,
    phase: 'PROTOTYPE' | 'PRE_LAUNCH' | 'PRODUCTION'
  ): ControlPlanRow | undefined {
    const base = this.getProduction(riskStateId);
    if (!base) return undefined;

    if (phase === 'PROTOTYPE') {
      return {
        ...base,
        frequencyProduction: base.frequencyPrototype
      };
    }

    if (phase === 'PRE_LAUNCH') {
      return {
        ...base,
        frequencyProduction: base.frequencyPreLaunch
      };
    }

    return {
      ...base
    };
  }

  private calculateFreq(ap: string): string {
    if (ap === 'HIGH') return 'Every 2 hours';
    if (ap === 'MEDIUM') return 'Every 4 hours';
    return 'Every 8 hours';
  }
}