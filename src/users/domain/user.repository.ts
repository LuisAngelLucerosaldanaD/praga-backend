import { User } from './user';

export interface UserRepository {
  createUser(user: User): Promise<boolean>;

  updateUser(user: User): Promise<User | null>;

  deleteUser(id: string): Promise<boolean>;

  getUserById(id: string): Promise<User | null>;

  getUserByUsername(username: string): Promise<User | null>;

  getUsers(): Promise<User[]>;
}
