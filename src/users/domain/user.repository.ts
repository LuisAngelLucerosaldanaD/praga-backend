import { User } from './user';

export interface UserRepository {
  createUser(user: User): Promise<boolean>;

  updateUser(user: User): Promise<boolean>;

  deleteUser(id: string, user: string): Promise<boolean>;

  getUserById(id: string): Promise<User | null>;

  getUserByUsername(username: string): Promise<User | null>;

  getUsers(): Promise<User[]>;
}
