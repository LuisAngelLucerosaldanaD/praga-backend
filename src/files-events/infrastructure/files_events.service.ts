import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infrastructure/persistence/database.service';
import { FilesEventsRepository } from '../domain/files_events.repository';
import { FilesEvent } from '../domain/files_event';

@Injectable()
export class FilesEventsService implements FilesEventsRepository {
  private readonly logger = new Logger(FilesEventsService.name);

  constructor(private readonly dbService: DatabaseService) { }

  public async createFilesEvent(data: FilesEvent): Promise<boolean> {
    this.logger.debug(
      `Executing query: createFilesEvent (${JSON.stringify(data)})`,
    );
    const query = `INSERT INTO config.files_events (id, type_id, event_id, file_id, user_creator)
                   VALUES ($1, $2, $3, $4, $5)`;

    try {
      await this.dbService.execute(query, [
        data.id,
        data.typeId,
        data.eventId,
        data.fileId,
        data.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createFilesEvent (${JSON.stringify(data)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteFilesEvent(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteFilesEvent (${id})`);
    const query = `UPDATE config.files_events
                   SET is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   WHERE id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteFilesEvent (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getFilesEventById(id: string): Promise<FilesEvent | null> {
    this.logger.debug(`Executing query: getFilesEventById (${id})`);
    const query = `SELECT id,
                          type_id,
                          event_id,
                          file_id,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.files_events
                   WHERE id = $1
                     and is_delete = false`;
    try {
      const res = await this.dbService.execute(query, [id]);
      this.logger.debug(
        `Executed query getRoleById, result size ${res.rows.length}`,
      );
      if (res.rowCount === 0) return null;
      return FilesEvent.parseQuery(res.rows[0]);
    } catch (error) {
      this.logger.error(
        `Error executing query getFilesEventById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getFilesEvents(): Promise<FilesEvent[]> {
    this.logger.debug(`Executing query: getFilesEvents`);
    const query = `SELECT id,
                          type_id,
                          event_id,
                          file_id,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.files_events
                   WHERE is_delete = false`;
    try {
      const res = await this.dbService.execute(query);
      this.logger.debug(
        `Executed query getFilesEvents, result size ${res.rows.length}`,
      );
      return res.rows.map((item) => FilesEvent.parseQuery(item));
    } catch (error) {
      this.logger.error(
        `Error executing query getFilesEvents, error: ${error}`,
      );
      return [];
    }
  }

  public async updateFilesEvent(data: FilesEvent): Promise<boolean> {
    this.logger.debug(
      `Executing query: updateFilesEvent (${JSON.stringify(data)})`,
    );
    const query = `UPDATE config.files_events
                   SET type_id      = $2,
                       event_id     = $3,
                       file_id      = $4,
                       user_creator = $5,
                       updated_at   = now()
                   WHERE id = $1
                   RETURNING *`;
    try {
      const res = await this.dbService.execute(query, [
        data.id,
        data.typeId,
        data.eventId,
        data.fileId,
        data.user_creator,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updateFilesEvent (${JSON.stringify(data)}), error: ${error}`,
      );
      return false;
    }
  }

  public async getFilesEventsByEventId(eventId: string): Promise<FilesEvent[]> {
    this.logger.debug(`Executing query: getFilesEventsByEventId (${eventId})`);
    const query = `SELECT id,
                          type_id,
                          event_id,
                          file_id,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.files_events
                   WHERE event_id = $1
                     and is_delete = false`;
    try {
      const res = await this.dbService.execute(query, [eventId]);
      this.logger.debug(
        `Executed query getFilesEventsByEventId, result size ${res.rows.length}`,
      );
      return res.rows.map((item) => FilesEvent.parseQuery(item));
    } catch (error) {
      this.logger.error(
        `Error executing query getFilesEventsByEventId (${eventId}), error: ${error}`,
      );
      return [];
    }
  }
}
