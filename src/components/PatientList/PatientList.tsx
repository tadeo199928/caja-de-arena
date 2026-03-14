import { useState, useEffect } from "react";
import "./PatientList.css";
import { API_URL } from "../../utils/Api.ts";

type Patient = {
  id: string;
  name: string;
  comments: string;
};

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [generatedLinks, setGeneratedLinks] = useState<Record<string, string>>(
    {},
  );
  const [sessionIds, setSessionIds] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setPatients(data.patients);
      } else {
        alert("Error fetching patients");
      }
    };
    fetchPatients();
  }, []);

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

  return (
    <div className="list-Container">
      <h1>Lista de Pacientes</h1>
      <div className="list-content">
        {patients.map((patient) => (
          <div key={patient.id} className="patient-card">
            <h2>{patient.name}</h2>
            <p>{patient.comments}</p>
            <p>{patient.id}</p>
            {generatedLinks[patient.id] ? (
              <div className="updateLink">
                <p>{generatedLinks[patient.id]}</p>
                <button
                  onClick={() =>
                    handleUpdateSession(sessionIds[patient.id], patient.id)
                  }
                >
                  Finalizar sesión
                </button>
              </div>
            ) : (
              <button onClick={() => handleGenerateLink(patient.id)}>
                Generar link
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientList;
