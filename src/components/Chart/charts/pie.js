import { getPercentage } from '../chart.config'
import { Pie } from '@antv/g2plot'

// 饼图
export function pie(el, commonOption) {
  const sum = commonOption.data.reduce((a, b) => a + b.y, 0) || 1
  return new Pie(el, {
    ...commonOption,
    colorField: 'x',
    angleField: 'y',
    radius: 1,
    legend: false,
    appendPadding: [0, 0, 8, 0],
    label: {
      type: 'outer',
      content: (v) => {
        return `${v.x} ${getPercentage(v.y, sum)}`
      },
    },
    meta: {
      y: {
        formatter: (v) => getPercentage(v, sum),
      },
    },
    tooltip: {
      showTitle: false,
      formatter: (data) => {
        return {
          name: data.x,
          value: getPercentage(data.y, sum),
        }
      },
    },
  })
}
