import { body, param } from "express-validator";

export const validateCreateTask = [
  body("userId").notEmpty().withMessage("El userId es requerido"),
  body("title")
    .notEmpty()
    .withMessage("El título es requerido")
    .isLength({ max: 100 })
    .withMessage("El título no puede exceder 100 caracteres"),
  body("description")
    .notEmpty()
    .withMessage("La descripción es requerida")
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder 500 caracteres"),
];

export const validateUpdateTask = [
  param("taskId").notEmpty().withMessage("El taskId es requerido"),
  body("title")
    .optional()
    .isLength({ max: 100 })
    .withMessage("El título no puede exceder 100 caracteres"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder 500 caracteres"),
  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("El estado debe ser pending o completed"),
];

export const validateDeleteTask = [
  param("taskId").notEmpty().withMessage("El taskId es requerido"),
];
