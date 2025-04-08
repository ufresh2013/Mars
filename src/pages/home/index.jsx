import { useState } from 'react'
import './index.scss'

import Editor from '@/pages/editor/index.jsx'
import Flow from '@/pages/flow/index.jsx'
import PPT from '@/pages/ppt/index.jsx'
import Viewer from '@/pages/viewer/index.jsx'
import { markdownDefaultValue, pptDefaultValue, flowDefaultValue } from '@/utils/defaultValue'


export default function Home() {
  const [value, setValue] = useState(flowDefaultValue)
  const [active, setActive] = useState('flow')
  const renderTypes = [
    {
      type: 'flow',
      name: '流程图',
      defaultValue: flowDefaultValue,
      render: () => <Flow value={value} />
    },
    {
      type: 'word',
      name: 'Word',
      defaultValue: markdownDefaultValue,
      render: () => <Viewer value={value}  />
    },
    {
      type: 'ppt',
      name: 'PPT',
      defaultValue: pptDefaultValue,
      render: () => <PPT value={value} />
    },
    // {
    //   type: 'report',
    //   name: '数据报告',
    //   render: () => <Report value={value} />
    // },
  ]


  const curRenderer = renderTypes.find((item) => item.type === active).render

  return (
    <div className="home">
      <header>
        <span className='title'>Markdown在线转</span>
        {renderTypes.map((item) => {
          return (
            <span
              className={`tag ${active === item.type && 'tag-active'}`}
              onClick={() => {
                setActive(item.type)
                setValue(item.defaultValue)
              }}
              key={item.type}
            >
              {item.name}
            </span>
          )
        })}
      </header>
      <div className="content">
        <div className="editor">
          <Editor value={value} setValue={setValue} />
        </div>
        <div className='renderer'>
          {curRenderer()}
        </div>
      </div>
    </div>
  )
}