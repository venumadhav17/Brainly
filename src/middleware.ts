import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

interface AuthRequest extends Request {
  userId?: string;
}

interface JwtPayload {
  id: string;
}

export const userMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers["authorization"];
    if (!token || typeof token !== "string") {
      res
        .status(401)
        .json({ message: "Authorization header is missing or invalid" });
      return;
    }
    const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired token"
    });
  }
};
