import { LoggedUser } from '../entities/logged-user.entity';

export interface LoggedUserRepository {
  createLoggedUser(LoggedUser: LoggedUser): Promise<boolean>;

  updateLoggedUser(LoggedUser: LoggedUser): Promise<boolean>;

  deleteLoggedUser(id: string): Promise<boolean>;

  getLoggedUserById(id: string): Promise<LoggedUser | null>;

  getLoggedUsers(): Promise<LoggedUser[]>;
}
