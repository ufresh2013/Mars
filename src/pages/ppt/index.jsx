import React, { useCallback, useMemo, useState } from 'react'
import {
  ReactFlow,
  useReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
} from '@xyflow/react'
import './index.scss'
import { mark2ppt, slidesToElements } from '@/utils/transform/ppt'
import Editor from '@/components/Editor/index.jsx'
import Slide from './slide'
import { pptDefaultValue } from '@/utils/defaultValue'

const nodeTypes = {
  slide: Slide,
}

function Flow() {
  const [value, setValue] = useState(pptDefaultValue)
  const { fitView } = useReactFlow()
  const slides = mark2ppt(value)
  const { start, nodes, edges } = useMemo(
    () => slidesToElements(slides),
    [slides]
  )

  const handleNodeClick = useCallback(
    (_, node) => {
      fitView({ nodes: [{ id: node.id }], duration: 150 })
    },
    [fitView]
  )

  return (
    <div className="container">
      <div className="container-editor">
        <Editor value={value} setValue={setValue} />
      </div>
      <div className="container-renderer">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          fitView
          fitViewOptions={{ nodes: [{ id: start }] }}
          minZoom={0.1}
          onNodeClick={handleNodeClick}
        >
          <Background color="#f2f2f2" variant={BackgroundVariant.Lines} />
        </ReactFlow>
      </div>
    </div>
  )
}

export default ({ value }) => (
  <ReactFlowProvider>
    <Flow value={value} />
  </ReactFlowProvider>
)
