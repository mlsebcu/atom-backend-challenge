import { TaskRepository } from "./task.repository";
import { Task, CreateTaskDto, UpdateTaskDto } from "./task.model";
import { AppError } from "../../common/middleware/error.middleware";

export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskRepo.findAllByUser(userId);
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    return this.taskRepo.create(dto);
  }

  async updateTask(taskId: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new AppError("Tarea no encontrada", 404);
    return this.taskRepo.update(taskId, dto);
  }

  async deleteTask(taskId: string): Promise<void> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new AppError("Tarea no encontrada", 404);
    return this.taskRepo.delete(taskId);
  }
}
