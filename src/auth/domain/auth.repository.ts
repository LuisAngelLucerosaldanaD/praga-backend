import {
  Account,
  AccountDTO,
  CredentialsDTO,
} from '../infraestructure/dtos/auth';

export abstract class AuthRepository {
  abstract login(credentials: CredentialsDTO): Promise<Account | null>;

  abstract register(dto: AccountDTO): Promise<boolean>;
}
