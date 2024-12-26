import { File } from '../entities/file.entity';

export interface FileRepository {
  createFile(file: File): Promise<boolean>;

  updateFile(file: File): Promise<boolean>;

  deleteFile(id: string): Promise<boolean>;

  getFileById(id: string): Promise<File | null>;

  getFiles(): Promise<File[]>;
}
