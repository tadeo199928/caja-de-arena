import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CajaDeArena from "./pages/CajaDeArena";
import SeleccionDioses from "./pages/SeleccionDioses";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SessionPage from "./pages/SessionPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/CajaDeArena" element={ <CajaDeArena /> } />
          <Route path="/SeleccionDioses" element={ <SeleccionDioses /> } />
          <Route path="/session/:token" element={<SessionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
