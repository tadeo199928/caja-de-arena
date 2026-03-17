import { useState } from "react";
import "./PatientForm.css";
import { API_URL } from "../../utils/Api.ts";

interface PatientCreated {
   onPatientCreated: () => void
}

function PatientForm({ onPatientCreated }: PatientCreated) {
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const createdPatient = await fetch(`${API_URL}/patients/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, comments }),
    });
    const data = await createdPatient.json();
    if (data.success) {
      alert("Paciente creado con éxito");
      onPatientCreated()
      setName("");
      setComments("");
    } else {
      alert("error");
    }
  };

  return (
    <div className="Form-Container">
      <h1>Formulario de Paciente</h1>
      <form className="Patient-Form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre Completo"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Relatorio"
          required
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        <button type="submit">Crear paciente</button>
      </form>
    </div>
  );
}

export default PatientForm;
