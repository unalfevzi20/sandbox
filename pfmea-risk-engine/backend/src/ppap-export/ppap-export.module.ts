import { Module } from '@nestjs/common';
import { PPAPSnapshotController } from './ppap-snapshot.controller';
import { PPAPSnapshotService } from './ppap-snapshot.service';
import { SnapshotRepository } from './snapshot.repository';
import { ExcelExportService } from './excel-export-service';
import { FlowPDFService } from './flow-pdf-service';
import { DomainModule } from '../domain/domain-module';

@Module({
  imports: [DomainModule],
  controllers: [PPAPSnapshotController],
  providers: [
    PPAPSnapshotService,
    SnapshotRepository,
    ExcelExportService,
    FlowPDFService
  ]
})
export class PPAPExportModule {}