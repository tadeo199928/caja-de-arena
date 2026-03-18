import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { API_URL } from "../../utils/Api";

function Navbar() {
  const location = useLocation();
  const isLogin = location.pathname === "/" || location.pathname === "/login";
  const isSession =
    location.pathname.startsWith("/session/") ||
    location.pathname.toLowerCase() === "/cajadearena" ||
    location.pathname.toLowerCase() === "/selecciondioses";

  if (isLogin) return null;
  const handledMenu = () => {
    const menu = document.querySelector(".mobile-menu");
    menu?.classList.toggle("active");
  };

    const handleSaveData = async () => {
      const snapshot: Record<string, unknown> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("god-")) {
          snapshot[key] = JSON.parse(localStorage.getItem(key)!);
        }
      }
      const patient_id = localStorage.getItem("patientId");
      const selectedGodsData = JSON.parse(
        localStorage.getItem("selectedGods") || "[]",
      );
      snapshot["selectedGods"] = selectedGodsData;
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

  return (
    <nav className="navbar">
      <div className="Title">
        <h1>Caja de Arena</h1>
      </div>

      {isSession && (
        <div className="buttons">
          <Link to="/CajaDeArena">Caja de Arena</Link>
          <Link to="/SeleccionDioses">Selección de Dioses</Link>
          <a onClick={handleSaveData}>Terminar sesión</a>
        </div>
      )}

      <AiOutlineThunderbolt className="icon" onClick={handledMenu} />
      {isSession && (
        <div className="mobile-menu">
          <Link to="/CajaDeArena">Caja de Arena</Link>
          <Link to="/SeleccionDioses">Selección de Dioses</Link>
          <a onClick={handleSaveData}>Terminar sesión</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
