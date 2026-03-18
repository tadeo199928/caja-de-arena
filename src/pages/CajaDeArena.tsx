import MyDraggableComponent from "../components/DragElement/DragElement";
import "./css/CajaDeArena.css";
import { useSelector } from "react-redux";
import type { ImgRender } from "../utils/ImgRender";
import { Navigate } from "react-router-dom";

function CajaDeArena() {
  const selectedGods = useSelector(
    (state: { gods: { selectedGods: ImgRender[] } }) => state.gods.selectedGods,
  );
  const sessionToken = localStorage.getItem("sessionToken");

  if (!sessionToken) return <Navigate to="/login" />;
  return (
    <div className="main-caja">
      {selectedGods.map((god: ImgRender) => (
        <MyDraggableComponent key={god.id} id={god.id} img={god.img} />
      ))}
    </div>
  );
}

export default CajaDeArena;
