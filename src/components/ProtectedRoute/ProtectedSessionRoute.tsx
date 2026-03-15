import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../../utils/Api";

function ProtectedSessionRoute({ children }: { children: React.ReactNode }) {
  const [valid, setValid] = useState<boolean | null>(null);
  const sessionToken = localStorage.getItem("sessionToken");

  useEffect(() => {
    const validate = async () => {
      if (!sessionToken) return setValid(false);
      const response = await fetch(`${API_URL}/sessions/${sessionToken}`);
      const data = await response.json();
      if (!data.success) {
        localStorage.removeItem("sessionToken");
        setValid(false);
        console.log("sessionToken:", sessionToken);
        console.log("response:", data);
      } else {
        setValid(true);
      }
    };
    validate();
  }, []);

  if (valid === null) return <p>Cargando...</p>;
  if (!valid) return <Navigate to="/login" />;
  return <>{children}</>;
}

export default ProtectedSessionRoute;
