import { useRef, useState } from "react";
import Draggable from "react-draggable";
import "./DragElement.css";

interface MyDraggableComponentProps {
  img: string;
}

function MyDraggableComponent({ img }: MyDraggableComponentProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isImgSet, setIsImgSet] = useState(true);

  const rotationClasses = {
    0: "rotate-0",
    90: "rotate-90",
    180: "rotate-180",
    270: "rotate-270",
  };

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onStart={() => setIsOpen(true)}
      cancel="button"
    >
      <div ref={nodeRef} className="draggable-item">
        <div
          className={`image-container drag-handle ${
            isOpen ? "border-blue" : "border-red"
          } ${rotationClasses[rotation as keyof typeof rotationClasses]}`}
        >
          <img
            src={img}
            alt="placeholder"
            draggable="false"
            className={isImgSet ? "" : "hidden"}
          />
        </div>
        <div className={`${isOpen ? "OpenMenu" : "hidden"} `}>
          <button className="button" onClick={handleRotate}>
            Rotar: {rotation}°
          </button>
          <button className="button" onClick={() => setIsImgSet(!isImgSet)}>
            {isImgSet ? "Enterrar" : "Desenterrar"}
          </button>
          <button className="button">Eliminar</button>
          <button className="button red" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </Draggable>
  );
}

export default MyDraggableComponent;
