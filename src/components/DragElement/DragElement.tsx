import { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./DragElement.css";

interface MyDraggableComponentProps {
  img: string;
  id: number;
}

function MyDraggableComponent({ img, id }: MyDraggableComponentProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [rotation, setRotation] = useState(() => {
    const saved = localStorage.getItem(`god-${id}`);
    return saved ? (JSON.parse(saved).rotation ?? 0) : 0;
  });

  const [isImgSet, setIsImgSet] = useState(() => {
    const saved = localStorage.getItem(`god-${id}`);
    return saved ? (JSON.parse(saved).isImgSet ?? 0) : 0;
  });

  const [transform, setTransform] = useState(() => {
    const saved = localStorage.getItem(`god-${id}`);
    return saved ? (JSON.parse(saved).transform ?? 0) : 0;
  });

  const [setOpacity, setSetOpacity] = useState(() => {
    const saved = localStorage.getItem(`god-${id}`);
    return saved ? (JSON.parse(saved).setOpacity ?? false) : false;
  });

  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem(`god-${id}`);
    const data = saved ? JSON.parse(saved) : {};
    return { x: data.x ?? 0, y: data.y ?? 0 };
  });

  useEffect(() => {
    localStorage.setItem(
      `god-${id}`,
      JSON.stringify({
        rotation,
        isImgSet,
        transform,
        setOpacity,
        x: position.x,
        y: position.y,
      }),
    );
  }, [rotation, isImgSet, transform, setOpacity, position, id]);
  const getTransformStyle = () => {
    let transformStr = `rotate(${rotation}deg)`;

    switch (transform) {
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
    setTransform((prevTransform: number) => (prevTransform + 1) % 5);
  };

  const handleRotate = () => {
    setRotation((prevRotation: number) => (prevRotation + 90) % 360);
  };

  const setBuried = {
    0: "none",
    1: "hidden",
    2: "half-hidden-buttom",
    3: "half-hidden-top",
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      defaultPosition={position}
      onStop={(_e, data) => {
        setPosition({ x: data.x, y: data.y });
      }}
      onStart={() => setIsOpen(true)}
      cancel="button"
    >
      <div ref={nodeRef} className="draggable-item">
        <div
          className={`image-container ${isOpen ? "border-blue" : "border-red"}`}
          style={getTransformStyle()}
        >
          <img
            src={img}
            alt="placeholder"
            draggable="false"
            className={`${setBuried[isImgSet as keyof typeof setBuried]} ${setOpacity ? "opacity" : ""}`}
          />
        </div>
        <div className={`${isOpen ? "OpenMenu" : "hidden"} `}>
          <button className="button" onClick={handleRotate}>
            Rotar: {rotation}°
          </button>
          <button
            className="button"
            onClick={() => setIsImgSet((prev: number) => (prev + 1) % 4)}
          >
            {isImgSet === 0
              ? "Superficie"
              : isImgSet === 1
                ? "Enterrado"
                : isImgSet === 2
                  ? "Mitad Inferior Enterrada"
                  : "Mitad Superior Enterrada"}
          </button>
          <button className="button" onClick={handleTransform}>
            Mirar{" "}
            {transform === 0
              ? "Recto"
              : transform === 1
                ? "Izquierda"
                : transform === 2
                  ? "Derecha"
                  : transform === 3
                    ? "Arriba"
                    : "Abajo"}
          </button>
          <button
            className="button"
            onClick={() => setSetOpacity((prev: boolean) => !prev)}
          >
            Espiritu: {setOpacity ? "Si" : "No"}
          </button>
          <button className="button red" onClick={() => setIsOpen(false)}>
            Cerrar
          </button>
        </div>
      </div>
    </Draggable>
  );
}

export default MyDraggableComponent;
