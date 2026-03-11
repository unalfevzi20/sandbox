import React from 'react';

export default function ControlPlanView({ row }: { row: any }) {
  return (
    <div>
      <div><b>Step:</b> {row.processStep}</div>
      <div><b>Characteristic:</b> {row.processCharacteristic}</div>
      <div><b>Monitoring:</b> {row.monitoringMethod}</div>
      <div><b>Inspection:</b> {row.inspectionMethod}</div>
      <div><b>Reaction:</b> {row.reactionPlan}</div>
      <div><b>S/O/D/AP:</b> {row.severity}/{row.occurrence}/{row.detection} ({row.apLevel})</div>
      <div style={{marginTop:8}}>
        <b>Frequencies</b>
        <ul>
          <li>Prototype: {row.frequencyPrototype}</li>
          <li>Pre-Launch: {row.frequencyPreLaunch}</li>
          <li>Production: {row.frequencyProduction}</li>
        </ul>
      </div>
    </div>
  );
}