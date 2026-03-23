import { UserRepository } from "./user.repository";
import { User } from "./user.model";
import { AppError } from "../../common/middleware/error.middleware";
import { Messages } from "../../common/constants/messages";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  /**
   * Busca un usuario por su correo electrónico.
   * @param email correo electrónico del usuario a buscar
   * @returns el usuario encontrado o null si no existe
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  /**
   * Crea un nuevo usuario con el correo electrónico proporcionado.
   * Verifica si ya existe un usuario con el mismo correo electrónico y lanza un error si es así.
   * @param email correo electrónico del nuevo usuario
   * @returns el usuario creado
   * @throws AppError si ya existe un usuario con el mismo correo electrónico
   */
  async createUser(email: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);

    if (existing) {
      throw new AppError(Messages.USER.ALREADY_EXISTS, 409);
    }

    return this.userRepo.create({ email });
  }
}
