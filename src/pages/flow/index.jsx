

import { mark2flow } from '@/utils/transform/flow';
import React, { useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';

const LayoutFlow = ({ value }) => {
  const { fitView } = useReactFlow();
  const { nodes: initialNodes, edges: initialEdges } = mark2flow(value);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateFlow = (direction) => {
    const { nodes, edges } = mark2flow(value, direction)
    setNodes(nodes)
    setEdges(edges)
    fitView()
  }

  useEffect(() => {
    updateFlow()
  }, [value])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel position="top-right">
        <button onClick={() => updateFlow('TB')}>vertical layout</button>
        <button onClick={() => updateFlow('LR')}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

export default function ({ value }) {
  return (
    <ReactFlowProvider>
      <LayoutFlow value={value} />
    </ReactFlowProvider>
  );
}