import MyDraggableComponent from "../components/DragElement/DragElement";
import "./css/CajaDeArena.css";
import { useSelector } from "react-redux";
import type { ImgRender } from "../utils/ImgRender";
import { Navigate } from "react-router-dom";
import { API_URL } from "../utils/Api";

function CajaDeArena() {
  const selectedGods = useSelector(
    (state: { gods: { selectedGods: ImgRender[] } }) => state.gods.selectedGods,
  );
  const sessionToken = localStorage.getItem("sessionToken");

  const handleSaveData = async () => {
    const snapshot: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("god-")) {
        snapshot[key] = JSON.parse(localStorage.getItem(key)!);
      }
    }
    const patient_id = localStorage.getItem("patientId");
    const response = await fetch(`${API_URL}/session-events/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ snapshot, patient_id }),
    });
    const data = await response.json();
    if (data.success) {
      alert("Sesión guardada correctamente");
    }
  };
  if (!sessionToken) return <Navigate to="/login" />;
  return (
    <div className="main-caja">
      {selectedGods.map((god: ImgRender) => (
        <MyDraggableComponent key={god.id} id={god.id} img={god.img} />
      ))}
      <button onClick={handleSaveData}>Terminar sesión</button>
    </div>
  );
}

export default CajaDeArena;
