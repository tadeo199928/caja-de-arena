import { useRef } from 'react'; 
import Draggable from 'react-draggable';

interface MyDraggableComponentProps {
  img: string;
}

function MyDraggableComponent({ img }: MyDraggableComponentProps) {
  const nodeRef = useRef<HTMLDivElement>(null); 

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div 
        ref={nodeRef} 
        className="border-2 border-red-500 w-40 h-55 bg-white rounded-lg shadow-lg cursor-move hover:shadow-xl transition-shadow"
      >
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