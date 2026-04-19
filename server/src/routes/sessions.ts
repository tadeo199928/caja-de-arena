import express from "express";
import pool from "../db.js";
import { randomUUID } from "crypto";
import { verifyToken } from "../middleware/authToken.js";
import { verifySession } from "../middleware/verifyToken.js";
import { handleError } from "../utils/handleError.js";

const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { patient_id } = req.body;
    const psychologist_id = req.psychologist_id;
    const token = randomUUID();
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const is_active = true;

    const existing = await pool.query(
      "SELECT * FROM sessions WHERE patient_id = $1 AND is_active= true AND expires_at > NOW() ",
      [patient_id],
    );
    if (existing.rows.length > 0) {
      return res.json({ success: true, session: existing.rows[0] });
    }

    const info_session = await pool.query(
      " INSERT INTO sessions (token, expires_at, psychologist_id, patient_id, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
      [token, expires_at, psychologist_id, patient_id, is_active],
    );

    res.json({ success: true, session: info_session.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/:token", verifySession, async (req, res) => {
  try {
    const session_id = req.session_id;
    const result = await pool.query("SELECT * FROM sessions WHERE id = $1", [
      session_id,
    ]);
    res.json({ success: true, session: result.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

router.patch("/:id/deactivate", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE sessions SET is_active = false WHERE id = $1 AND psychologist_id = $2 RETURNING *",
      [id, req.psychologist_id],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Sesión no encontrada" });
    }
    res.json({ success: true, session: result.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/active/:patient_id", verifyToken, async (req, res) => {
  try {
    const { patient_id } = req.params;
    const existing = await pool.query(
      "SELECT * FROM sessions WHERE patient_id = $1 AND is_active= true AND expires_at > NOW() ",
      [patient_id],
    );
    res.json({
      success: true,
      hasActive: existing.rows.length > 0,
      session: existing.rows[0] || null,
    });
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
