import { marked } from 'marked'
export const SLIDE_WIDTH = 1280
export const SLIDE_HEIGHT = 800
export const SLIDE_PADDING = 20

const PageSeperator = '----'
const layoutSeparator = '---'
const columnSeparator = '--'

export function mark2ppt(text) {
  if (!text) return []
  const lines = text.split('\n')
  const slides = []
  let curSlide = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === PageSeperator) {
      slides.push(curSlide)
      curSlide = ''
    } else {
      curSlide += `${line}\n`
    }
    if (i === lines.length - 1) {
      slides.push(curSlide)
    }
  }

  return slides.map((v) => slide2html(v))
}

function countTripleBackticks(str) {
  const matches = str.match(/```|\\`\\`\\`/g)
  return matches ? matches.length : 0
}

function inCode(beforeText) {
  return countTripleBackticks(beforeText) % 2 === 1
}

// 状态机
function slide2html(text) {
  const lines = text.split('\n').map((v) => (v || '').trim())

  let html = ''
  let curColumnHtml = ''
  let curLayout = 'normal' // normal, column
  let curText = ''
  let curColumnText = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // 代码块里能写 --- 和 --，原markdown是能写
    if (inCode(lines.slice(0, i).join(''))) {
      curText += `${line}\n`
      if (curLayout === 'column') {
        curColumnText += `${line}\n`
      }
    } else if (line === layoutSeparator) {
      if (curLayout === 'normal') {
        // endLastNormalLayout
        html += `${marked(curText)}`
        // startColumnLayout
        curLayout = 'column'
        curText = ''
        curColumnText = ''
      } else {
        // endLastColumn
        curColumnHtml += `<div class="column-child">${marked(curColumnText)}</div>`
        // endColumnLayout
        html += `<div class="column-container">${curColumnHtml}</div>`
        curText = ''
        curColumnText = ''
        curLayout = 'normal'
        curColumnHtml = ''
      }
    } else if (line === columnSeparator) {
      // endLastColumn
      curColumnHtml += `<div class="column-child">${marked(curColumnText)}</div>`
      curColumnText = ''
      // startNewColumn
    } else {
      if (curLayout === 'column') {
        curColumnText += `${line}\n`
      }
      curText += `${line}\n`
    }

    if (i === lines.length - 1 && curText) {
      // endEverything
      // endColumnLayou
      // endNormalLayout
      html += marked(curText)
    }
  }
  return html
}

function slide2html2(text) {
  const blocks = text
    .split(layoutSeparator)
    .map((v) => v.replace(/^\n+|\n+$/g, ''))
    .filter((v) => v.trim() !== '')

  return blocks
    .map((block) => {
      if (block.includes(columnSeparator)) {
        return {
          type: 'columnLayout',
          columns: block
            .split(columnSeparator)
            .map((v) => v.replace(/^\n+|\n+$/g, ''))
            .filter((v) => v.trim() !== '')
            .map((column) => column.trim()),
        }
      }
      return {
        type: 'singleBlock',
        content: block,
      }
    })
    .map((v) => {
      if (v.type === 'columnLayout') {
        let html = '<div class="column-container">'
        v.columns.forEach((column) => {
          html += `<div class="column-child">${marked(column)}</div>`
        })
        html += '</div>'
        return html
      }
      return marked(v.content)
    })
    .join('')
}
