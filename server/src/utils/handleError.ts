import type { Response } from "express";

export const handleError  = (error: unknown, res: Response) => {
  const message = error instanceof Error ? error.message : String(error);
  res.status(500).json({ success: false, error: message });
};
