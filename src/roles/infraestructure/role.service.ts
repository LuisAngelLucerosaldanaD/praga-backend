import { Inject, Injectable, Logger } from '@nestjs/common';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { Pool } from 'pg';
import { Role } from '../../domain/entities/role.entity';

@Injectable()
export class RoleService implements RoleRepository {
  private readonly logger = new Logger(RoleService.name);

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  public async createRole(role: Role): Promise<boolean> {
    this.logger.debug(`Executing query: createRole (${role})`);
    const query = `INSERT INTO auth.roles (id, name, description, user_creator)
                   VALUES ($1, $2, $3, $4)
                   RETURNING *`;
    try {
      await this.pool.query(query, [
        role.id,
        role.name,
        role.description,
        role.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createRole (${role}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteRole(id: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteRole (${id})`);
    const query = `DELETE
                   FROM auth.roles
                   WHERE id = $1`;
    try {
      const res = await this.pool.query(query, [id]);
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
      const res = await this.pool.query(query, [id]);
      this.logger.debug(
        `Executed query getRoleById, result size ${res.rows.length}`,
      );
      return res.rows[0];
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
      const res = await this.pool.query(query);
      this.logger.debug(
        `Executed query getRoles, result size ${res.rows.length}`,
      );
      return res.rows;
    } catch (error) {
      this.logger.error(`Error executing query getRoles, error: ${error}`);
      return [];
    }
  }

  public async updateRole(role: Role): Promise<boolean> {
    this.logger.debug(`Executing query: updateRole (${role})`);
    const query = `UPDATE auth.roles
                   SET name        = $1,
                       description = $2,
                       updated_at  = now()
                   WHERE id = $3`;
    try {
      const res = await this.pool.query(query, [
        role.name,
        role.description,
        role.id,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updateRole (${role}), error: ${error}`,
      );
      return false;
    }
  }
}
