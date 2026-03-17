import express from "express";
import pool from "../db.ts";
import { verifyToken } from "../middleware/authToken.ts";
import { handleError } from "../utils/handleError.ts";

const router = express.Router();

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { name, comments } = req.body;
    const psychologist_id = req.psychologist_id;
    const info_patient = await pool.query(
      " INSERT INTO patients (name, comments, psychologist_id) VALUES ($1, $2, $3) RETURNING * ",
      [name, comments, psychologist_id],
    );
    res.json({ success: true, patient: info_patient.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const psychologist_id = req.psychologist_id;
    const get_info_patient = await pool.query(
      "SELECT * FROM patients WHERE psychologist_id = $1",
      [psychologist_id],
    );
    res.json({ success: true, patients: get_info_patient.rows });
  } catch (error) {
    handleError(error, res);
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const psychologist_id = req.psychologist_id;
    const delete_patient = await pool.query(
      "DELETE FROM patients WHERE id = $1 AND psychologist_id = $2 RETURNING *",
      [id, psychologist_id]
    );
    res.json({ success: true, patient: delete_patient.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
