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
  const [transform, setTransform] = useState(0);

  const rotationClasses = {
    0: "rotate-0",
    90: "rotate-90",
    180: "rotate-180",
    270: "rotate-270",
  };

const getTransformStyle = () => {
  let transformStr = `rotate(${rotation}deg)`;
  
  switch(transform) {
    case 1: 
      transformStr += " perspective(1000px) rotateY(50deg)";
      break;
    case 2: 
      transformStr += " perspective(1000px) rotateY(-50deg)";
      break;
    case 3: 
      transformStr += " perspective(1000px) rotateX(-50deg)";
      break;
    case 4: 
      transformStr += " perspective(1000px) rotateX(50deg)";
      break;
    default:
      break;
  }
  
  return { transform: transformStr };
};

  const handleTransform = () => {
    setTransform((prevTransform) => (prevTransform + 1) % 5);
  }

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
          className={`image-container ${
            isOpen ? "border-blue" : "border-red"
          }`}
          style={getTransformStyle()}
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
          <button className="button" onClick={handleTransform}>
            Mirar {transform === 0 ? "Recto" : transform === 1 ? "Izquierda" : transform === 2 ? "Derecha" : transform === 3 ? "Arriba" : "Abajo"}
          </button>
          <button className="button">Eliminar</button>
          <button className="button red" onClick={() => setIsOpen(false)}>
            Cerrar
          </button>
        </div>
      </div>
    </Draggable>
  );
}

export default MyDraggableComponent;
