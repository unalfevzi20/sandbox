import { Injectable } from '@nestjs/common';
import { PFMEAStore } from '../stores/pfmea.store';
import { ControlPlanStore } from '../stores/control-plan.store';
import { ProcessFlowStore } from '../stores/process-flow.store';
import { SnapshotRepository } from './snapshot.repository';

@Injectable()
export class PPAPSnapshotService {

  constructor(
    private pfmeaStore: PFMEAStore,
    private cpStore: ControlPlanStore,
    private flowStore: ProcessFlowStore,
    private repo: SnapshotRepository
  ) {}

  triggerSnapshot(riskStateId: string) {

    const version = this.repo.getNextVersion(riskStateId);

    const pfmea = this.pfmeaStore.getById(riskStateId);
    const cp = this.cpStore.getProduction(riskStateId);
    const flow = this.flowStore.getByFamily('FAMILY-THERMOPLASTIC');

    return {
      snapshotId: Math.random().toString(36).substring(7),
      version,
      riskStateId,
      pfmea,
      cp,
      flow,
      createdAt: new Date()
    };
  }
}