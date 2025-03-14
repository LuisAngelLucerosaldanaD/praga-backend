import { Injectable, Logger } from '@nestjs/common';
import { RolesRepository } from '../domain/roles.repository';
import { Role } from '../domain/role';
import { DatabaseService } from '../../shared/infrastructure/persistence/database.service';

@Injectable()
export class RoleService implements RolesRepository {
  private readonly logger = new Logger(RoleService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createRole(role: Role): Promise<boolean> {
    this.logger.debug(`Executing query: createRole (${JSON.stringify(role)})`);
    const query = `INSERT INTO auth.roles (id, name, description, user_creator)
                   VALUES ($1, $2, $3, $4)
                   RETURNING *`;
    try {
      await this.dbService.execute(query, [
        role.id,
        role.name,
        role.description,
        role.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createRole (${JSON.stringify(role)}), error: ${error}`,
      );
      return false;
    }
  }

  public async updateRole(role: Role): Promise<boolean> {
    this.logger.debug(`Executing query: updateRole (${JSON.stringify(role)})`);
    const query = `UPDATE auth.roles
                   SET name        = $1,
                       description = $2,
                       updated_at  = now()
                   WHERE id = $3`;
    try {
      const res = await this.dbService.execute(query, [
        role.name,
        role.description,
        role.id,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updateRole (${JSON.stringify(role)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteRole(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteRole (${id})`);
    const query = `UPDATE auth.roles
                   set is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   where id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteRole (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getRoleById(id: string): Promise<Role | null> {
    this.logger.debug(`Executing query: getRoleById (${id})`);
    const query = `SELECT id,
                          name,
                          description,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator,
                          user_deleter
                   from auth.roles
                   WHERE id = $1`;

    try {
      const res = await this.dbService.execute(query, [id]);
      this.logger.debug(
        `Executed query getRoleById, result size ${res.rows.length}`,
      );
      if (res.rowCount === 0) return null;
      return Role.parseQuery(res.rows[0]);
    } catch (error) {
      this.logger.error(
        `Error executing query getRoleById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getRoles(): Promise<Role[]> {
    this.logger.debug(`Executing query: getRoles`);
    const query = `SELECT id,
                          name,
                          description,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator,
                          user_deleter
                   from auth.roles`;
    try {
      const res = await this.dbService.execute(query);
      this.logger.debug(
        `Executed query getRoles, result size ${res.rows.length}`,
      );
      return res.rows.map((item) => Role.parseQuery(item));
    } catch (error) {
      this.logger.error(`Error executing query getRoles, error: ${error}`);
      return [];
    }
  }
}
