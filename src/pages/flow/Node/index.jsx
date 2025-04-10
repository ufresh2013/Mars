import { Handle, Position } from '@xyflow/react'
import Text from './Text.jsx'
import './index.scss'

// 自定义可双击编辑的节点组件
export default function EditableNode(props) {
  const { title, desc, width } = props.data

  return (
    <div className="editable-node">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="node-label" style={{ width }}>
        <Text {...props} value={title} type="title" />
      </div>
      {desc && (
        <div className="node-desc" style={{ width }}>
          <Text {...props} value={desc} type="desc" />
        </div>
      )}
    </div>
  )
}
