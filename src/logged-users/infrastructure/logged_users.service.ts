import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infrastructure/persistence/database.service';
import { LoggedUsersRepository } from '../domain/logged_users.repository';
import { LoggedUser } from '../domain/logged_user';

@Injectable()
export class LoggedUsersService implements LoggedUsersRepository {
  private readonly logger = new Logger(LoggedUsersService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createLoggedUser(data: LoggedUser): Promise<boolean> {
    this.logger.debug(
      `Executing query: createLoggedUser (${JSON.stringify(data)})`,
    );
    const query = `INSERT INTO auth.logged_users (user_id, ip_request, coordinates, user_creator)
                   VALUES ($1, $2, $3, $4)`;

    try {
      await this.dbService.execute(query, [
        data.userId,
        data.ipRequest,
        data.coordinates,
        data.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createLoggedUser (${JSON.stringify(data)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteLoggedUser(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteLoggedUser (${id})`);
    const query = `UPDATE auth.logged_users
                   SET is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   WHERE id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteLoggedUser (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getLoggedUserById(id: string): Promise<LoggedUser | null> {
    this.logger.debug(`Executing query: getLoggedUserById (${id})`);
    const query = `SELECT id,
                          user_id,
                          ip_request,
                          coordinates,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM auth.logged_users
                   WHERE id = $1
                     and is_delete = false`;
    try {
      const res = await this.dbService.execute(query, [id]);
      this.logger.debug(
        `Executed query getRoleById, result size ${res.rows.length}`,
      );
      if (res.rowCount === 0) return null;
      return LoggedUser.parseQuery(res.rows[0]);
    } catch (error) {
      this.logger.error(
        `Error executing query getLoggedUserById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getLoggedUsers(): Promise<LoggedUser[]> {
    this.logger.debug(`Executing query: getLoggedUsers`);
    const query = `SELECT id,
                          user_id,
                          ip_request,
                          coordinates,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM auth.logged_users
                   WHERE is_delete = false`;
    try {
      const res = await this.dbService.execute(query);
      this.logger.debug(
        `Executed query getLoggedUsers, result size ${res.rows.length}`,
      );
      return res.rows.map((item) => LoggedUser.parseQuery(item));
    } catch (error) {
      this.logger.error(
        `Error executing query getLoggedUsers, error: ${error}`,
      );
      return [];
    }
  }

  public async updateLoggedUser(data: LoggedUser): Promise<boolean> {
    this.logger.debug(
      `Executing query: updateLoggedUser (${JSON.stringify(data)})`,
    );
    const query = `UPDATE auth.logged_users
                   SET user_id      = $2,
                       ip_request   = $3,
                       coordinates  = $4,
                       user_creator = $5,
                       updated_at   = now()
                   WHERE id = $1
                   RETURNING *`;
    try {
      const res = await this.dbService.execute(query, [
        data.id,
        data.userId,
        data.ipRequest,
        data.coordinates,
        data.user_creator,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updateLoggedUser (${JSON.stringify(data)}), error: ${error}`,
      );
      return false;
    }
  }
}
