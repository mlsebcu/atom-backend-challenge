import { body, param } from "express-validator";

export const validateFindUser = [
  param("email")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),
];

export const validateCreateUser = [
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),
];
