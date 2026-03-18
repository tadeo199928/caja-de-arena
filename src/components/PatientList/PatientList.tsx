import { useState, useEffect } from "react";
import "./PatientList.css";
import { API_URL } from "../../utils/Api.ts";
import { FaCopy } from "react-icons/fa";

interface Patient {
  id: string;
  name: string;
  comments: string;
}

interface PatientListProps {
  refresh: number;
}

function PatientList({ refresh }: PatientListProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [generatedLinks, setGeneratedLinks] = useState<Record<string, string>>(
    {},
  );
  const [sessionIds, setSessionIds] = useState<Record<string, string>>({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch(`${API_URL}/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setPatients(data.patients);
        const activeSessions = await Promise.all(
          data.patients.map(async (patient: Patient) => {
            const res = await fetch(
              `${API_URL}/sessions/active/${patient.id}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );
            return { patient_id: patient.id, data: await res.json() };
          }),
        );
        activeSessions.forEach(({ patient_id, data }) => {
          if (data.hasActive) {
            const link = `${window.location.origin}/session/${data.session.token}`;
            setGeneratedLinks((prev) => ({ ...prev, [patient_id]: link }));
            setSessionIds((prev) => ({
              ...prev,
              [patient_id]: data.session.id,
            }));
          }
        });
      } else {
        alert("Error fetching patients");
      }
    };
    fetchPatients();
  }, [refresh]);

  const handleGenerateLink = async (patient_id: string) => {
    const response = await fetch(`${API_URL}/sessions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ patient_id }),
    });
    const data = await response.json();
    if (data.success) {
      const link = `${window.location.origin}/session/${data.session.token}`;
      setGeneratedLinks((prev) => ({ ...prev, [patient_id]: link }));
      setSessionIds((prev) => ({ ...prev, [patient_id]: data.session.id }));
      alert(`Link generado: ${link}`);
    } else {
      alert("Error generando link");
    }
  };

  const handleUpdateSession = async (
    session_id: string,
    patient_id: string,
  ) => {
    const response = await fetch(
      `${API_URL}/sessions/${session_id}/deactivate`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    const data = await response.json();
    if (data.success) {
      setGeneratedLinks((prev) => {
        const updated = { ...prev };
        delete updated[patient_id];
        return updated;
      });
      setSessionIds((prev) => {
        const updated = { ...prev };
        delete updated[patient_id];
        return updated;
      });
    } else {
      alert("Error actualizando el estado");
    }
  };

  const handleDeletedPatient = async (patient_id: string) => {
    const response = await fetch(`${API_URL}/patients/delete/${patient_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (data.success) {
      setPatients((prev) => prev.filter((p) => p.id !== patient_id));
    } else {
      alert("No se ha podido borrar el usuario");
    }
  };

  return (
    <div className="list-Container">
      <h1>Lista de Pacientes</h1>
      <div className="list-content">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <h2>Nombre:</h2>
            <h2>{patient.name}</h2>
            <h2>Relatorio:</h2>
            <p>{patient.comments}</p>
            <h2>Link de la consulta:</h2>
            {generatedLinks[patient.id] ? (
              <div className="link-wrapper">
                <p className="link"> {generatedLinks[patient.id]} </p>
                <FaCopy className="copy-icon" onClick={() => navigator.clipboard.writeText(generatedLinks[patient.id])}/>
              </div>
            ) : (
              <p className="link">No hay link de una sesión activa.</p>
            )}

            <div className="actions-row">
              {generatedLinks[patient.id] ? (
                <button
                  className="button-list button-update"
                  onClick={() =>
                    handleUpdateSession(sessionIds[patient.id], patient.id)
                  }
                >
                  Finalizar sesión
                </button>
              ) : (
                <button
                  className="button-list button-primary"
                  onClick={() => handleGenerateLink(patient.id)}
                >
                  Generar link
                </button>
              )}

              <button
                className="button-list button-danger"
                onClick={() => handleDeletedPatient(patient.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientList;
