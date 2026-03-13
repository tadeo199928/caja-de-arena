import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.ts";
import sessionRoutes from "./routes/sessions.ts";
import patientsRoutes from "./routes/patients.ts";
import sessionEventsRoutes from "./routes/session_events.ts"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/sessions", sessionRoutes);
app.use("/patients", patientsRoutes);
app.use("/sessions", sessionEventsRoutes);

app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
});
