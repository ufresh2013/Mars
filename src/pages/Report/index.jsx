import React, { useState } from 'react'
import { reportDefaultValue } from '@/utils/defaultValue'
import Editor from '@/components/Editor/index.jsx'

export default function Report() {
  const [value, setValue] = useState(reportDefaultValue)

  return (
    <div className="container">
      <div className="container-editor">
        <Editor value={value} setValue={setValue} />
      </div>
      <div className="container-renderer"></div>
    </div>
  )
}
