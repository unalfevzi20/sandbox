import { Injectable } from '@nestjs/common';

@Injectable()
export class SnapshotRepository {

  private history = new Map<string, number>();

  getNextVersion(riskStateId: string): number {
    const current = this.history.get(riskStateId) || 0;
    const next = current + 1;
    this.history.set(riskStateId, next);
    return next;
  }
}