import FirebaseApp from "../../config/firebase";
import { Task, CreateTaskDto, UpdateTaskDto } from "./task.model";

export class TaskRepository {
  private readonly col = FirebaseApp.getFirestore().collection("tasks");

  async findAllByUser(userId: string): Promise<Task[]> {
    const snap = await this.col
      .where("userId", "==", userId)
      .orderBy("createdAt", "asc")
      .get();

    return snap.docs.map((doc) => this.toEntity(doc.id, doc.data()));
  }

  async findById(taskId: string): Promise<Task | null> {
    const doc = await this.col.doc(taskId).get();
    if (!doc.exists) return null;
    return this.toEntity(doc.id, doc.data()!);
  }

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

  async update(taskId: string, dto: UpdateTaskDto): Promise<Task> {
    const ref = this.col.doc(taskId);
    const updatedAt = new Date();

    await ref.update({ ...dto, updatedAt });

    const updated = await ref.get();
    return this.toEntity(updated.id, updated.data()!);
  }

  async delete(taskId: string): Promise<void> {
    await this.col.doc(taskId).delete();
  }

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
