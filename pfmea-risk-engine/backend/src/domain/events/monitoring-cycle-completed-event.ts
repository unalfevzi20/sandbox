export class MonitoringCycleCompletedEvent {

  constructor(
    public readonly riskStateId: string,
    public readonly result: 'PASS' | 'FAIL',
    public readonly timestamp: Date
  ) {}
}