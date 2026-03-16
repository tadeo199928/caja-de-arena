import { imgOfGods } from "../utils/ImgRender";
import "./css/SeleccionDios.css";
import { useDispatch, useSelector } from "react-redux";
import { addGod, removeGod } from "../utils/godsSlice";
import type { ImgRender } from "../utils/ImgRender";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function SeleccionDioses() {
  const sessionToken = localStorage.getItem("sessionToken");
  if (!sessionToken) return <Navigate to="/login" />;
  const dispatch = useDispatch();
  const selectedGods = useSelector(
    (state: { gods: { selectedGods: ImgRender[] } }) => state.gods.selectedGods,
  );

  useEffect(() => {
    localStorage.setItem("selectedGods", JSON.stringify(selectedGods));
  }, [selectedGods]);

  return (
    <div className="select-container">
      <h1>Selecciona los Personajes</h1>
      <div className="god-list">
        {imgOfGods.map((god) => {
          const isSelected = selectedGods.some((g) => g.id === god.id);

          return (
            <div key={god.id} className="god-item">
              <img src={god.img} alt={`God ${god.id}`} loading="lazy" />
              <div className="button-container">
                <a
                  onClick={() => dispatch(addGod(god))}
                  className={`${isSelected ? "added" : ""}`}
                >
                  {isSelected ? "Agregado" : "Agregar"}
                </a>
                <a onClick={() => dispatch(removeGod(god))}>Quitar</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeleccionDioses;
