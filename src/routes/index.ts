import { Router } from "express";
import { UserRepository } from "../modules/user/user.repository";
import { UserService } from "../modules/user/user.service";
import { UserController } from "../modules/user/user.controller";
import { TaskController } from "../modules/task/task.controller";
import { TaskRepository } from "../modules/task/task.repository";
import { TaskService } from "../modules/task/task.service";
import {
  validateCreateTask,
  validateDeleteTask,
  validateUpdateTask,
} from "../common/middleware/validators/task.validators";
import { validateRequest } from "../common/middleware/validate.middleware";
import {
  validateCreateUser,
  validateFindUser,
} from "../common/middleware/validators/user.validators";
import { authRateLimit } from "../common/middleware/rateLimit.middleware";

const router = Router();

// Instancias
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Rutas user
router.get(
  "/users/:email",
  validateFindUser,
  validateRequest,
  userController.findByEmail,
);
router.post(
  "/users",
  authRateLimit,
  validateCreateUser,
  validateRequest,
  userController.createUser,
);

// Rutas task
router.get("/tasks/user/:userId", taskController.getTasksByUser);
router.post(
  "/tasks",
  validateCreateTask,
  validateRequest,
  taskController.createTask,
);
router.put(
  "/tasks/:taskId",
  validateUpdateTask,
  validateRequest,
  taskController.updateTask,
);
router.delete(
  "/tasks/:taskId",
  validateDeleteTask,
  validateRequest,
  taskController.deleteTask,
);

export default router;
