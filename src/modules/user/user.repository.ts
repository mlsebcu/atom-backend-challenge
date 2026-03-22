import FirebaseApp from "../../config/firebase";
import { User, CreateUserDto } from "./user.model";

export class UserRepository {
  private readonly col = FirebaseApp.getFirestore().collection("users");

  async findByEmail(email: string): Promise<User | null> {
    const snap = await this.col.where("email", "==", email).limit(1).get();

    if (snap.empty) return null;

    const doc = snap.docs[0];
    if (!doc) return null;

    return this.toEntity(doc.id, doc.data());
  }

  async create(dto: CreateUserDto): Promise<User> {
    const ref = this.col.doc();
    const now = new Date();
    const data = { email: dto.email, createdAt: now };

    await ref.set(data);

    return { id: ref.id, ...data };
  }

  private toEntity(id: string, data: FirebaseFirestore.DocumentData): User {
    return {
      id,
      email: data["email"] as string,
      createdAt: data["createdAt"]?.toDate?.() ?? new Date(data["createdAt"]),
    };
  }
}
