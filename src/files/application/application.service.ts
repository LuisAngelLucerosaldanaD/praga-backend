import { HttpStatus, Injectable } from '@nestjs/common';
import { FilesRepository } from '../domain/files.repository';
import { FileDTO } from '../infrastructure/dtos/dtos';
import { IResponse } from '../../shared/domain/IResponse';
import { File, FileStorage } from '../domain/file';
import { FilesStorageRepository } from '../domain/files.storage.repository';
import { v4 } from 'uuid';
import {
  fileMimeType,
  fileSize,
  HashFile,
} from '../../shared/infrastructure/security/security';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly _repository: FilesRepository,
    private readonly _storageRepo: FilesStorageRepository,
  ) {}

  public async createFile(
    dto: FileDTO,
    user: string,
  ): Promise<IResponse<string>> {
    try {
      const fileStorage = new FileStorage(
        dto.name,
        fileMimeType(dto.encoding),
        dto.encoding,
      );
      const uploaded = await this._storageRepo.upload(fileStorage);
      if (!uploaded) {
        return new IResponse(
          true,
          '',
          'Error uploading file',
          HttpStatus.ACCEPTED,
          'file',
        );
      }

      const file = new File(
        v4(),
        dto.name,
        uploaded.Location,
        7,
        HashFile(dto.encoding),
        fileSize(dto.encoding),
      );
      file.user_creator = user;
      const isCreated = await this._repository.createFile(file);
      if (isCreated) {
        return new IResponse(
          false,
          file.id,
          'File created successfully',
          HttpStatus.CREATED,
          'file',
        );
      }

      return new IResponse(
        true,
        '',
        'Error creating file',
        HttpStatus.ACCEPTED,
        'file',
      );
    } catch (e) {
      return new IResponse(
        true,
        '',
        'An error occurred while creating the, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'file',
      );
    }
  }

  public async deleteFile(id: string, user: string): Promise<IResponse> {
    try {
      const isDeleted = await this._repository.deleteFile(id, user);
      if (isDeleted) {
        return new IResponse(
          false,
          true,
          'File deleted successfully',
          HttpStatus.OK,
          'file',
        );
      }

      return new IResponse(
        true,
        false,
        'Error deleting file',
        HttpStatus.ACCEPTED,
        'file',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the file, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'file',
      );
    }
  }

  public async getFileById(id: string): Promise<IResponse<File>> {
    try {
      const file = await this._repository.getFileById(id);
      if (file) {
        return new IResponse(
          false,
          file,
          'File found successfully',
          HttpStatus.OK,
          'file',
        );
      }

      return new IResponse(
        true,
        null,
        'File not found',
        HttpStatus.ACCEPTED,
        'file',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the file, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'file',
      );
    }
  }

  public async getFiles(): Promise<IResponse<File[]>> {
    try {
      const files = await this._repository.getFiles();
      return new IResponse(
        false,
        files,
        'Files found successfully',
        HttpStatus.OK,
        'file',
      );
    } catch (e) {
      return new IResponse(
        true,
        [],
        'An error occurred while getting the files, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'file',
      );
    }
  }

  public async getFilesByEventId(eventId: string): Promise<IResponse<File[]>> {
    try {
      const files = await this._repository.getFilesByEventId(eventId);
      return new IResponse(
        false,
        files,
        'Files found successfully',
        HttpStatus.OK,
        'file',
      );
    } catch (e) {
      return new IResponse(
        true,
        [],
        'An error occurred while getting the files, err:' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'file',
      );
    }
  }
}
