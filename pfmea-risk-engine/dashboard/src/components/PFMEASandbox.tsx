import React, { useState } from 'react';

export default function PFMEASandbox({ base, onPredict }: { base: any; onPredict: (res: any)=>void }) {
  const [o, setO] = useState<number>(base.occurrence);
  const [d, setD] = useState<number>(base.detection);

  function apCalc(s: number, o: number, d: number): 'HIGH'|'MEDIUM'|'LOW' {
    if (s >= 9) return 'HIGH';
    if (s >= 7 && o >= 4) return 'HIGH';
    if (s >= 7) return 'MEDIUM';
    if (o >= 6) return 'HIGH';
    if (o >= 4) return 'MEDIUM';
    return 'LOW';
    // (Basitleştirilmiş AIAG-VDA AP tablo yaklaşımı)
  }

  const ap = apCalc(base.severity, o, d);

  return (
    <div>
      <div>S: {base.severity} | O: <b>{o}</b> | D: <b>{d}</b> → AP: <b>{ap}</b></div>
      <div style={{marginTop:8}}>
        <label>Occurrence (O): </label>
        <input type="range" min={1} max={10} value={o} onChange={e => setO(Number(e.target.value))}/>
      </div>
      <div style={{marginTop:8}}>
        <label>Detection (D): </label>
        <input type="range" min={1} max={10} value={d} onChange={e => setD(Number(e.target.value))}/>
      </div>
    </div>
  );
}