import { FilesEvent } from './files_event';

export abstract class FilesEventsRepository {
  abstract createFilesEvent(data: FilesEvent): Promise<boolean>;

  abstract updateFilesEvent(data: FilesEvent): Promise<boolean>;

  abstract deleteFilesEvent(id: string, user: string): Promise<boolean>;

  abstract getFilesEventById(id: string): Promise<FilesEvent | null>;

  abstract getFilesEvents(): Promise<FilesEvent[]>;

  abstract getFilesEventsByEventId(eventId: string): Promise<FilesEvent[]>;
}
