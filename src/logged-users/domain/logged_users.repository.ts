import { LoggedUser } from './logged_user';

export abstract class LoggedUsersRepository {
  abstract createLoggedUser(logged_user: LoggedUser): Promise<boolean>;

  abstract updateLoggedUser(logged_user: LoggedUser): Promise<boolean>;

  abstract deleteLoggedUser(id: string, user: string): Promise<boolean>;

  abstract getLoggedUserById(id: string): Promise<LoggedUser | null>;

  abstract getLoggedUsers(): Promise<LoggedUser[]>;
}
