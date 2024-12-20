import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class UserRepositoryService implements UserRepository {
  private readonly logger = new Logger(UserRepositoryService.name);

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  public async createUser(user: User): Promise<User | null> {
    this.logger.debug(`Executing query: createUser (${user})`);
    const query = `INSERT INTO auth.users (id,name,lastname,document,type_document,username,password,email,cellphone,code,points,status,
       role,birth_date,picture,block_date, created_at,updated_at,deleted_at,is_deleted,user_creator,user_deleter) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *`;
    try {
      const result = await this.pool.query(query, [
        user.id,
        user.name,
        user.lastname,
        user.document,
        user.type_document,
        user.username,
        user.password,
        user.email,
        user.cellphone,
        user.code,
        user.points,
        user.status,
        user.role,
        user.birth_date,
        user.picture,
        user.block_date,
        user.created_at,
        user.updated_at,
        user.deleted_at,
        user.is_deleted,
        user.user_creator,
        user.user_deleter,
      ]);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return result.rows[0] as User;
    } catch (error) {
      this.logger.error(
        `Error executing query createUser (${user}), error: ${error}`,
      );
      return null;
    }
  }

  public async updateUser(user: User): Promise<User | null> {
    this.logger.debug(`Executing query: updateUser (${user})`);
    const query = `UPDATE auth.users SET name=$2,lastname=$3,document=$4,type_document=$5,username=$6,password=$7,email=$8,cellphone=$9,code=$10,points=$11,status=$12,
       role=$13,birth_date=$14,picture=$15,block_date=$16, created_at=$17,updated_at=now(),deleted_at=$18,is_deleted=$19,user_creator=$20,user_deleter=$21 
       WHERE id = $1 RETURNING *`;
    try {
      const result = await this.pool.query(query, [
        user.id,
        user.name,
        user.lastname,
        user.document,
        user.type_document,
        user.username,
        user.password,
        user.email,
        user.cellphone,
        user.code,
        user.points,
        user.status,
        user.role,
        user.birth_date,
        user.picture,
        user.block_date,
        user.created_at,
        user.deleted_at,
        user.is_deleted,
        user.user_creator,
        user.user_deleter,
      ]);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return result.rows[0] as User;
    } catch (error) {
      this.logger.error(
        `Error executing query updateUser (${user}), error: ${error}`,
      );
      return null;
    }
  }

  public async deleteUser(id: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteUser (${id})`);
    const query = `DELETE FROM auth.users WHERE id = $1`;
    try {
      await this.pool.query(query, [id]);
      this.logger.debug(`Executed query`);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteUser (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getUserById(id: string): Promise<User | null> {
    this.logger.debug(`Executing query: getUserById (${id})`);
    const query = `SELECT id,name,lastname,document,type_document,username,password,email,cellphone,code,points,status,
       role,birth_date,picture,block_date, created_at,updated_at,deleted_at,is_deleted,user_creator,user_deleter 
       FROM auth.users WHERE id = $1`;
    try {
      const result = await this.pool.query(query, [id]);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return result.rows[0] as User;
    } catch (error) {
      this.logger.error(
        `Error executing query getUserById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    this.logger.debug(`Executing query: getUserByUsername (${username})`);
    const query = `SELECT id,name,lastname,document,type_document,username,password,email,cellphone,code,points,status,
       role,birth_date,picture,block_date, created_at,updated_at,deleted_at,is_deleted,user_creator,user_deleter 
       FROM auth.users WHERE username = $1`;
    try {
      const result = await this.pool.query(query, [username]);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return result.rows[0] as User;
    } catch (error) {
      this.logger.error(
        `Error executing query getUserByUsername (${username}), error: ${error}`,
      );
      return null;
    }
  }

  public async getUsers(): Promise<User[]> {
    this.logger.debug(`Executing query: getUsers`);
    const query = `SELECT id,name,lastname,document,type_document,username,password,email,cellphone,code,points,status,
       role,birth_date,picture,block_date, created_at,updated_at,deleted_at,is_deleted,user_creator,user_deleter 
       FROM auth.users`;
    try {
      const result = await this.pool.query(query);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return result.rows as User[];
    } catch (error) {
      this.logger.error(`Error executing query getUsers, error: ${error}`);
      return [];
    }
  }
}
