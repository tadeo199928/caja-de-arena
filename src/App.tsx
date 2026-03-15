import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CajaDeArena from "./pages/CajaDeArena";
import SeleccionDioses from "./pages/SeleccionDioses";
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SessionPage from "./pages/SessionPage";
import ProtectedSessionRoute from "./components/ProtectedRoute/ProtectedSessionRoute";

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
          <Route
            path="/CajaDeArena"
            element={
              <ProtectedSessionRoute>
                <CajaDeArena />
              </ProtectedSessionRoute>
            }
          />
          <Route
            path="/SeleccionDioses"
            element={
              <ProtectedSessionRoute>
                <SeleccionDioses />
              </ProtectedSessionRoute>
            }
          />
          <Route path="/session/:token" element={<SessionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
