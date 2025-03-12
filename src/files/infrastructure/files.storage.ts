import { Injectable, Logger } from '@nestjs/common';
import { FilesStorageRepository } from '../domain/files.storage.repository';
import { FileStorage } from '../domain/file';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class FilesStorage implements FilesStorageRepository {
  private readonly logger = new Logger(FilesStorage.name);
  private readonly s3: AWS.S3;

  constructor(private readonly _configService: ConfigService) {
    AWS.config.update({
      credentials: {
        accessKeyId: this._configService.getOrThrow('S3_ACCESS_KEY_ID'),
        secretAccessKey: this._configService.getOrThrow('S3_SECRET_ACCESS_KEY'),
      },
      region: this._configService.getOrThrow('S3_REGION'),
    });

    this.s3 = new AWS.S3();
  }

  public async upload(
    file: FileStorage,
  ): Promise<AWS.S3.ManagedUpload.SendData | null> {
    const data = {
      Bucket: this._configService.getOrThrow('S3_BUCKET'),
      Key: 'nexum/' + file.name,
      Body: Buffer.from(file.encoding, 'base64'),
      ACL: 'public-read',
    };
    try {
      return this.s3.upload(data).promise();
    } catch (e) {
      this.logger.error('Error uploading file to S3, err: ' + e);
      return null;
    }
  }

  public async delete(key: string): Promise<boolean> {
    const params = {
      Bucket: this._configService.getOrThrow('S3_BUCKET'),
      Key: key,
    };
    try {
      await this.s3.deleteObject(params).promise();
      return true;
    } catch (e) {
      this.logger.error('Error deleting file from S3, err: ' + e);
      return false;
    }
  }
}
