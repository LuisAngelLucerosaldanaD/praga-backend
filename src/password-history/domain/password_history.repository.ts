import { PasswordHistory } from './password_history';

export abstract class PasswordHistoryRepository {
  abstract createPasswordHistory(pwd: PasswordHistory): Promise<boolean>;

  abstract updatePasswordHistory(pwd: PasswordHistory): Promise<boolean>;

  abstract deletePasswordHistory(id: number, user: string): Promise<boolean>;

  abstract getPasswordHistoryById(id: number): Promise<PasswordHistory | null>;

  abstract getPasswordsHistory(): Promise<PasswordHistory[]>;
}
