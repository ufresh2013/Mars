import { Scatter } from '@antv/g2plot'

export function point(el, commonOption, chartData) {
  // 没有size自动补全
  commonOption.data = commonOption.data.map((v) => ({
    ...v,
    size: v.size || 4,
  }))
  const options = {
    ...commonOption,
    appendPadding: [0, 0, 4, 0],
    xField: 'x',
    yField: 'y',
    colorField: 'yGroup',
    size: [4, 9],
    sizeField: 'size',
    shape: 'circle',
    isGroup: true,
  }

  // 气泡图显示label
  if (
    chartData.labelList ||
    chartData.groupList ||
    chartData.xValuesList[0].name
  ) {
    options.tooltip = {
      fields: ['label', 'yGroup', 'x', 'y', 'size'],
      customItems: (originalItems) => {
        const obj = {
          x: chartData.xValuesList[0].name,
          y: chartData.yValuesList[0].name,
          label: chartData.labelList ? chartData.labelList[0].name : '',
          yGroup: chartData.groupList ? chartData.groupList[0].name : '',
          size: chartData.sizeList ? chartData.sizeList[0].name : '',
        }
        return originalItems
          .map((v) => {
            return obj[v.name]
              ? {
                  ...v,
                  name: obj[v.name],
                }
              : null
          })
          .filter((v) => v)
      },
    }
  }

  // >20个不显示label
  if (commonOption.data.length <= 20) {
    options.label = {
      formatter: (item) => {
        return item.label
      },
      offsetY: 2,
      style: {
        fontSize: 8,
      },
    }
  }

  // 四象限
  if (chartData?.region) {
    options.quadrant = {
      xBaseline: chartData?.region.xBaseline,
      yBaseline: chartData?.region.yBaseline,
      lineStyle: {
        lineDash: [4, 2],
        lineWidth: 1,
      },
      labels: chartData.region.names.map((v) => ({
        content: v,
        style: {
          fontSize: 10,
        },
      })),
    }
    options.xAxis.grid = null
    options.yAxis.grid = null
  }

  // 设置x轴，y轴最小值
  const xs = commonOption.data.map((v) => v.x)
  if (typeof xs[0] === 'number') {
    const minX = Math.min(0, ...xs)
    options.xAxis = {
      ...commonOption.xAxis,
      min: minX,
    }
  }
  const minY = Math.min(0, ...commonOption.data.map((v) => v.y))
  options.yAxis = {
    ...commonOption.yAxis,
    min: minY,
  }

  return new Scatter(el, options)
}
