import { Injectable } from '@nestjs/common';
import { MonitoringCycleCompletedEvent } from '../events/monitoring-cycle-completed-event';
import { PFMEAStore } from '../../stores/pfmea.store';
import { EventBusService } from '../event-bus-service';

@Injectable()
export class OccurrencePredictionSaga {

  constructor(
    private eventBus: EventBusService,
    private pfmeaStore: PFMEAStore
  ) {
    this.eventBus.ofEvent(MonitoringCycleCompletedEvent)
      .subscribe(event => this.handle(event));
  }

  handle(event: MonitoringCycleCompletedEvent) {

    const risk = this.pfmeaStore.getById(event.riskStateId);
    if (!risk) return;

    if (event.result === 'PASS') {
      risk.occurrence = Math.max(1, risk.occurrence - 1);
    }

    if (event.result === 'FAIL') {
      risk.occurrence = Math.min(10, risk.occurrence + 1);
    }

    if (risk.occurrence <= 4) risk.apLevel = 'MEDIUM';
    if (risk.occurrence > 5) risk.apLevel = 'HIGH';
  }
}