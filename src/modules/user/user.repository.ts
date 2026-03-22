import FirebaseApp from "../../config/firebase";
import { User, CreateUserDto } from "./user.model";

export class UserRepository {
  private readonly col = FirebaseApp.getFirestore().collection("users");

  /**
   * Busca un usuario por su correo electrónico directamente con Firestore.
   * @param email correo electrónico del usuario a buscar
   * @returns el usuario encontrado o null si no existe
   */
  async findByEmail(email: string): Promise<User | null> {
    const snap = await this.col.where("email", "==", email).limit(1).get();

    if (snap.empty) return null;

    const doc = snap.docs[0];
    if (!doc) return null;

    return this.toEntity(doc.id, doc.data());
  }

  /**
   * Crea un nuevo usuario en Firestore con el correo electrónico proporcionado.
   * @param email correo electrónico del nuevo usuario
   * @param dto Estructura de datos para crear un nuevo usuario, que incluye el correo electrónico.
   * @returns el usuario creado
   */
  async create(dto: CreateUserDto): Promise<User> {
    const ref = this.col.doc();
    const now = new Date();
    const data = { email: dto.email, createdAt: now };

    await ref.set(data);

    return { id: ref.id, ...data };
  }

  /**
   * Convierte un documento de Firestore en una entidad User.
   * @param id ID del documento
   * @param data Datos del documento
   * @returns La entidad User correspondiente
   */
  private toEntity(id: string, data: FirebaseFirestore.DocumentData): User {
    return {
      id,
      email: data["email"] as string,
      createdAt: data["createdAt"]?.toDate?.() ?? new Date(data["createdAt"]),
    };
  }
}
