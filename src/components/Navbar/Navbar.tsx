import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isSession = location.pathname.startsWith("/session/");

  const handledMenu = () => {
    const menu = document.querySelector(".mobile-menu");
    menu?.classList.toggle("active");
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="Title">
        <h1>Caja de Arena</h1>
      </div>
      {!isSession && isAuthenticated && (
        <div className="buttons">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cajadeArena">Caja de Arena</Link>
          <Link to="/seleccionDioses">Seleccion de Dioses</Link>
        </div>
      )}
      <AiOutlineThunderbolt className="icon" onClick={handledMenu} />
      {!isSession && isAuthenticated && (
        <div className="mobile-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/cajadeArena">Caja de Arena</Link>
          <Link to="/seleccionDioses">Seleccion de Dioses</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;