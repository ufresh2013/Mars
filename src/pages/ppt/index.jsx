import React, { useState } from 'react'

import { mark2ppt } from '@/utils/transform/ppt'
import Editor from '@/components/Editor/index.jsx'
import { pptDefaultValue } from '@/utils/defaultValue'
import './index.scss'

export default function Flow() {
  const [value, setValue] = useState(pptDefaultValue)
  const slides = mark2ppt(value)

  return (
    <div className="container">
      <div className="container-editor">
        <Editor value={value} setValue={setValue} />
      </div>
      <div className="container-renderer ppt">
        {slides.map((slide, i) => {
          return (
            <div
              key={i}
              className="slide"
              dangerouslySetInnerHTML={{ __html: slide }}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
