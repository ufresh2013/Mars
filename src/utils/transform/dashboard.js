/**
 * 将包含图表数据的文本解析为 JSON 对象
 * @param {string} text - 包含图表数据的文本
 * @returns {Object} - 解析后的 JSON 对象
 */
export function mark2dashboard(text) {
  const blocks = text.split(/\{([^}]+)\}/).filter(Boolean)
  const result = {
    cards: [],
    charts: [],
  }

  for (let i = 0; i < blocks.length; i += 2) {
    const type = (blocks[i] ?? '').trim()
    const content = (blocks[i + 1] ?? '').trim()

    if (type === 'card') {
      result.cards = [...result.cards, ...parseCardContent(content)]
      continue
    } else {
      const chartData = parseChartContent(content)
      if (!chartData) {
        continue
      }
      result.charts.push({
        chartType: type,
        ...parseChartContent(content),
      })
      continue
    }
  }

  return result
}

/**
 * 解析卡片内容
 * @param {string} content - 卡片内容文本
 * @returns {Object} - 解析后的卡片数据对象
 */
function parseCardContent(content) {
  const lines = content.split('\n').filter((line) => line.trim() !== '')
  const cards = []

  for (let i = 0; i < lines.length; i += 2) {
    const title = lines[i].replace('# ', '').trim()
    const value = (lines[i + 1] ?? '').trim()
    cards.push({
      title,
      value,
    })
  }

  return cards
}

/**
 * 解析图表内容
 * @param {string} content - 图表内容文本
 * @returns {Object} - 解析后的图表数据对象
 */
function parseChartContent(content) {
  const lines = content.split('\n').filter((line) => line.trim())
  const chartData = {
    title: '',
    xValuesList: [],
    yValuesList: [],
  }

  // 第一行是标题
  chartData.title = (lines[0] ?? '').replace('# ', '').trim()
  let currentName = ''
  let currentType = ''

  lines.forEach((line) => {
    if (line.startsWith('-')) {
      const match = line.match(/-\s*(.*?)\[(.*?)\]/)
      if (match) {
        currentName = match[1]
        currentType = match[2]
      }
    } else {
      const values = line.split(' ').map((v) => {
        const num = parseFloat(v)
        return num.toString() === v ? num : v
      })
      if (currentType === 'x') {
        chartData.xValuesList.push({ name: currentName, values })
      } else if (currentType === 'y') {
        chartData.yValuesList.push({ name: currentName, values })
      }
    }
  })

  if (
    chartData.xValuesList.length === 0 ||
    chartData.yValuesList.length === 0
  ) {
    return null
  }

  return chartData
}
