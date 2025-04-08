import { useCallback } from 'react';
import { Remark } from 'react-remark';
import { useReactFlow } from '@xyflow/react';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '@/utils/transform/ppt';
const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
};

export default function Slide({ data }) {
  const { source, left, right } = data;
  const { fitView } = useReactFlow();

  const moveToNextSlide = useCallback(
    (event, id) => {
      event.stopPropagation();
      fitView({ nodes: [{ id }], duration: 150 });
    },
    [fitView],
  );

  return (
    <article className="slide" style={style}>
      <Remark>{source}</Remark>
      <footer className="slide__controls nopan">
        {left && <button onClick={(e) => moveToNextSlide(e, left)}>←</button>}
        {right && <button onClick={(e) => moveToNextSlide(e, right)}>→</button>}
      </footer>
    </article>
  );
}
