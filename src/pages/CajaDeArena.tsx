import MyDraggableComponent from "../components/DragElement/DragElement";
import "./css/cajadeArena.css";
import { useSelector } from "react-redux";
import type {ImgRender} from "../utils/ImgRender";


function CajaDeArena() {
  const selectedGods = useSelector((state: { gods: { selectedGods: ImgRender[] } }) => state.gods.selectedGods);
  return (
    <div className="main-caja">
      {selectedGods.map((god: ImgRender) => (
        <MyDraggableComponent key={god.id} id={god.id} img={god.img} />
      ))}
    </div>
  );
}

export default CajaDeArena;
