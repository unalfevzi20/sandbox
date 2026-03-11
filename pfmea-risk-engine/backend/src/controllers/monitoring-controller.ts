import { Controller, Post, Param } from '@nestjs/common';
import { EventBusService } from '../domain/event-bus-service';
import { MonitoringCycleCompletedEvent } from '../domain/events/monitoring-cycle-completed-event';

@Controller('monitoring')
export class MonitoringController {

  constructor(private eventBus: EventBusService) {}

  @Post(':riskStateId/pass')
  pass(@Param('riskStateId') id: string) {
    this.eventBus.publish(
      new MonitoringCycleCompletedEvent(id, 'PASS', new Date())
    );
  }

  @Post(':riskStateId/fail')
  fail(@Param('riskStateId') id: string) {
    this.eventBus.publish(
      new MonitoringCycleCompletedEvent(id, 'FAIL', new Date())
    );
  }
}