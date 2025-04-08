import 'bytemd/dist/index.css'
import './index.scss'
import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/react'

const plugins = [
  gfm(),
  // Add more plugins here
]

export default function App({ value, setValue }) {
  return (
    <>
      <Editor
        value={value || ''}
        plugins={plugins}
        previewDebounce={300}
        onChange={(v) => {
          setValue(v)
        }}
      />
    </>
  )
}