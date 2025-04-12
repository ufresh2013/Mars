import { Column } from '@antv/g2plot'
import {
  CHART_LEGEND,
  AXIS_LABEL_FONT_COLOR,
  AXIS_LABEL_FONT_SIZE_L,
  axisFormatter,
  MAX_COLUMN_WIDTH,
} from '../chart.config'

// 柱状图
export function bar(el, commonOption, chartData) {
  const xGroup =
    chartData.xValuesList.length > 1 ? chartData.xValuesList[0].values : null // 是否是两维度一度量图表
  const isYGroup = chartData.yValuesList.length > 1
  const isStack = !!chartData.isStack

  if (xGroup) {
    // 二维度一度量图表
    return new Column(el, {
      ...commonOption,
      xField: 'xId',
      yField: 'y',
      isStack,
      seriesField: 'xGroup',
      legend: CHART_LEGEND,
      maxColumnWidth: MAX_COLUMN_WIDTH,
      xAxis: {
        label: {
          style: {
            fill: AXIS_LABEL_FONT_COLOR,
            fontSize: AXIS_LABEL_FONT_SIZE_L,
          },
          formatter: (x) => {
            return axisFormatter(x.split('@@@')[0])
          },
        },
      },
      tooltip: {
        showTitle: true,
        formatter: (data) => {
          return {
            name: data.xGroup,
            value: data.y,
            title: data.xId.split('@@@')[0],
          }
        },
      },
    })
  } else if (isYGroup) {
    return new Column(el, {
      ...commonOption,
      xField: 'x',
      yField: 'y',
      isStack,
      seriesField: 'yGroup',
      isGroup: !isStack,
      maxColumnWidth: MAX_COLUMN_WIDTH,
    })
  } else {
    let options = {
      ...commonOption,
      xField: 'x',
      yField: 'y',
      isStack,
      seriesField: 'yGroup',
      maxColumnWidth: MAX_COLUMN_WIDTH,
    }
    if (chartData.colorList && Array.isArray(chartData.colorList[0].values)) {
      options = {
        ...options,
        seriesField: 'color',
        color: (data) => {
          return data.color
        },
      }
    }
    return new Column(el, options)
  }
}
