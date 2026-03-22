import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/response.types";

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(`[Error] ${err.message}`);

  if (err instanceof AppError) {
    const response: ApiError = {
      success: false,
      message: err.message,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  // Error genérico no controlado
  const response: ApiError = {
    success: false,
    message: "Error interno del servidor",
  };
  res.status(500).json(response);
}
