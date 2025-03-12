import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infrastructure/persistence/database.service';
import { Account, AccountDTO, CredentialsDTO } from './dtos/auth';
import { AuthRepository } from '../domain/auth.repository';

@Injectable()
export class AuthService implements AuthRepository {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async login(cred: CredentialsDTO): Promise<Account | null> {
    this.logger.debug(`Executing query: getUserByUsername (${cred.username})`);
    const query = `SELECT id, role, password, failed_attempts, status, is_block, is_delete
                   FROM auth.users
                   WHERE username = $1`;
    try {
      const result = await this.dbService.execute(query, [cred.username]);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      if (!result.rows.length) return null;
      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `Error executing login (${cred.username}), error: ${error}`,
      );
      return null;
    }
  }

  public async register(acc: AccountDTO): Promise<boolean> {
    this.logger.debug(`Executing query: createUser (${JSON.stringify(acc)})`);
    const query = `INSERT INTO auth.users (id, name, lastname, document, type_document, username, password, email,
                                           cellphone, code, points, status, role, birth_date, user_creator)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                   RETURNING *`;
    try {
      await this.dbService.execute(query, [
        acc.id,
        acc.name,
        acc.lastname,
        acc.document,
        acc.type_document,
        acc.username,
        acc.password,
        acc.email,
        acc.cellphone,
        '',
        0,
        1,
        '75c6240e-538d-4a08-ac07-fc29c082e6dc',
        acc.birth_date,
        '33fbdf41-4e46-4d4d-a30c-c4d9bcccb718',
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createUser (${JSON.stringify(acc)}), error: ${error}`,
      );
      return false;
    }
  }

  public async exists(username: string): Promise<boolean> {
    this.logger.debug(`Executing query: getUserByUsername (${username})`);
    const query = `SELECT id
                   FROM auth.users
                   WHERE username = $1`;
    try {
      const result = await this.dbService.execute(query, [username]);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return !!result.rows.length;
    } catch (error) {
      this.logger.error(
        `Error executing exists (${username}), error: ${error}`,
      );
      return false;
    }
  }
}
