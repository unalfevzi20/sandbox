import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { ProcessFlowStore } from '../stores/process-flow.store';

@Injectable()
export class FlowPDFService {

  constructor(private flowStore: ProcessFlowStore) {}

  async generateFlowPDF(): Promise<Buffer> {

    const flow = this.flowStore.getByFamily('FAMILY-THERMOPLASTIC');

    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));

    doc.on('end', () => {});

    doc.fontSize(18).text('Process Flow Diagram', { align: 'center' });

    doc.moveDown();

    flow.forEach(step => {
      doc
        .fontSize(12)
        .text(`Step: ${step.stepName}`)
        .text(`Failure Causes: ${step.failureCauses.join(', ') || '-'}`)
        .text(`AP Level: ${step.activeAPLevel || '-'}`)
        .moveDown();
    });

    doc.end();

    return new Promise(resolve => {
      doc.on('end', () => {
        const pdf = Buffer.concat(buffers);
        resolve(pdf);
      });
    });
  }
}