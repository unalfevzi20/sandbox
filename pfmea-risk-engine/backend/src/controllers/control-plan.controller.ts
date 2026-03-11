import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ControlPlanStore } from '../stores/control-plan.store';

@Controller('control-plan')
export class ControlPlanController {
  constructor(private readonly store: ControlPlanStore) {}

  @Get(':riskStateId')
  getProduction(@Param('riskStateId') id: string) {
    const row = this.store.getProduction(id);
    if (!row) throw new NotFoundException('Control Plan not found');
    return row;
  }

  @Get(':riskStateId/:phase')
  getByPhase(@Param('riskStateId') id: string, @Param('phase') phase: string) {
    const normalized = phase.toUpperCase();
    if (!['PROTOTYPE', 'PRE_LAUNCH', 'PRODUCTION'].includes(normalized)) {
      throw new NotFoundException('Invalid phase');
    }
    const row = this.store.getByPhase(id, normalized as any);
    if (!row) throw new NotFoundException('Control Plan not found');
    return row;
  }
}