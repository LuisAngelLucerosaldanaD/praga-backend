import { File } from './file';

export abstract class FilesRepository {
  abstract createFile(file: File): Promise<boolean>;

  abstract updateFile(file: File): Promise<boolean>;

  abstract deleteFile(id: string, user: string): Promise<boolean>;

  abstract getFileById(id: string): Promise<File | null>;

  abstract getFiles(): Promise<File[]>;

  abstract getFilesByEventId(eventId: string): Promise<File[]>;
}
