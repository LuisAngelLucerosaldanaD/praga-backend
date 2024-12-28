import { Inject, Injectable, Logger } from '@nestjs/common';
import { DictionaryRepository } from '../../../domain/repositories/dictionary.repository';
import { Pool } from 'pg';
import { Dictionary } from '../../../domain/entities/dictionary.entity';

@Injectable()
export class DictionaryService implements DictionaryRepository {
  private readonly logger = new Logger(DictionaryService.name);

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  public async getDictionaries(): Promise<Dictionary[]> {
    this.logger.debug(`Executing query: getDictionary`);
    const query = `SELECT * FROM cfg.dictionary`;
    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      this.logger.error(`Error executing query getDictionary, error: ${error}`);
      return null;
    }
  }

  public async getDictionaryById(id: string): Promise<Dictionary | null> {
    this.logger.debug(`Executing query: getDictionaryById (${id})`);
    const query = `SELECT * FROM cfg.dictionary WHERE id = $1`;
    try {
      const result = await this.pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `Error executing query getDictionaryById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async createDictionary(dic: Dictionary): Promise<boolean> {
    this.logger.debug(`Executing query: createDictionary (${dic})`);
    const query = `INSERT INTO cfg.dictionary (id, name, description, value, user_creator)
                   VALUES ($1, $2, $3, $4, $5)`;
    try {
      await this.pool.query(query, [
        dic.id,
        dic.name,
        dic.description,
        dic.value,
        dic.user_creator,
      ]);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.error(
        `Error executing query createDictionary (${dic}), error: ${error}`,
      );
      return Promise.resolve(false);
    }
  }

  public async deleteDictionary(id: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteDictionary (${id})`);
    const query = `DELETE FROM cfg.dictionary WHERE id = $1`;
    try {
      const res = await this.pool.query(query, [id]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteDictionary (${id}), error: ${error}`,
      );
      return Promise.resolve(false);
    }
  }

  public async updateDictionary(dic: Dictionary): Promise<boolean> {
    this.logger.debug(`Executing query: updateDictionary (${dic})`);
    const query = `UPDATE cfg.dictionary
                   SET name = $2,
                       description = $3,
                       value = $4,
                       user_creator = $5,
                       updated_at = now()
                   WHERE id = $1`;
    try {
      await this.pool.query(query, [
        dic.id,
        dic.name,
        dic.description,
        dic.value,
        dic.user_creator,
      ]);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.error(
        `Error executing query updateDictionary (${dic}), error: ${error}`,
      );
      return Promise.resolve(false);
    }
  }
}
