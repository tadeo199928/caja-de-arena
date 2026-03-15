import express from "express";
import pool from "../db.ts";
import { handleError } from "../utils/handleError.ts";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { snapshot, patient_id } = req.body;

    const save_data = await pool.query(
      "INSERT INTO session_events (patient_id, snapshot)  VALUES ($1, $2) RETURNING * ",
      [patient_id, snapshot],
    );
    res.json({ success: true, session_events: save_data.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/:patient_id/latest-snapshot", async (req, res) => {
  try {
    const { patient_id } = req.params;
    const results = await pool.query(
      "SELECT snapshot FROM session_events WHERE patient_id = $1 ORDER BY created_at DESC LIMIT 1",
      [patient_id],
    );
    if (results.rows.length === 0) {
      return  res.json({ success: true, snapshot: null })
    }
    res.json({ success: true, snapshot: results.rows[0].snapshot })
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
