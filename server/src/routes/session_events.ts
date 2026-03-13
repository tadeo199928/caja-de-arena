import express from "express";
import pool from "../db.ts";
import { handleError } from "../utils/handleError.ts";
import { verifySession } from "../middleware/verifyToken.ts";

const router = express.Router();

router.post("/:token/save", verifySession, async (req, res) => {
  try {
    const { snapshot } = req.body;
    const session_id = req.session_id;

    const save_data = await pool.query(
      "INSERT INTO session_events (session_id, snapshot)  VALUES ($1, $2) RETURNING * ",
      [session_id, snapshot],
    );
    res.json({ success: true, session_events: save_data.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
