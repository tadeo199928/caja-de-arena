import express from "express";
import pool from "../db.ts";
import { randomUUID } from "crypto";
import { verifyToken } from "../middleware/authToken.ts";
import { handleError } from "../utils/handleError.ts";

const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { patient_id } = req.body;
    const token = randomUUID();
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const is_active = true;
    const psychologist_id = req.psychologist_id;

    const info_session = await pool.query(
      " INSERT INTO sessions (token, expires_at, psychologist_id, patient_id, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
      [token, expires_at, psychologist_id, patient_id, is_active],
    );
    res.json({ success: true, session: info_session.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/:token", async (req, res) => {
  const { token } = req.params;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(token)) {
    return res
      .status(404)
      .json({ success: false, error: "Sesión no encontrada" });
  }
  try {
    const token_id = await pool.query(
      "SELECT * FROM sessions WHERE token = $1",
      [token],
    );
    if (token_id.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "id del usuario incorrecto" });
    }
    const session = token_id.rows[0];
    if (!session.is_active) {
      return res
        .status(403)
        .json({ success: false, error: "el token no esta activo" });
    }
    if (new Date(session.expires_at) < new Date()) {
      return res
        .status(403)
        .json({ success: false, error: "el token ya no es valido" });
    }
    res.json({ success: true, session });
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
