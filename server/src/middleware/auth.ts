import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthedRequest extends Request {
  adminUserId?: number;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!token) {
    return res.status(401).json({ message: "Unauthenticated." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as unknown as { sub: number };
    req.adminUserId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthenticated." });
  }
}
