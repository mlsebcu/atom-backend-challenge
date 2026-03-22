import { Request, Response, NextFunction } from "express";
import { TaskService } from "./task.service";
import { ApiResponse } from "../../common/types/response.types";
import { Task, CreateTaskDto, UpdateTaskDto } from "./task.model";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  getTasksByUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.params["userId"] as string;
      const tasks = await this.taskService.getTasksByUser(userId);

      const response: ApiResponse<Task[]> = { success: true, data: tasks };
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };

  createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const dto = req.body as CreateTaskDto;
      const task = await this.taskService.createTask(dto);

      const response: ApiResponse<Task> = {
        success: true,
        data: task,
        message: "Tarea creada exitosamente",
      };
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  };

  updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const taskId = req.params["taskId"] as string;
      const dto = req.body as UpdateTaskDto;
      const task = await this.taskService.updateTask(taskId, dto);

      const response: ApiResponse<Task> = { success: true, data: task };
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };

  deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const taskId = req.params["taskId"] as string;
      await this.taskService.deleteTask(taskId);

      const response: ApiResponse = {
        success: true,
        message: "Tarea eliminada exitosamente",
      };
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };
}
