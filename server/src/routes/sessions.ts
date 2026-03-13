import express from "express";
import pool from "../db.ts";
import { randomUUID } from "crypto";
import { verifyToken } from "../middleware/authToken.ts";
import { verifySession } from "../middleware/verifyToken.ts";
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

export default router;
