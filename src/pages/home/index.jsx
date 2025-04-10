import { useState } from 'react'
import './index.scss'

// import Editor from '@/pages/Editor/index.jsx'
import Flow from '@/pages/Flow/index.jsx'
import PPT from '@/pages/Ppt/index.jsx'
import Html from '@/pages/Html/index.jsx'
import Report from '@/pages/Report/index.jsx'
import {
  markdownDefaultValue,
  pptDefaultValue,
  flowDefaultValue,
  reportDefaultValue,
} from '@/utils/defaultValue'
import SvgIcon from '@/components/SvgIcon'

export default function Home() {
  const [value, setValue] = useState(flowDefaultValue)
  const [active, setActive] = useState('flow')
  const renderTypes = [
    {
      type: 'flow',
      name: 'FLOW',
      defaultValue: flowDefaultValue,
      render: () => <Flow value={value} />,
    },
    {
      type: 'ppt',
      name: 'PPT',
      defaultValue: pptDefaultValue,
      render: () => <PPT value={value} />,
    },
    {
      type: 'report',
      name: 'REPORT',
      defaultValue: reportDefaultValue,
      render: () => <Report value={value} />,
    },
    {
      type: 'HTML',
      name: 'HTML',
      defaultValue: markdownDefaultValue,
      render: () => <Html value={value} />,
    },
  ]
  const curRenderer = renderTypes.find((item) => item.type === active).render

  return (
    <div className="home">
      <header>
        <span className="title">Markdown&nbsp;&nbsp;-&gt;</span>
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
        <a>
          <SvgIcon name="github" size="20" />
        </a>
      </header>
      <div className="content">{curRenderer()}</div>
    </div>
  )
}
