import { useRef, useState } from "react";
import Draggable from "react-draggable";

// interface MyDraggableComponentProps {
//   img: string;
// }

function MyDraggableComponent() {
  const nodeRef = useRef<HTMLDivElement>(null);
  // const [selected, setSelected] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
    >
      <div
        ref={nodeRef}
        className={`relative border-4 ${isDragging ? 'border-blue-500' : 'border-red-500'} w-40 h-55 bg-white rounded-lg shadow-lg cursor-grab hover:shadow-xl transition-shadow`}
      >
        {/* <img
          src={img}
          alt="placeholder"
          draggable="false"
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-700">
          Drag Me
        </div>
      </div>
    </Draggable>
  );
}

export default MyDraggableComponent;
