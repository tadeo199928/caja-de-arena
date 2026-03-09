import MyDraggableComponent from "../components/DragElement/DragElement";
import "./css/cajadeArena.css";

function CajaDeArena() {
  return (
    <div className="main-caja">
      <MyDraggableComponent key="image1" img="/images/image1.jpg" />
      <MyDraggableComponent key="image2" img="/images/image2.jpg" />
    </div>
  );
}

export default CajaDeArena;
