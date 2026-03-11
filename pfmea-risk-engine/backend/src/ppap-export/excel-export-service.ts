import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { PFMEAStore } from '../stores/pfmea.store';
import { ControlPlanStore } from '../stores/control-plan.store';

@Injectable()
export class ExcelExportService {

  constructor(
    private pfmeaStore: PFMEAStore,
    private cpStore: ControlPlanStore
  ) {}

  async generatePFMEAExcel(riskStateId: string): Promise<Buffer> {

    const pfmea = this.pfmeaStore.getById(riskStateId);
    if (!pfmea) return null;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('PFMEA');

    sheet.addRow([
      'Process Step',
      'Failure Mode',
      'Effect',
      'Cause',
      'S',
      'O',
      'D',
      'AP'
    ]);

    sheet.addRow([
      pfmea.processStep,
      pfmea.failureMode,
      pfmea.failureEffect,
      pfmea.failureCause,
      pfmea.severity,
      pfmea.occurrence,
      pfmea.detection,
      pfmea.apLevel
    ]);

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async generateControlPlanExcel(riskStateId: string): Promise<Buffer> {

    const cp = this.cpStore.getProduction(riskStateId);
    if (!cp) return null;

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Control Plan');

    sheet.addRow([
      'Process Step',
      'Characteristic',
      'Monitoring Method',
      'Inspection Method',
      'Reaction Plan',
      'S',
      'O',
      'D',
      'AP',
      'Frequency'
    ]);

    sheet.addRow([
      cp.processStep,
      cp.processCharacteristic,
      cp.monitoringMethod,
      cp.inspectionMethod,
      cp.reactionPlan,
      cp.severity,
      cp.occurrence,
      cp.detection,
      cp.apLevel,
      cp.frequencyProduction
    ]);

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}