import Dagre from '@dagrejs/dagre'

// 计算元素宽高
const getElementWidthHeight = (node) => {
  const div = document.createElement('div')
  div.style = {
    visibility: 'hidden',
    position: 'absolute',
    fontSize: '12px',
  }

  const text = document.createElement('div')
  text.style.whiteSpace = 'pre-line'
  text.textContent = `${node.title}\n${node.desc}`
  div.appendChild(text)

  // 将 div 添加到文档中以获取计算后的宽高
  document.body.appendChild(div)
  const width = Math.max(div.offsetWidth, 100)
  const height = Math.max(div.offsetHeight, 40)
  document.body.removeChild(div)
  return { width, height }
}

// 根据dagre计算元素坐标
const getLayoutedElements = (nodes, edges, direction = 'TR') => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: direction })
  edges.forEach((edge) => g.setEdge(edge.source, edge.target))
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.data?.width ?? 0,
      height: node.data?.height ?? 0,
    })
  )

  Dagre.layout(g)

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id)
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.data?.width ?? 0) / 2
      const y = position.y - (node.data?.height ?? 0) / 2
      return { ...node, position: { x, y } }
    }),
    edges,
  }
}

function getLabelAndTarget(text) {
  let id, label
  if (text.includes('|')) {
    ;[label, id] = text.split('|').filter((v) => v)
  } else {
    id = text
    label = ''
  }
  return { label, id }
}

// markdown转nodes, edges
export function mark2flow(text, direction = 'TR') {
  const lines = text.split('\n').filter((v) => !!v.trim())
  const nodes = []
  const edges = []

  let curNode = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (/^\d+\./.test(line)) {
      const [id, name] = line.split('.')
      const data = {
        title: name.trim(),
        desc: '',
      }
      curNode = {
        id,
        data: {
          ...data,
          ...getElementWidthHeight(data),
        },
        type: 'editableNode',
      }
      nodes.push(curNode)
    } else if (line.includes('->')) {
      const items = line.split('->')
      for (let i = 0; i < items.length - 1; i++) {
        const source = getLabelAndTarget(items[i].trim())
        const target = getLabelAndTarget(items[i + 1].trim())
        if (!source.id || !target.id) break

        edges.push({
          id: `e${source.id}-${target.id}`,
          source: source.id,
          target: target.id,
          label: source.label,
          type: 'smoothstep',
          // 需要设置 style 保证导出图片样式无误
          // issue: https://github.com/xyflow/xyflow/issues/3199
          style: {
            stroke: '#b1b1b7',
          },
          labelStyle: {
            fill: '#b1b1b7',
            fontSize: 10,
          },
          labelBgStyle: {
            fill: '#fff',
          },
        })
      }
    } else if (curNode) {
      curNode.data.desc += line // tood: 支持换行 \n
      curNode.data = {
        ...curNode.data,
        ...getElementWidthHeight(curNode.data),
      }
    }
  }

  return getLayoutedElements(nodes, edges, direction)
}

// nodes转markdown
// newNode: 表示更新了的节点
// text：表示更新前的文本
export function updateMarkByNode(newNode, text) {
  let res = []
  const lines = text.split('\n')
  let curNode = null
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes('->') || !line) {
      curNode = null
      res.push(line)
      continue
    } else if (/^\d+\./.test(line)) {
      const [id, oldTitle] = line.split('.')
      curNode = {
        id,
        desc: '',
      }
      if (curNode.id === newNode.id && newNode.title !== oldTitle) {
        res.push(`${id}. ${newNode.title}`)
        continue
      }
    } else if (curNode.id === newNode.id) {
      if (!curNode.desc) {
        res.push(newNode.desc)
      }
      continue
    }
    res.push(line)
  }
  return res.join('\n')
}
