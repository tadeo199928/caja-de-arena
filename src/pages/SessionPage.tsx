import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/Api";
import CajaDeArena from "./CajaDeArena";
import { Navigate } from "react-router-dom";

function SessionPage() {
  const { token } = useParams();
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const response = await fetch(`${API_URL}/sessions/${token}`);
      const data = await response.json();

      console.log(data);
      if (data.success) {
        localStorage.setItem("sessionToken", token!);
        localStorage.setItem("patientId", data.session.patient_id);
        setValid(data.success);
      }
    };
    validateToken();
  }, [token]);
  if (valid === null) return <p>Cargando...</p>;
  if (!valid) return <Navigate to="/login" />;

  return <CajaDeArena />;
}

export default SessionPage;
