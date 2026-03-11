const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function fetchPFMEA(riskStateId: string) {
  const res = await fetch(`${BASE}/pfmea/${riskStateId}`);
  if (!res.ok) throw new Error('PFMEA not found');
  return res.json();
}

export async function fetchCP(riskStateId: string, phase?: string) {
  const url = phase ? `${BASE}/control-plan/${riskStateId}/${phase}` : `${BASE}/control-plan/${riskStateId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Control plan not found');
  return res.json();
}

export async function fetchFlow(familyId: string) {
  const res = await fetch(`${BASE}/process-flow/${familyId}`);
  if (!res.ok) throw new Error('Flow not found');
  return res.json();
}