import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      psychologist_id?: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const tokenPsyco = authHeader!.split(" ")[1];
    const decoded = jwt.verify(tokenPsyco, process.env.JWT_SECRET!);
    type AuthPayload = jwt.JwtPayload & { id: string };
    const psychologist_id = (decoded as AuthPayload).id;

    req.psychologist_id = psychologist_id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: "No autorizado" });
  }
};
