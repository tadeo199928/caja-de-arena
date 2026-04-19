import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import sessionRoutes from "./routes/sessions.js";
import patientsRoutes from "./routes/patients.js";
import sessionEventsRoutes from "./routes/session_events.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://caja-de-arena.vercel.app",
      /\.vercel\.app$/,
    ],
  }),
);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/sessions", sessionRoutes);
app.use("/patients", patientsRoutes);
app.use("/session-events", sessionEventsRoutes);

app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
});
