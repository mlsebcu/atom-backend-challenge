import { UserRepository } from "./user.repository";
import { User } from "./user.model";
import { AppError } from "../../common/middleware/error.middleware";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async createUser(email: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);

    if (existing) {
      throw new AppError("Usuario ya existe", 409);
    }

    return this.userRepo.create({ email });
  }
}
