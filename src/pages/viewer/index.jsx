import React, { useState } from 'react'
import { markdownDefaultValue } from '@/utils/defaultValue'
import { Viewer } from '@bytemd/react'
import Editor from '@/components/Editor/index.jsx'

export default function View() {
  const [value, setValue] = useState(markdownDefaultValue)

  return (
    <div className="container">
      <div className="container-editor">
        <Editor value={value} setValue={setValue} />
      </div>
      <div className="container-renderer">
        <Viewer value={value} />
      </div>
    </div>
  )
}
