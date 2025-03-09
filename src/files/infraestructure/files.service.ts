import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';
import { FilesRepository } from '../domain/files.repository';
import { File } from '../domain/file';

@Injectable()
export class FilesService implements FilesRepository {
  private readonly logger = new Logger(FilesService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createFile(file: File): Promise<boolean> {
    this.logger.debug(`Executing query: createFile (${JSON.stringify(file)})`);
    const query = `INSERT INTO config.files (id, name, path, format, hash, size, user_creator)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    try {
      await this.dbService.execute(query, [
        file.id,
        file.name,
        file.path,
        file.format,
        file.hash,
        file.size,
        file.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createFile (${JSON.stringify(file)}), error: ${error}`,
      );
      return false;
    }
  }

  public async updateFile(file: File): Promise<boolean> {
    this.logger.debug(`Executing query: updateFile (${file})`);
    const query = `UPDATE config.files
                   SET name=$2,
                       path=$3,
                       format=$4,
                       hash=$5,
                       size=$6,
                       updated_at=now()
                   WHERE id = $1`;
    try {
      await this.dbService.execute(query, [
        file.id,
        file.name,
        file.path,
        file.format,
        file.hash,
        file.size,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query updateFile (${JSON.stringify(file)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteFile(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteFile (${id})`);
    const query = `UPDATE config.files
                   SET deleted_at   = now(),
                       user_deleter = $2
                   WHERE id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteFile (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getFileById(id: string): Promise<File | null> {
    this.logger.debug(`Executing query: getFileById (${id})`);
    const query = `SELECT id, name, path, format, hash, size, user_creator
                   FROM config.files
                   WHERE id = $1
                     and deleted_at is not null`;
    try {
      const result = await this.dbService.execute(query, [id]);
      if (result.rowCount === 0) return null;
      return File.parseQuery(result.rows[0]);
    } catch (error) {
      this.logger.error(
        `Error executing query getFileById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getFiles(): Promise<File[]> {
    this.logger.debug(`Executing query: getFiles`);
    const query = `SELECT id, name, path, format, hash, size, user_creator
                   FROM config.files
                   WHERE deleted_at is not null`;
    try {
      const result = await this.dbService.execute(query);
      return result.rows.map((row) => File.parseQuery(row));
    } catch (error) {
      this.logger.error(`Error executing query getFiles, error: ${error}`);
      return [];
    }
  }
}
