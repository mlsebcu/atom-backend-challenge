export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface CreateUserDto {
  email: string;
}