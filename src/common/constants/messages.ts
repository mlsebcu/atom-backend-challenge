export const Messages = {
  // Validaciones genéricas
  REQUIRED: (field: string) => `${field} es requerido`,
  INVALID_FORMAT: (field: string) => `${field} no tiene un formato válido`,
  MAX_LENGTH: (field: string, max: number) =>
    `${field} no puede exceder ${max} caracteres`,
  INVALID_VALUE: (field: string, values: string[]) =>
    `${field} debe ser uno de: ${values.join(", ")}`,

  // Módulo de usuario
  USER: {
    NOT_FOUND: "Usuario no encontrado",
    ALREADY_EXISTS: "Usuario ya existe",
    CREATED: "Usuario creado exitosamente",
  },

  // Módulo de tarea
  TASK: {
    NOT_FOUND: "Tarea no encontrada",
    CREATED: "Tarea creada exitosamente",
    UPDATED: "Tarea actualizada exitosamente",
    DELETED: "Tarea eliminada exitosamente",
  },

  // Errores generales
  INTERNAL_ERROR: "Error interno del servidor",
  VALIDATION_FAILED: "Validación fallida",
  TOO_MANY_REQUESTS: "Demasiadas solicitudes, intenta de nuevo en 15 minutos",
  TOO_MANY_AUTH_ATTEMPTS:
    "Demasiados intentos de autenticación, intenta de nuevo en 15 minutos",
} as const;
