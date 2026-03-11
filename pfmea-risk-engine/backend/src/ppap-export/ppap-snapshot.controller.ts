import { Controller, Get, Param, Res } from '@nestjs/common';
import { PPAPSnapshotService } from './ppap-snapshot.service';
import { ExcelExportService } from './excel-export-service';
import { Response } from 'express';
import { FlowPDFService } from './flow-pdf-service';

@Controller('ppap-snapshots')
export class PPAPSnapshotController {

  constructor(
  private readonly service: PPAPSnapshotService,
  private readonly excelService: ExcelExportService,
  private readonly pdfService: FlowPDFService
) {}

  @Get('trigger/:riskStateId')
  trigger(@Param('riskStateId') id: string) {
    return this.service.triggerSnapshot(id);
  }

  @Get('pfmea/:riskStateId')
  async downloadPFMEA(
    @Param('riskStateId') id: string,
    @Res() res: Response
  ) {

    const buffer = await this.excelService.generatePFMEAExcel(id);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=PFMEA.xlsx'
    );

    res.send(buffer);
  }
  @Get('control-plan/:riskStateId')
async downloadCP(
  @Param('riskStateId') id: string,
  @Res() res: Response
) {

  const buffer = await this.excelService.generateControlPlanExcel(id);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=ControlPlan.xlsx'
  );

  res.send(buffer);
}
@Get('flow/:riskStateId')
async downloadFlow(
  @Param('riskStateId') id: string,
  @Res() res: Response
) {

  const buffer = await this.pdfService.generateFlowPDF();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=ProcessFlow.pdf');

  res.send(buffer);
}
}