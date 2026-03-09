import {  Link } from "react-router-dom";
import "./Navbar.css";
import { AiOutlineThunderbolt } from "react-icons/ai";

function Navbar() {

        const handledMenu = () => {
            const menu = document.querySelector(".mobile-menu");
            menu?.classList.toggle("active");
        }
        
    return (
        <nav className="navbar">

            <div className="Title">
                <h1>Caja de Arena</h1>
            </div>
            <div className="buttons">
                <Link to="/cajadeArena">Caja de Arena</Link>
                <Link to="/seleccionDioses">Seleccion de Dioses</Link>
            </div>
            <AiOutlineThunderbolt className="icon" onClick={handledMenu} />
                <div className="mobile-menu"> 
                    <Link to="/cajadeArena">Caja de Arena</Link>
                    <Link to="/seleccionDioses">Seleccion de Dioses</Link>
                </div>
        </nav>
    );
}

export default Navbar;