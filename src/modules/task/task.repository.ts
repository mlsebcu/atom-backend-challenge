import FirebaseApp from "../../config/firebase";
import { Task, CreateTaskDto, UpdateTaskDto } from "./task.model";

export class TaskRepository {
  private readonly col = FirebaseApp.getFirestore().collection("tasks");

  /**
   * Busca todas las tareas asociadas a un usuario desde Firestore.
   * @param userId ID del usuario
   * @returns Un array de tareas encontradas
   */
  async findAllByUser(userId: string): Promise<Task[]> {
    const snap = await this.col
      .where("userId", "==", userId)
      .orderBy("createdAt", "asc")
      .get();

    return snap.docs.map((doc) => this.toEntity(doc.id, doc.data()));
  }

  /**
   * Busca una tarea por su ID desde Firestore.
   * @param taskId ID de la tarea a buscar
   * @returns La tarea encontrada o null si no existe
   */
  async findById(taskId: string): Promise<Task | null> {
    const doc = await this.col.doc(taskId).get();
    if (!doc.exists) return null;
    return this.toEntity(doc.id, doc.data()!);
  }

  /**
   * Crea una nueva tarea en Firestore con los datos proporcionados.
   * @param dto estructura de datos para crear una nueva tarea.
   * @returns La tarea creada
   */
  async create(dto: CreateTaskDto): Promise<Task> {
    const ref = this.col.doc();
    const now = new Date();
    const data = {
      ...dto,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    await ref.set(data);
    return { id: ref.id, ...data } as Task;
  }

  /**
   * Actualiza una tarea en Firestore con los datos proporcionadoss
   * @param taskId ID de la tarea a actualizar
   * @param dto Estructura de datos para actualizar la tarea
   * @returns La tarea actualizada
   */
  async update(taskId: string, dto: UpdateTaskDto): Promise<Task> {
    const ref = this.col.doc(taskId);
    const updatedAt = new Date();

    await ref.update({ ...dto, updatedAt });

    const updated = await ref.get();
    return this.toEntity(updated.id, updated.data()!);
  }

  /**
   * Elimina una tarea de Firestore por su ID.
   * @param taskId ID de la tarea a eliminar.
   */
  async delete(taskId: string): Promise<void> {
    await this.col.doc(taskId).delete();
  }

  /**
   * Convierte un documento de Firestore en una entidad Task.
   * @param id ID del documento
   * @param data Datos del documento
   * @returns La entidad Task correspondiente
   */
  private toEntity(id: string, data: FirebaseFirestore.DocumentData): Task {
    return {
      id,
      userId: data["userId"] as string,
      title: data["title"] as string,
      description: data["description"] as string,
      status: data["status"] as Task["status"],
      createdAt: data["createdAt"]?.toDate?.() ?? new Date(data["createdAt"]),
      updatedAt: data["updatedAt"]?.toDate?.() ?? new Date(data["updatedAt"]),
    };
  }
}
