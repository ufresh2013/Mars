import { bar } from './bar'
import { doughnut } from './doughnut'
import { line } from './line'
import { pie } from './pie'
import { point } from './point'
import { rowBar } from './rowBar'
import { CHART_COMMON_OPTION, getRenderData } from '../chart.config'

export function getAntvChartInstance(el, chartType, chartData) {
  const renderData = getRenderData(chartData)
  const commonOption = {
    data: renderData,
    ...CHART_COMMON_OPTION(chartType, chartData, renderData),
  }

  if (chartType === 'bar') {
    return bar(el, commonOption, chartData)
  } else if (chartType === 'rowBar') {
    // 条形图
    return rowBar(el, commonOption)
  } else if (chartType === 'line') {
    // 折线图
    return line(el, commonOption, chartData)
  } else if (chartType === 'pie') {
    // 饼图
    return pie(el, commonOption)
  } else if (chartType === 'doughnut') {
    // 环形图
    return doughnut(el, commonOption)
  } else if (chartType === 'point') {
    // 散点图
    return point(el, commonOption, chartData)
  }
}
