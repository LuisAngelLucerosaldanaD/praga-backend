import { Injectable, Logger } from '@nestjs/common';
import { EventRepository } from '../domain/event.repository';
import { Event } from '../domain/event';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';

@Injectable()
export class EventsService implements EventRepository {
  private readonly logger = new Logger(EventsService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createEvent(event: Event): Promise<boolean> {
    this.logger.debug(
      `Executing query: createEvent (${JSON.stringify(event)})`,
    );
    const query = `insert into config.events (id, name, slogan, capacity, start_date, end_date, publication_date,
                                              pre_sale_date, free_list_date, user_creator)
                   values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    try {
      await this.dbService.execute(query, [
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
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createEvent (${JSON.stringify(event)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteEvent(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteEvent (${id})`);
    const query = `update config.events
                   set is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   where id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteEvent (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getEventById(id: string): Promise<Event | null> {
    this.logger.debug(`Executing query: getEventById (${id})`);
    const query = `select id,
                          name,
                          slogan,
                          capacity,
                          start_date,
                          end_date,
                          publication_date,
                          pre_sale_date,
                          free_list_date,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator,
                          user_deleter
                   from config.events
                   where id = $1
                     and is_delete = false`;
    try {
      const result = await this.dbService.execute(query, [id]);
      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `Error executing query getEventById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getEvents(): Promise<Event[]> {
    this.logger.debug(`Executing query: getEvents`);
    const query = `select id,
                          name,
                          slogan,
                          capacity,
                          start_date,
                          end_date,
                          publication_date,
                          pre_sale_date,
                          free_list_date,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator,
                          user_deleter
                   from config.events
                   where is_delete = false`;
    try {
      const result = await this.dbService.execute(query);
      return result.rows;
    } catch (error) {
      this.logger.error(`Error executing query getEvents, error: ${error}`);
      return [];
    }
  }

  public async updateEvent(event: Event): Promise<boolean> {
    this.logger.debug(
      `Executing query: updateEvent (${JSON.stringify(event)})`,
    );
    const query = `update config.events
                   set name             = $2,
                       slogan           = $3,
                       capacity         = $4,
                       start_date       = $5,
                       end_date         = $6,
                       publication_date = $7,
                       pre_sale_date    = $8,
                       free_list_date   = $9,
                       updated_at       = now()
                   where id = $1`;
    try {
      const res = await this.dbService.execute(query, [
        event.id,
        event.name,
        event.slogan,
        event.capacity,
        event.start_date,
        event.end_date,
        event.publication_date,
        event.pre_sale_date,
        event.free_list_date,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updateEvent (${JSON.stringify(event)}), error: ${error}`,
      );
      return false;
    }
  }
}
