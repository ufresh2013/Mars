import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  useReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import './index.scss'
import { mark2ppt, slidesToElements } from '@/utils/transform/ppt';
import Slide from './slide';


function Flow({ value }) {
  const { fitView } = useReactFlow();
  const slides = mark2ppt(value);
  const { start, nodes, edges } = useMemo(() => slidesToElements(slides), [slides]);

  const handleNodeClick = useCallback(
    (_, node) => {
      fitView({ nodes: [{ id: node.id }], duration: 150 });
    },
    [fitView],
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={{
        slide: Slide
      }}
      edges={edges}
      fitView
      fitViewOptions={{ nodes: [{ id: start }] }}
      minZoom={0.1}
      onNodeClick={handleNodeClick}
    >
      <Background color="#f2f2f2" variant={BackgroundVariant.Lines} />
    </ReactFlow>
  );
}
 
export default ({ value }) => (
  <ReactFlowProvider>
    <Flow value={value} />
  </ReactFlowProvider>
);
