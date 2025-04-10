import React, { useEffect, useState } from 'react'
import { useChangeNode } from '@/pages/Flow/context.js'

export default function EditableText(props) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(props.value)
  const changeNode = useChangeNode() // 获取 changeNode 函数，用于更新节点的文本内容

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    const { data, id, type } = props
    changeNode({ ...data, [type]: text, id })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  useEffect(() => {
    setText(props.value)
  }, [props.value]) // 当 props.value 发生变化时更新 text 的值，避免在编辑状态下输入框中的值与节点的文本内容不同步的问题

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
