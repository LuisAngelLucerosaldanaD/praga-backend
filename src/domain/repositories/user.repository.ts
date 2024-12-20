import { IUser } from '../entities/user.entity';

export interface UserRepository {
  createUser(user: IUser): Promise<IUser | null>;

  updateUser(user: IUser): Promise<IUser | null>;

  deleteUser(id: string): Promise<boolean>;

  getUserById(id: string): Promise<IUser | null>;

  getUserByUsername(username: string): Promise<IUser | null>;

  getUsers(): Promise<IUser[]>;
}
