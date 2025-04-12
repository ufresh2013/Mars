import { CHART_LEGEND, getPercentage } from '../chart.config'
import { Pie } from '@antv/g2plot'

export function doughnut(el, commonOption) {
  const sum = commonOption.data.reduce((a, b) => a + b.y, 0)
  return new Pie(el, {
    ...commonOption,
    colorField: 'x',
    angleField: 'y',
    radius: 1,
    innerRadius: 0.63,
    legend: CHART_LEGEND,
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
        fill: '#fff',
      },
      autoRotate: false,
      content: (v) => {
        return `${getPercentage(v.y, sum)}`
      },
    },
    meta: {
      y: {
        formatter: (v) => getPercentage(v, sum),
      },
    },
    statistic: {
      title: false,
      content: {
        content: '',
      },
    },
    tooltip: {
      ...commonOption.tooltip,
      showTitle: false,
      formatter: (v) => {
        return {
          name: v.x,
          value: getPercentage(v.y, sum),
        }
      },
    },
  })
}
