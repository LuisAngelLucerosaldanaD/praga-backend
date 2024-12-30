import { Inject, Injectable, Logger } from '@nestjs/common';
import { EventRepository } from '../domain/event.repository';
import { Pool } from 'pg';
import { Event } from '../domain/event.entity';

@Injectable()
export class EventService implements EventRepository {
  private readonly logger = new Logger(EventService.name);

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  public async createEvent(event: Event): Promise<boolean> {
    this.logger.debug(`Executing query: createEvent (${event})`);
    const query = `insert into cfg.event (id, name, slogan, capacity, start_date, end_date, publication_date, pre_sale_date, free_list_date, user_creator) 
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    try {
      await this.pool.query(query, [
        event.id,
        event.name,
        event.slogan,
        event.capacity,
        event.start_date,
        event.end_date,
        event.publication_date,
        event.pre_sale_date,
        event.free_list_date,
        event.user_creator,
      ]);
      return Promise.resolve(true);
    } catch (error) {
      this.logger.error(
        `Error executing query createEvent (${event}), error: ${error}`,
      );
      return Promise.resolve(false);
    }
  }

  public async deleteEvent(id: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteEvent (${id})`);
    const query = `delete from cfg.event where id = $1`;
    try {
      const res = await this.pool.query(query, [id]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteEvent (${id}), error: ${error}`,
      );
      return Promise.resolve(false);
    }
  }

  public async getEventById(id: string): Promise<Event | null> {
    this.logger.debug(`Executing query: getEventById (${id})`);
    const query = `select id, name, slogan, capacity, start_date, end_date, publication_date, pre_sale_date, free_list_date, created_at, updated_at, deleted_at, is_deleted, user_creator, user_deleter from cfg.event where id = $1`;
    try {
      const result = await this.pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `Error executing query getEventById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getEvents(): Promise<Event[]> {
    return Promise.resolve([]);
  }

  public async updateEvent(event: Event): Promise<boolean> {
    return Promise.resolve(false);
  }
}
