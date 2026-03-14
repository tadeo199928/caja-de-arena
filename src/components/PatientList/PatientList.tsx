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

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setPatients(data.patients);
      } else {
        alert("Error fetching patients");
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="list-Container">
      <h1>Lista de Pacientes</h1>
        <div className="list-content">
            {patients.map((patient) => (
                <div  className="patient-card">
                    <h2>{patient.name}</h2>
                    <p>{patient.comments}</p>
                    <p>{patient.id}</p>
                </div>
            ))}
        </div>
    </div>
  );
}

export default PatientList;
