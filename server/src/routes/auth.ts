import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.ts";
import { handleError } from "../utils/handleError.ts";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO psychologists (email,password_hash, name) VALUES ($1 , $2, $3) RETURNING id, email, name",
      [email, hashedPassword, name],
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    handleError(error, res);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM psychologists WHERE email = $1",
      [email],
    );
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, error: "Email o password incorrecto" });
    }
    const psychologist = result.rows[0];
    const validPassword = await bcrypt.compare(
      password,
      psychologist.password_hash,
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, error: "Email o password incorrecto" });
    }
    const token = jwt.sign({ id: psychologist.id }, process.env.JWT_SECRET!, {
      expiresIn: "8h",
    });
    res.json({ success: true, token, name: psychologist.name });
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
