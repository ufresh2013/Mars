import { mark2flow } from '@/utils/transform/flow'
import React, { useEffect, useState } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react'
import { ChangeNodeProvider } from '@/pages/Flow/context.js'
import ExportButton from '@/pages/Flow/Download/index.jsx'
import EditableNode from '@/pages/Flow/Node/index.jsx'
import Editor from '@/components/Editor/index.jsx'
import { updateMarkByNode } from '@/utils/transform/flow'
import { flowDefaultValue } from '@/utils/defaultValue'

import './index.scss'

const { nodes: initialNodes, edges: initialEdges } = mark2flow(
  flowDefaultValue,
  'TR'
)

const nodeTypes = {
  editableNode: EditableNode,
}
const FlowPage = () => {
  // 编辑器文本
  const [value, setValue] = useState(flowDefaultValue)
  const [direction, setDirection] = useState('TR')
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    const { nodes, edges } = mark2flow(value, direction)
    setNodes(nodes)
    setEdges(edges)
  }, [value, direction])

  function changeNode(node) {
    setValue(updateMarkByNode(node, value))
  }

  return (
    <div className="container">
      <div className="container-editor">
        <Editor value={value} setValue={setValue} />
      </div>
      <div className="container-renderer">
        <ChangeNodeProvider value={changeNode}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            maxZoom={1.3}
          >
            <Panel position="top-right">
              <button onClick={() => setDirection('TB')}>垂直布局</button>
              <button onClick={() => setDirection('LR')}>水平布局</button>
              <ExportButton />
            </Panel>
          </ReactFlow>
        </ChangeNodeProvider>
      </div>
    </div>
  )
}

export default function () {
  return (
    <ReactFlowProvider>
      <FlowPage />
    </ReactFlowProvider>
  )
}
