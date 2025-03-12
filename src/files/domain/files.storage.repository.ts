import { FileStorage } from './file';
import { S3 } from 'aws-sdk';

export abstract class FilesStorageRepository {
  abstract upload(file: FileStorage): Promise<S3.ManagedUpload.SendData | null>;
  abstract delete(key: string): Promise<boolean>;
}
