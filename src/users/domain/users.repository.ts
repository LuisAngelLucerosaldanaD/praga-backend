import { User } from './user';

export abstract class UsersRepository {
  abstract createUser(user: User): Promise<boolean>;

  abstract updateUser(user: User): Promise<boolean>;

  abstract deleteUser(id: string, user: string): Promise<boolean>;

  abstract getUserById(id: string): Promise<User | null>;

  abstract getUserByUsername(username: string): Promise<User | null>;

  abstract getUsers(): Promise<User[]>;
}
