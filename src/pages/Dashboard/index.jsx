import React from 'react'
import Editor from '@/components/Editor/index.jsx'
import Chart from '@/components/Chart/index.jsx'
import { mark2dashboard } from '@/utils/transform/dashboard'
import './index.scss'

export default function Report({ value, setValue }) {
  const { cards, charts } = mark2dashboard(value)

  return (
    <div className="container">
      <div className="container-editor">
        <Editor value={value} setValue={setValue} />
      </div>
      <div className="container-renderer dashboard">
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
        <div className="dashboard-charts">
          {charts.map((v, i) => {
            return (
              <div className="chart" key={v.title + i}>
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
