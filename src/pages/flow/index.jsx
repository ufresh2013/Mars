import { mark2flow } from '@/utils/transform/flow'
import React, { useEffect, useState } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import { ChangeNodeProvider } from '@/pages/Flow/context.js'
import Download from '@/pages/Flow/Download/index.jsx'
import EditableNode from '@/pages/Flow/Node/index.jsx'
import Editor from '@/components/Editor/index.jsx'
import SvgIcon from '@/components/SvgIcon'
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
const FlowPage = ({ value, setValue }) => {
  // 编辑器文本
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
            minZoom={0.5}
          >
            <Panel position="top-right">
              <button onClick={() => setDirection('TB')} title="垂直布局">
                <SvgIcon
                  name="vertical"
                  size="20"
                  style={{ transform: 'rotate(90deg)' }}
                />
              </button>
              <button onClick={() => setDirection('LR')} title="水平布局">
                <SvgIcon name="vertical" size="20" />
              </button>
              <Download>
                <SvgIcon name="download" size="20" />
              </Download>
            </Panel>
          </ReactFlow>
        </ChangeNodeProvider>
      </div>
    </div>
  )
}

export default function ({ value, setValue }) {
  return (
    <ReactFlowProvider>
      <FlowPage value={value} setValue={setValue} />
    </ReactFlowProvider>
  )
}
