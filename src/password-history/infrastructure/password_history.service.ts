import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infrastructure/persistence/database.service';
import { PasswordHistoryRepository } from '../domain/password_history.repository';
import { PasswordHistory } from '../domain/password_history';

@Injectable()
export class PasswordHistoryService implements PasswordHistoryRepository {
  private readonly logger = new Logger(PasswordHistoryService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createPasswordHistory(data: PasswordHistory): Promise<boolean> {
    this.logger.debug(
      `Executing query: createPasswordHistory (${JSON.stringify(data)})`,
    );
    const query = `INSERT INTO auth.password_history (user_id, password, user_creator)
                   VALUES ($1, $2, $3) returning *;`;

    try {
      await this.dbService.execute(query, [
        data.user_id,
        data.password,
        data.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createPasswordHistory (${JSON.stringify(data)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deletePasswordHistory(
    id: number,
    user: string,
  ): Promise<boolean> {
    this.logger.debug(`Executing query: deletePasswordHistory (${id})`);
    const query = `UPDATE auth.password_history
                   SET is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   WHERE id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deletePasswordHistory (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getPasswordHistoryById(
    id: number,
  ): Promise<PasswordHistory | null> {
    this.logger.debug(`Executing query: getPasswordHistoryById (${id})`);
    const query = `SELECT id,
                          user_id,
                          password,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM auth.password_history
                   WHERE id = $1
                     and is_delete = false`;
    try {
      const res = await this.dbService.execute(query, [id]);
      this.logger.debug(
        `Executed query getRoleById, result size ${res.rows.length}`,
      );
      if (res.rowCount === 0) return null;
      return PasswordHistory.parseQuery(res.rows[0]);
    } catch (error) {
      this.logger.error(
        `Error executing query getPasswordHistoryById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getPasswordsHistory(): Promise<PasswordHistory[]> {
    this.logger.debug(`Executing query: getPasswordHistorys`);
    const query = `SELECT id,
                          user_id,
                          password,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM auth.password_history
                   WHERE is_delete = false`;
    try {
      const res = await this.dbService.execute(query);
      this.logger.debug(
        `Executed query getPasswordHistorys, result size ${res.rows.length}`,
      );
      return res.rows.map((item) => PasswordHistory.parseQuery(item));
    } catch (error) {
      this.logger.error(
        `Error executing query getPasswordHistorys, error: ${error}`,
      );
      return [];
    }
  }

  public async updatePasswordHistory(data: PasswordHistory): Promise<boolean> {
    this.logger.debug(
      `Executing query: updatePasswordHistory (${JSON.stringify(data)})`,
    );
    const query = `UPDATE auth.password_history
                   SET user_id      = $2,
                       password     = $3,
                       user_creator = $4,
                       updated_at   = now()
                   WHERE id = $1
                   RETURNING *`;
    try {
      const res = await this.dbService.execute(query, [
        data.id,
        data.user_id,
        data.password,
        data.user_creator,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updatePasswordHistory (${JSON.stringify(data)}), error: ${error}`,
      );
      return false;
    }
  }
}
