import pool from "../db.ts";
import type { Request, Response, NextFunction } from "express";
import { handleError } from "../utils/handleError.ts";

declare global {
  namespace Express {
    interface Request {
      session_id?: string;
    }
  }
}

export const verifySession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.params;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (typeof token !== "string" || !uuidRegex.test(token)) {
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
    req.session_id = session.id;
    next();
  } catch (error) {
    handleError(error, res)
  }
};
