import { Injectable } from '@nestjs/common';
import { PFMEAStore } from './pfmea.store';
import { APLevel } from '../types/ap';

@Injectable()
export class ProcessRiskProjection {

  constructor(private pfmeaStore: PFMEAStore) {}

  getWorstAPForProcess(processStep: string): APLevel {

    const risks = this.pfmeaStore.list()
      .filter(r => r.processStep === processStep);

    if (!risks.length) return 'LOW';

    if (risks.some(r => r.apLevel === 'HIGH')) return 'HIGH';
    if (risks.some(r => r.apLevel === 'MEDIUM')) return 'MEDIUM';

    return 'LOW';
  }
}