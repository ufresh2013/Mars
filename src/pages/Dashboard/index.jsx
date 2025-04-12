import React, { useCallback, useMemo, useState } from 'react'
import { reportDefaultValue } from '@/utils/defaultValue'
import Editor from '@/components/Editor/index.jsx'
import Chart from '@/components/Chart/index.jsx'
import { mark2dashboard } from '@/utils/transform/dashboard'
import './index.scss'

export default function Report() {
  const [value, setValue] = useState(reportDefaultValue)

  if (!value) {
    return <div>No data</div>
  }

  const { cards, charts } = mark2dashboard(value)
  console.log(cards, charts)

  return (
    <div className="container">
      <div className="container-editor">
        <Editor value={value} setValue={setValue} />
      </div>
      <div className="container-renderer dashboard">
        {/* <h3 class="dashboard-title">Overview</h3> */}
        <div className="dashboard-cards">
          {cards.map((v, i) => {
            return (
              <div className="card" key={v.title + i}>
                <div className="card-title">{v.title}</div>
                <div className="card-value">{v.value}</div>
              </div>
            )
          })}
        </div>
        {/* <h3 class="dashboard-title">Charts</h3> */}
        <div className="dashboard-charts">
          {charts.map((v, i) => {
            return (
              <div className="chart">
                <div className="chart-title">{v.title}</div>
                <div className="chart-container">
                  <Chart data={v} key={v.title + i} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
