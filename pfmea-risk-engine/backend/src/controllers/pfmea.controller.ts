import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { PFMEAStore } from '../stores/pfmea.store';

@Controller('pfmea')
export class PFMEAController {
  constructor(private readonly store: PFMEAStore) {}

  @Get(':riskStateId')
  getOne(@Param('riskStateId') id: string) {
    const row = this.store.getById(id);
    if (!row) throw new NotFoundException('PFMEA row not found');
    return row;
  }

  @Get()
  list() {
    return this.store.list();
  }
}