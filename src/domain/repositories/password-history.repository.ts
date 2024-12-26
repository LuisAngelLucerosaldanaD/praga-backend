import { PasswordHistory } from '../entities/password-history.entity';

export interface PasswordHistoryRepository {
  createPasswordHistory(pwd: PasswordHistory): Promise<boolean>;

  updatePasswordHistory(pwd: PasswordHistory): Promise<boolean>;

  deletePasswordHistory(id: string): Promise<boolean>;

  getPasswordHistoryById(id: string): Promise<PasswordHistory | null>;

  getPasswordHistories(): Promise<PasswordHistory[]>;
}
