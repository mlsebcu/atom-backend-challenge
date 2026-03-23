import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../types/response.types";
import { Messages } from "../constants/messages";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const response: ApiError = {
      success: false,
      message: Messages.VALIDATION_FAILED,
      errors: errors.array().map((e) => e.msg as string),
    };
    res.status(400).json(response);
    return;
  }

  next();
}
