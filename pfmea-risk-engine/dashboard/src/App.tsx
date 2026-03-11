import React, { useEffect, useState } from 'react';
import { fetchPFMEA, fetchCP, fetchFlow } from './api';
import PFMEASandbox from './components/PFMEASandbox';
import ControlPlanView from './components/ControlPlanView';
import ProcessFlowVisualizer from './components/ProcessFlowVisualizer';

export default function App() {
  const [pfmea, setPfmea] = useState<any>(null);
  const [cp, setCp] = useState<any>(null);
  const [flow, setFlow] = useState<any[]>([]);
  const riskStateId = 'RS-001';
  const familyId = 'FAMILY-THERMOPLASTIC';

  useEffect(() => {
    fetchPFMEA(riskStateId).then(setPfmea).catch(console.error);
    fetchCP(riskStateId, 'PRODUCTION').then(setCp).catch(console.error);
    fetchFlow(familyId).then(setFlow).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>PFMEA Risk Engine Dashboard</h1>
      <div className="grid">
        <div className="card">
          <div className="title">PFMEA</div>
          {!pfmea ? <div>Yükleniyor…</div> : (
            <div>
              <div><b>Step:</b> {pfmea.processStep}</div>
              <div><b>Mode:</b> {pfmea.failureMode}</div>
              <div><b>Effect:</b> {pfmea.failureEffect}</div>
              <div><b>Cause:</b> {pfmea.failureCause}</div>
              <div><b>S/O/D/AP:</b> {pfmea.severity}/{pfmea.occurrence}/{pfmea.detection} ({pfmea.apLevel})</div>
              <div><b>Controls:</b> Prev: {pfmea.preventionControls?.join(', ')} | Det: {pfmea.detectionControls?.join(', ')}</div>
              <div><b>SC:</b> {pfmea.specialCharacteristic || '-'}</div>
            </div>
          )}
        </div>

        <div className="card">
          <div className="title">Control Plan (Production)</div>
          {!cp ? <div>Yükleniyor…</div> : (
            <ControlPlanView row={cp}/>
          )}
        </div>

        <div className="card">
          <div className="title">PFMEA Sandbox (Demo)</div>
          {!pfmea ? <div>Yükleniyor…</div> : <PFMEASandbox base={pfmea} onPredict={() => {}}/>}
        </div>

        <div className="card">
          <div className="title">Process Flow</div>
          {!flow?.length ? <div>Yükleniyor…</div> : <ProcessFlowVisualizer nodes={flow}/>}
        </div>
      </div>
      <p style={{marginTop:16}}>API: <a href="http://localhost:3000/health" target="_blank">http://localhost:3000/health</a></p>
    </div>
  );
}