import { useState, Suspense } from 'react'
import './index.scss'

// import Editor from '@/pages/Editor/index.jsx'
import Flow from '@/pages/Flow/index.jsx'
import PPT from '@/pages/Ppt/index.jsx'
import Html from '@/pages/Html/index.jsx'
import Dashboard from '@/pages/Dashboard/index.jsx'
import {
  markdownDefaultValue,
  pptDefaultValue,
  flowDefaultValue,
  reportDefaultValue,
} from '@/utils/defaultValue'
import SvgIcon from '@/components/SvgIcon'

export default function Home() {
  const [flowValue, setFlowValue] = useState(flowDefaultValue)
  const [pptValue, setPptValue] = useState(pptDefaultValue)
  const [dashboardValue, setDashboardValue] = useState(reportDefaultValue)
  const [htmlValue, setHtmlValue] = useState(markdownDefaultValue)
  const [active, setActive] = useState('flow')
  const renderTypes = [
    {
      type: 'flow',
      name: 'FLOW',
      render: () => <Flow value={flowValue} setValue={setFlowValue} />,
    },
    {
      type: 'ppt',
      name: 'PPT',
      render: () => {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <PPT value={pptValue} setValue={setPptValue} />
          </Suspense>
        )
      },
    },
    {
      type: 'dashboard',
      name: 'Dashboard',
      render: () => {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard value={dashboardValue} setValue={setDashboardValue} />
          </Suspense>
        )
      },
    },
    {
      type: 'html',
      name: 'HTML',
      render: () => {
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Html value={htmlValue} setValue={setHtmlValue} />
          </Suspense>
        )
      },
    },
  ]
  const curRenderer = renderTypes.find((item) => item.type === active).render

  return (
    <div className="home">
      <header className="header">
        <span className="title">Markdown&nbsp;&nbsp;-&gt;</span>
        {renderTypes.map((item) => {
          return (
            <span
              className={`tag ${active === item.type && 'tag-active'}`}
              onClick={() => setActive(item.type)}
              key={item.type}
            >
              {item.name}
            </span>
          )
        })}
        <span className="home-link">
          <a href="https://github.com/ufresh2013/Mars" target="_blank">
            <SvgIcon name="github" size="26" />
          </a>
        </span>
      </header>
      <div className="content">{curRenderer()}</div>
    </div>
  )
}
