import { useEffect, useRef } from 'react'
import { getAntvChartInstance } from './charts/index'

export default function AntvChart({ data, title }) {
  const chartEl = useRef(null)

  useEffect(() => {
    let chartInstance

    function setCommonChartData(chartType, chartData) {
      if (!chartEl.current) return
      if (!chartData?.xValuesList) return

      const el = chartEl.current

      // antv常规图表渲染
      chartInstance?.destroy()
      chartInstance = null
      chartInstance = getAntvChartInstance(el, chartType, chartData)
      chartInstance?.render()

      // 删除一些默认交互
      if (!chartInstance || !chartInstance.chart) return
      chartInstance.chart.removeInteraction('element-highlight-by-x')
      chartInstance.chart.removeInteraction('axis-label-highlight')
      chartInstance.chart.removeInteraction('element-highlight-by-color')
      chartInstance.chart.removeInteraction('element-active')
      if (chartType === 'mix') {
        chartInstance.chart.removeInteraction('legend-filter')
      }
    }

    function setChartData(chartType) {
      setCommonChartData(chartType, data)
    }

    if (!data || !chartEl.current) {
      return
    }
    setChartData(data.chartType)

    return () => {
      chartInstance?.destroy()
      chartInstance = null
    }
  }, [data])

  return (
    <div
      ref={chartEl}
      style={{ position: 'relative', aspectRatio: '16/9' }}
    ></div>
  )
}
