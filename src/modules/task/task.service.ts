import { TaskRepository } from "./task.repository";
import { Task, CreateTaskDto, UpdateTaskDto } from "./task.model";
import { AppError } from "../../common/middleware/error.middleware";
import { Messages } from "../../common/constants/messages";

export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  async getTasksByUser(userId: string): Promise<Task[]> {
    return this.taskRepo.findAllByUser(userId);
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    return this.taskRepo.create(dto);
  }

  /**
   * Actualiza una tarea existente por su ID.
   * @param taskId ID de la tarea a actualizar
   * @param dto datos para actualizar la tarea
   * @returns Una promesa que se resuelve cuando la tarea ha sido actualizada.
   * @throws AppError si la tarea no existe.

   */
  async updateTask(taskId: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new AppError(Messages.TASK.NOT_FOUND, 404);
    return this.taskRepo.update(taskId, dto);
  }

  /**
   * Elimina una tarea por su ID.
   * @param taskId ID de la tarea a eliminar.
   * @returns Una promesa que se resuelve cuando la tarea ha sido eliminada.
   * @throws AppError si la tarea no existe.
   */
  async deleteTask(taskId: string): Promise<void> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new AppError(Messages.TASK.NOT_FOUND, 404);
    return this.taskRepo.delete(taskId);
  }
}
