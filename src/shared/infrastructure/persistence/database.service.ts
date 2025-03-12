import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  public async execute(
    query: string,
    values: any[] = [],
  ): Promise<QueryResult> {
    this.logger.debug(`Executing query: ${query} (${values})`);
    try {
      const result: QueryResult = await this.pool.query(query, values);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      return result;
    } catch (error) {
      this.logger.error(`Error executing query: ${error}`);
      throw error;
    }
  }
}
