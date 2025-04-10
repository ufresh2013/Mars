export function mark2ppt(text) {
  if (!text) return []
  return text
    .split('----')
    .map((slide, index) => {
      slide = slide.trim()
      const res = {
        id: index.toString(),
        data: {
          source: slide,
        },
      }

      if (index > 0) {
        res.data.left = (index - 1).toString()
      }

      if (index < text.split('----').length - 1) {
        res.data.right = (index + 1).toString()
      }
      return res
    })
    .reduce((slides, { id, data }) => ({ ...slides, [id]: data }), {})
}

export const SLIDE_WIDTH = 1920
export const SLIDE_HEIGHT = 1080
export const SLIDE_PADDING = 100

export const slidesToElements = (slides) => {
  const start = Object.keys(slides)[0]
  const stack = [{ id: start, position: { x: 0, y: 0 } }]
  const visited = new Set()
  const nodes = []
  const edges = []

  while (stack.length) {
    const { id, position } = stack.pop()
    const slide = slides[id]
    const node = {
      id,
      type: 'slide',
      position,
      data: slide,
      draggable: false,
    }

    if (slide.left && !visited.has(slide.left)) {
      const nextPosition = {
        x: position.x - (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      }

      stack.push({ id: slide.left, position: nextPosition })
      edges.push({
        id: `${id}->${slide.left}`,
        source: id,
        target: slide.left,
      })
    }

    if (slide.right && !visited.has(slide.right)) {
      const nextPosition = {
        x: position.x + (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      }

      stack.push({ id: slide.right, position: nextPosition })
      edges.push({
        id: `${id}->${slide.down}`,
        source: id,
        target: slide.down,
      })
    }

    nodes.push(node)
    visited.add(id)
  }

  return { start, nodes, edges }
}
