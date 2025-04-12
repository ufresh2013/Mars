// 图表主题配色
export const MAX_COLUMN_WIDTH = 50
export const DEFAULT_COLOR = '#387EDB'
export const COLORS_10 = [
  '#387EDB',
  '#1FBB7D',
  '#F8CE59',
  '#EB6C6A',
  '#AC82C8',
  '#1AB6C1',
  '#7E80D0',
  '#D27590',
  '#F3A760',
  '#76C36F',
]
const COLORS_20 = [...COLORS_10, ...COLORS_10]
const NORMAL_THEME = {
  defaultColor: DEFAULT_COLOR,
  colors10: COLORS_10,
  colors20: COLORS_20,
}

export function getColors10() {
  return COLORS_10
}

export function getColors() {
  return NORMAL_THEME
}

// 字体
export const AXIS_LABEL_FONT_COLOR = 'rgb(131, 131, 131)'
export const AXIS_LABEL_FONT_SIZE_L = 12
export const AXIS_LABEL_FONT_SIZE_M = 11
export const AXIS_LABEL_FONT_SIZE_S = 10

// 坐标轴字
export function axisFormatter(text) {
  return text.trim().length > 10 ? `${text.trim().slice(0, 6)}..` : text.trim()
}

// X轴配置
export function COMMON_X_AXIS(chartType = 'bar') {
  return {
    label: {
      style: {
        fill: AXIS_LABEL_FONT_COLOR,
        fontSize:
          chartType && chartType === 'rowBar'
            ? AXIS_LABEL_FONT_SIZE_S
            : AXIS_LABEL_FONT_SIZE_L,
      },
      formatter: axisFormatter,
    },
  }
}

// Y轴配置
export function COMMON_Y_AXIS(chartType = 'bar', yValuesItem) {
  const fontColor = AXIS_LABEL_FONT_COLOR
  const res = {
    label: {
      style: {
        fill: fontColor,
        fontSize:
          chartType && chartType === 'rowBar'
            ? AXIS_LABEL_FONT_SIZE_L
            : AXIS_LABEL_FONT_SIZE_S,
      },
      formatter: axisFormatter,
    },
  }
  // 是否显示y轴标题，设置y轴颜色，y轴位置只是否在右侧
  if (yValuesItem) {
    const { showAxisName, name } = yValuesItem
    if (showAxisName) {
      res.title = {
        text: name,
        position: 'end',
        autoRotate: false,
        rotation: -Math.PI / 2,
        offset: -18,
        style: {
          fontSize: AXIS_LABEL_FONT_SIZE_S,
          fill: fontColor,
        },
      }
    }
  }
  return res
}

// 百分比值
function getPercentVal(val, isPercent = true) {
  return isPercent ? (val * 100).toFixed(2) + '%' : val
}

export function getTooltip(renderData, isPercent = false) {
  return {
    fields: ['x', 'y', 'yGroup'],
    showTitle:
      !!renderData[0]?.yGroup && renderData[0].x !== renderData[0].yGroup,
    formatter: (data) => {
      if (data.yGroup && data.yGroup !== data.x) {
        return {
          title: data.x,
          name: data.yGroup,
          value: getPercentVal(data.y, isPercent),
        }
      }
      return { name: data.x, value: getPercentVal(data.y, isPercent) }
    },
  }
}

// 图表通用配置
export function CHART_COMMON_OPTION(chartType, chartData, renderData) {
  const isPercent = chartData.format === '%' // 是否显示百分比
  const isMultiGroup = chartData.yValuesList.length > 1 || !!chartData.groupList // 是否多系列
  const legend = isMultiGroup ? CHART_LEGEND : false
  const xIsNumber = chartData.xValuesList[0].values.every(
    (v) => typeof v === 'number' || !v
  )

  return {
    autoFit: true,
    animation: false,
    theme: { ...NORMAL_THEME, ...getColors(chartData) },
    autoRotate: true,
    autoHide: true,
    renderer: 'svg',
    appendPadding: [0, 0, 2, 0],
    legend,
    meta: {
      y: {
        formatter: (v) => getPercentVal(v, isPercent),
      },
      x: {
        type: xIsNumber ? 'linear' : 'cat',
      },
    },
    xAxis: COMMON_X_AXIS(chartType),
    yAxis: COMMON_Y_AXIS(chartType),
    tooltip: getTooltip(renderData, isPercent),
  }
}

// 图例
export const CHART_LEGEND = {
  position: 'bottom',
  itemName: {
    style: {
      fontSize: AXIS_LABEL_FONT_SIZE_M,
      fill: AXIS_LABEL_FONT_COLOR,
    },
  },
  offsetY: 5,
  itemSpacing: 3,
  itemMarginBottom: 0,
  itemHeight: 10,
  maxItemWidth: 100,
  animate: false,
  marker: {
    spacing: 2,
  },
  radio: { style: { r: 0 } },
  pageNavigator: {
    marker: {
      style: {
        size: 6,
      },
    },
    text: {
      style: {
        fontSize: AXIS_LABEL_FONT_SIZE_M,
        fill: AXIS_LABEL_FONT_COLOR,
      },
    },
  },
}

export function getPercentage(val, sum) {
  // >=5% 取整
  // <5%  原值保留2位小数
  const percentage = (val / sum) * 100
  return percentage.toFixed(2) + '%'
}

// 图表渲染数据
export function getRenderData(chartData) {
  let renderData = []
  const defaultChartType = chartData.chartType // 默认图表类型
  const xGroup =
    chartData.xValuesList.length > 1 ? chartData.xValuesList[0].values : null // 是否是两维度一度量图表
  const xAxis = chartData.xValuesList[xGroup ? 1 : 0] // x轴可能有多个
  const xAxisValues = xAxis.values || []
  const yAxisArray = chartData.yValuesList // y轴可能有多个

  // 处理renderData
  // 其他
  xAxisValues.forEach((b, j) => {
    yAxisArray.forEach((a, i) => {
      const item = {
        // BugFix: x, yGroup里的值开头是数字，颜色不对，多系列图例显示NaN
        // BugFix: 直方图x是数字，但是不能转为字符串
        x:
          (!isNaN(parseFloat(b.toString())) && yAxisArray.length > 1) ||
          (typeof b === 'string' && parseFloat(b.toString()))
            ? ` ${b}`
            : b,
        y: a.values[j],
        yGroup: !isNaN(parseFloat(a.name)) ? ` ${a.name}` : a.name,
      }

      if (a.yAxisPosition === 'right') {
        item.y2 = a.values[j]
      }

      // 数据点颜色
      if (chartData.colorList) {
        const values = chartData.colorList[i].values
        item.color = Array.isArray(values) ? values[j] : values
      }

      // 两维度一度量图表
      if (xGroup) {
        item.xGroup = xGroup[j]
        item.xId = `${b}@@@${xGroup[j]}`
      }

      if (item.x === null && item.y === null) return
      renderData.push(item)
    })
  })

  // 推荐的图表类型是条形图，转置一下顺序
  if (defaultChartType === 'rowBar' && !xGroup) {
    renderData.reverse()
  }

  // 确保图例顺序正确
  const yAxisLabel = yAxisArray.map((v) => v.name.trim())
  renderData.sort((a, b) => {
    return (
      yAxisLabel.indexOf(a.yGroup.toString().trim()) -
      yAxisLabel.indexOf(b.yGroup.toString().trim())
    )
  })
  return renderData
}

// 折线图数据点样式
export function getLinePointStyle(len) {
  return {
    size: len > 10 ? 0.1 : 2.5,
    style: {
      lineWidth: 0,
    },
  }
}
