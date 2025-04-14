import { marked } from 'marked'
export const SLIDE_WIDTH = 1280
export const SLIDE_HEIGHT = 800
export const SLIDE_PADDING = 20

export function mark2ppt(text) {
  if (!text) return []
  return text
    .split('----')
    .filter((v) => v.trim() !== '')
    .map((slide) => {
      slide = slide.trim()
      return slide2html(slide)
    })
}

export function slide2html(slide) {
  if (!slide) return []
  return splitTextByLayout(slide)
}

function splitTextByLayout(text) {
  const blocks = []
  const layoutRegex = /{layout:column}/g
  let match
  let lastIndex = 0

  while ((match = layoutRegex.exec(text)) !== null) {
    // 处理 {layout:column} 之前的内容
    if (match.index > lastIndex) {
      const preLayoutText = text.slice(lastIndex, match.index).trim()
      if (preLayoutText) {
        blocks.push(preLayoutText)
      }
    }

    // 查找下一个 {layout:column}
    const nextMatch = layoutRegex.exec(text)
    if (nextMatch) {
      const layoutBlock = text.slice(
        match.index,
        nextMatch.index + '{layout:column}'.length
      )
      blocks.push(layoutBlock)
      lastIndex = nextMatch.index + '{layout:column}'.length
    } else {
      // 如果没有下一个 {layout:column}，将当前到末尾的内容加入
      const layoutBlock = text.slice(match.index)
      blocks.push(layoutBlock)
      break
    }
  }

  // 处理最后一个 {layout:column} 之后的内容
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex).trim()
    if (remainingText) {
      blocks.push(remainingText)
    }
  }

  return blocks
    .map((block) => {
      if (block.startsWith('{layout:column}')) {
        let html = ''
        const items = block
          .replace(/\{layout:\s*column\}/g, '')
          .replace(/^\n+|\n+$/g, '')
          .split('{break}')
        html += items
          .map((v) => {
            return `<div class="column-child">${marked(v)}</div>`
          })
          .join('')
        html = `<div class="column-container column-container-${items.length}">${html}</div>`
        return html
      }
      return marked(block)
    })
    .join('')
}
