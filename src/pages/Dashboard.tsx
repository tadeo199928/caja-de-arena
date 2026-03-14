import { useEffect, useState } from "react";
import PatientForm from "../components/PatientForm/PatientForm";
import PatientList from "../components/PatientList/PatientList";
import "./css/Dashboard.css";
import { API_URL } from "../utils/Api";

function Dashboard() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchPsychologists = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/auth/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setName(data.psychologist.name);
      } else {
        alert("Error fetching psychologists");
      }
    };
    fetchPsychologists();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard {name}</h1>
      <div className="list-wrapper">
        <PatientForm />
        <PatientList />
      </div>
    </div>
  );
}

export default Dashboard;
