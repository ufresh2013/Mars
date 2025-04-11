import 'bytemd/dist/index.css'
import './index.scss'
import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/react'

const plugins = [
  gfm(),
  // Add more plugins here
]

export default function App({ value, setValue }) {
  return (
    <>
      <div className="editor-header">
        <span class="panel">
          💻
          {/* <SvgIcon name="code" size="20" /> */}
          &nbsp;&nbsp;Code
        </span>
        <span>📚 Docs</span>
      </div>
      <Editor
        value={value}
        plugins={plugins}
        previewDebounce={300}
        onChange={(v) => setValue(v)}
      />
    </>
  )
}
