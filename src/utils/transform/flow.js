import Dagre from '@dagrejs/dagre';
import { ConnectionLineType } from '@xyflow/react';


const getLayoutedElements = (nodes, edges, direction = "TR") => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction });
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

export function mark2flow(flowText, direction = "TR") {
  const lines = flowText.split('\n').filter(v => !!v.trim()) ;
  const nodes = [];
  const edges = [];

  let curNode = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (/^\d+\./.test(line)) {
      const [id, name] = line.split('.');
      curNode = {
        id,
        data: { label: name.trim() },
        measured: {
          width: 200,
          height: 40
        },
        desc: []
      };
      nodes.push(curNode);
    } else if (line.includes('->')) {
      const items = line.split('->');
      for (let i = 0; i < items.length - 1; i++) {
        const source = items[i].trim();
        const targetWithLabel = items[i + 1].trim();
        let target, label;

        if (targetWithLabel.includes('|')) {
          [label, target] = targetWithLabel.split('|').filter(v => v);
        } else {
          target = targetWithLabel;
          label = '';
        }
        edges.push({
          id: `e${source}-${target}`,
          source,
          target,
          label,
          animated: true,
          type: ConnectionLineType.SmoothStep
        });
      }
    } else if (curNode) {
      curNode.desc.push(line);
    }
  }
  return getLayoutedElements(nodes, edges, direction)
}