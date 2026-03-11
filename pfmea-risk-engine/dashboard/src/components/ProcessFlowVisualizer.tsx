import React from 'react';

export default function ProcessFlowVisualizer({ nodes }: { nodes: any[] }) {
  const byParent: Record<string, any[]> = {};
  nodes.forEach(n => {
    const p = n.parentStepId || 'ROOT';
    byParent[p] = byParent[p] || [];
    byParent[p].push(n);
  });

  function renderTree(parent: string|null) {
    const children = byParent[parent || 'ROOT'] || [];
    return (
      <ul>
        {children.map(c => (
          <li key={c.stepId}>
            <span style={{color: c.activeAPLevel === 'HIGH' ? '#fca5a5' : c.activeAPLevel === 'MEDIUM' ? '#fdba74' : '#a7f3d0'}}>
              {c.stepName} {c.isBranch ? ' (branch)' : ''} {c.activeAPLevel ? ` [AP: ${c.activeAPLevel}]` : ''}
            </span>
            {renderTree(c.stepId)}
          </li>
        ))}
      </ul>
    );
  }

  return <div>{renderTree(null)}</div>;
}