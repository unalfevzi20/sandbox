import { Module } from '@nestjs/common';

import { PFMEAStore } from '../stores/pfmea.store';
import { ControlPlanStore } from '../stores/control-plan.store';
import { ProcessFlowStore } from '../stores/process-flow.store';
import { ProcessRiskProjection } from '../stores/process-risk-projection';
import { EventBusService } from './event-bus-service';
import { OccurrencePredictionSaga } from './sagas/occurrence-prediction-saga';
import { ControlPlanController } from '../controllers/control-plan.controller';
import { PFMEAController } from '../controllers/pfmea.controller';


@Module({
controllers: [
ControlPlanController,
PFMEAController
],
  providers: [
    PFMEAStore,
    ControlPlanStore,
    ProcessFlowStore,
    ProcessRiskProjection,
    EventBusService,
    OccurrencePredictionSaga
  ],
  exports: [
    PFMEAStore,
    ControlPlanStore,
    ProcessFlowStore,
    ProcessRiskProjection,
    EventBusService       // ✅ EN KRİTİK SATIR
    
  ]
})
export class DomainModule {}