import { Controller, Get, Param } from '@nestjs/common';
import { ProcessFlowStore } from '../stores/process-flow.store';

@Controller('process-flow')
export class ProcessFlowController {
  constructor(private readonly store: ProcessFlowStore) {}

  @Get(':familyId')
  getFlow(@Param('familyId') familyId: string) {
    return this.store.getByFamily(familyId);
  }
}