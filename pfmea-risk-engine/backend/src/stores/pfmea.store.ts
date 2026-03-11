import { Injectable } from '@nestjs/common';
import { PFMEATableRow } from '../types/pfmea';

@Injectable()
export class PFMEAStore {
  private rows = new Map<string, PFMEATableRow>();

  constructor() {
    const now = new Date().toISOString();

    // Mevcut demo satır (RS-001)
    this.rows.set('RS-001', {
      riskStateId: 'RS-001',
      processStep: 'Injection → Filling',
      failureMode: 'Short Shot (Eksik Dolum)',
      failureEffect: 'Assembly failure / scrap',
      failureCause: 'Low injection pressure',
      preventionControls: ['Closed-loop pressure control'],
      detectionControls: ['Vision inspector'],
      severity: 8,
      occurrence: 5,
      detection: 4,
      apLevel: 'HIGH',
      status: 'ACTIVE',
      specialCharacteristic: 'SC',
      lastUpdated: now,
    });

    // 🔶 YENİ SENARYO A satırı (RS-002): Nozzle clog / material flow restriction
    this.rows.set('RS-002', {
      riskStateId: 'RS-002',
      processStep: 'Injection → Filling',
      failureMode: 'Short Shot (Eksik Dolum)',
      failureEffect: 'Assembly failure / customer rejection',
      failureCause: 'Nozzle clog / material flow restriction',
      preventionControls: ['Preventive mold-cleaning schedule'],
      detectionControls: ['Cavity pressure sensor monitoring'],
      severity: 8,
      occurrence: 4, // başlangıçta biraz daha yüksek tuttuk (örnek)
      detection: 6,
      apLevel: 'MEDIUM',
      status: 'ACTIVE',
      specialCharacteristic: 'SC',
      lastUpdated: now,
    });
    this.rows.set('RS-003', {
      riskStateId: 'RS-003',
      processStep: 'Injection → Filling',
      failureMode: 'Short Shot (Eksik Dolum)',
      failureEffect: 'Assembly failure',
      failureCause: 'Low melt temperature',
      preventionControls: ['Barrel heater closed-loop control'],
      detectionControls: ['Melt temp SPC'],
      severity: 8,
      occurrence: 6,
      detection: 6,
      apLevel: 'HIGH',
      status: 'ACTIVE',
      specialCharacteristic: 'SC',
      lastUpdated: new Date().toISOString(),
    });
  }

  getById(riskStateId: string): PFMEATableRow | undefined {
    return this.rows.get(riskStateId);
  }

  list(): PFMEATableRow[] {
    return [...this.rows.values()];
  }
}