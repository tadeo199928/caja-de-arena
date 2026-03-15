import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/Api";
import CajaDeArena from "./CajaDeArena";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGods } from "../utils/godsSlice";

function SessionPage() {
  const { token } = useParams();
  const [valid, setValid] = useState<boolean | null>(null);
          const dispatch = useDispatch();

  useEffect(() => {
    const validateToken = async () => {
      const response = await fetch(`${API_URL}/sessions/${token}`);

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("sessionToken", token!);
        localStorage.setItem("patientId", data.session.patient_id);
        const patient_id = data.session.patient_id;
        localStorage.setItem("patientId", patient_id);

        const hasLocalData = Object.keys(localStorage).some((key) =>
          key.startsWith("god-"),
        );

        if (!hasLocalData) {
          const snapshotResponse = await fetch(
            `${API_URL}/session-events/${patient_id}/latest-snapshot`,
          );
          const snapshotData = await snapshotResponse.json();

          if (snapshotData.success && snapshotData.snapshot) {
            Object.entries(snapshotData.snapshot).forEach(([key, value]) => {
              localStorage.setItem(key, JSON.stringify(value));
            });
            if (snapshotData.snapshot.selectedGods) {
              dispatch(setGods(snapshotData.snapshot.selectedGods));
            }
          }
        }
      }
      setValid(data.success);
    };
    validateToken();
  }, [token]);
  if (valid === null) return <p>Cargando...</p>;
  if (!valid) return <Navigate to="/login" />;

  return <CajaDeArena />;
}

export default SessionPage;
