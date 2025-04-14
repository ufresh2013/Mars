import React from 'react'
import { mark2ppt } from '@/utils/transform/ppt'
import Editor from '@/components/Editor/index.jsx'
// import Preview from '@/pages/Ppt/Preview/index.jsx'

import './index.scss'

export default function Ppt({ value, setValue }) {
  const slides = mark2ppt(value)

  return (
    <>
      <div className="container">
        <div className="container-editor">
          <Editor value={value} setValue={setValue} />
        </div>
        <div className="container-renderer ppt">
          {slides.map((html, i) => {
            return (
              <div
                key={i}
                className="slide"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            )
          })}
        </div>
      </div>
      {/* <Preview /> */}
    </>
  )
}
