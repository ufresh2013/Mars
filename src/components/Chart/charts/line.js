import { Line } from '@antv/g2plot'
import { getLinePointStyle } from '../chart.config'

// 折线图
export function line(el, commonOption, chartData) {
  return new Line(el, {
    ...commonOption,
    xField: 'x',
    yField: 'y',
    seriesField: 'yGroup',
    point: getLinePointStyle(chartData.yValuesList[0].values.length),
  })
}
