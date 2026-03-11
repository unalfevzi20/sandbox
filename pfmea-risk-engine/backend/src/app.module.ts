import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PFMEAController } from './controllers/pfmea.controller';
import { ControlPlanController } from './controllers/control-plan.controller';
import { ProcessFlowController } from './controllers/process-flow.controller';
import { MonitoringController } from './controllers/monitoring-controller';
import { DomainModule } from './domain/domain-module';
import { PPAPExportModule } from './ppap-export/ppap-export.module';

@Module({
  imports: [
    DomainModule,        // ✅ BU EKSİKTİ
    PPAPExportModule
  ],
  controllers: [
    HealthController,
    ProcessFlowController,
    MonitoringController
  ]
})
export class AppModule {}