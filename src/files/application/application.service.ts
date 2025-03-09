import { HttpStatus, Injectable } from '@nestjs/common';
import { FilesRepository } from '../domain/files.repository';
import { FileDTO } from '../infraestructure/dtos/dtos';
import { IResponse } from '../../shared/domain/IResponse';
import { File } from '../domain/file';

@Injectable()
export class ApplicationService {
  constructor(private readonly _repository: FilesRepository) {}

  public async createFile(dto: FileDTO, user: string): Promise<IResponse> {
    const file = File.parseDTO(dto);
    file.user_creator = user;
    try {
      const isCreated = await this._repository.createFile(file);
      if (isCreated) {
        return new IResponse(
          false,
          true,
          'File created successfully',
          HttpStatus.CREATED,
          'file',
        );
      }

      return new IResponse(
        true,
        false,
        'Error creating file',
        HttpStatus.ACCEPTED,
        'file',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while creating the, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'file',
      );
    }
  }

  public async updateFile(dto: FileDTO, user: string): Promise<IResponse> {
    const file = File.parseDTO(dto);
    file.user_creator = user;
    try {
      const isUpdated = await this._repository.updateFile(file);
      if (isUpdated) {
        return new IResponse(
          false,
          true,
          'File updated successfully',
          HttpStatus.OK,
          'file',
        );
      }

      return new IResponse(
        true,
        false,
        'Error updating file',
        HttpStatus.ACCEPTED,
        'file',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while updating the file, err: ' + e,
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
}
