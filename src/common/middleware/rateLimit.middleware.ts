import rateLimit from "express-rate-limit";
import { Messages } from "../constants/messages";

export const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: Messages.TOO_MANY_REQUESTS,
  },
});

// Rate limit para autenticación con correo
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // máximo 10 intentos de autenticación por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: Messages.TOO_MANY_AUTH_ATTEMPTS,
  },
});
