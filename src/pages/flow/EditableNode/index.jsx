import React, { useState } from 'react'
import { Handle, Position } from '@xyflow/react'

import './index.scss'

// 自定义可双击编辑的节点组件
export default function EditableNode(props) {
  const { title, desc, width } = props.data

  return (
    <div className="editable-node">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="node-label" style={{ width }}>
        <EditableText {...props} value={title} type="title" />
      </div>
      {desc && (
        <div className="node-desc" style={{ width }}>
          <EditableText {...props} value={desc} type="desc" />
        </div>
      )}
    </div>
  )
}

export function EditableText(props) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(props.value)

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    const { changeNode, data, id, type } = props
    changeNode({ ...data, [type]: text, id })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <>
      {isEditing ? (
        <input
          // type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className="node-textarea"
        />
      ) : (
        <>
          <div className="node-text" onDoubleClick={handleDoubleClick}>
            {text}
          </div>
        </>
      )}
    </>
  )
}
