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

export default router;
