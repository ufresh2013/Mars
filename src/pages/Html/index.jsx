import React from 'react'
import { Viewer } from '@bytemd/react'
import Editor from '@/components/Editor/index.jsx'
import gfm from '@bytemd/plugin-gfm'
import './index.scss'
import 'github-markdown-css'

const plugins = [
  gfm(),
  // Add more plugins here
]
export default function View({ value, setValue }) {
  return (
    <div className="container">
      <div className="container-editor">
        <Editor value={value} plugins={plugins} setValue={setValue} />
      </div>
      <div className="container-renderer">
        <div className="html">
          <Viewer value={value} plugins={plugins} />
        </div>
      </div>
    </div>
  )
}
