import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';
import { Account, AccountDTO, CredentialsDTO } from './dtos/auth';
import { AuthRepository } from '../domain/auth.repository';
import { v4 } from 'uuid';

@Injectable()
export class AuthService implements AuthRepository {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async login(cred: CredentialsDTO): Promise<Account | null> {
    this.logger.debug(`Executing query: getUserByUsername (${cred.username})`);
    const query = `SELECT id, role, password, status, is_block, is_delete
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
        v4(),
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
        '9baecaa4-257e-453d-adb3-75d43f790756',
        acc.birth_date,
        '6591784f-dce3-441c-8537-66c0b1e0bda6',
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createUser (${JSON.stringify(acc)}), error: ${error}`,
      );
      return false;
    }
  }
}
