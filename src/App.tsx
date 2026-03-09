

// import { imgOfGods } from "./DragElement/ImgFinder";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CajaDeArena from "./pages/CajaDeArena";
import SeleccionDioses from "./pages/SeleccionDioses";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/cajadeArena" element={<CajaDeArena />} />
          <Route path="/" element={<SeleccionDioses />} /> 
        </Routes>
      </div>
      {/* {imgOfGods.map((god) => ( */}
        {/* <MyDraggableComponent key={god.id} img={god.img} /> */}
      {/* ))} */}
    </BrowserRouter>
  );
}

export default App;
