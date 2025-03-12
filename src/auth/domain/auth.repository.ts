import {
  Account,
  AccountDTO,
  CredentialsDTO,
} from '../infrastructure/dtos/auth';

export abstract class AuthRepository {
  abstract login(credentials: CredentialsDTO): Promise<Account | null>;

  abstract register(dto: AccountDTO): Promise<boolean>;

  abstract exists(username: string): Promise<boolean>;
}
