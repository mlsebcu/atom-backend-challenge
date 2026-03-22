import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../types/response.types";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const response: ApiError = {
      success: false,
      message: "Falla en la validación",
      errors: errors.array().map((e) => e.msg as string),
    };
    res.status(400).json(response);
    return;
  }

  next();
}
