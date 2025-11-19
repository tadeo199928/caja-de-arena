import { useRef, useState } from 'react';
import Draggable from 'react-draggable';

interface MyDraggableComponentProps {
  img: string;
}

function MyDraggableComponent({ img }: MyDraggableComponentProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(false);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div
        ref={nodeRef}
        className="relative border-4 border-red-500 w-40 h-55 bg-white rounded-lg shadow-lg cursor-grab hover:shadow-xl transition-shadow"
      >
        {/* Select circle */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            setSelected(s => !s);
          }}
          className={`absolute top right-1 w-5 h-5 rounded-full border-gray-300 cursor-cell transition-colors
            ${selected ? 'bg-red-500 border-red-700' : 'bg-transparent border-gray-400'}
          `}
          aria-label={selected ? "Deselect" : "Select"}
        />
        <img
          src={img}
          alt="placeholder"
          draggable="false"
          className="w-full h-full object-cover"
        />
      </div>
    </Draggable>
  );
}

export default MyDraggableComponent;