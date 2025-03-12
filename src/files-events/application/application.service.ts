import { HttpStatus, Injectable } from '@nestjs/common';
import { FilesEventsRepository } from '../domain/files_events.repository';
import { FilesEventDTO } from '../infrastructure/dtos/dtos';
import { IResponse } from '../../shared/domain/IResponse';
import { FilesEvent } from '../domain/files_event';
import { validate } from 'uuid';

@Injectable()
export class ApplicationService {
  constructor(private readonly _repository: FilesEventsRepository) {}

  public async createFilesEvent(
    dto: FilesEventDTO,
    userId: string,
  ): Promise<IResponse> {
    const filesEvent = FilesEvent.parseDTO(dto);
    filesEvent.user_creator = userId;
    try {
      const isCreated = await this._repository.createFilesEvent(filesEvent);
      if (isCreated) {
        return new IResponse(
          false,
          true,
          'FilesEvent created successfully',
          HttpStatus.CREATED,
          'FilesEvent',
        );
      }

      return new IResponse(
        true,
        false,
        'An error occurred while creating the filesevent',
        HttpStatus.ACCEPTED,
        'FilesEvent',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while creating the filesevent, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'FilesEvent',
      );
    }
  }

  public async updateFilesEvent(
    dto: FilesEventDTO,
    userId: string,
  ): Promise<IResponse> {
    const filesEvent = FilesEvent.parseDTO(dto);
    filesEvent.user_creator = userId;
    try {
      const isUpdated = await this._repository.updateFilesEvent(filesEvent);
      if (!isUpdated) {
        return new IResponse(
          true,
          null,
          'An error occurred while updating the filesevent',
          HttpStatus.ACCEPTED,
          'FilesEvent',
        );
      }

      return new IResponse(
        false,
        true,
        'FilesEvent updated successfully',
        HttpStatus.OK,
        'FilesEvent',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while updating the filesevent, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'FilesEvent',
      );
    }
  }

  public async deleteFilesEvent(
    filesevent: string,
    userId: string,
  ): Promise<IResponse> {
    try {
      const isDeleted = await this._repository.deleteFilesEvent(
        filesevent,
        userId,
      );
      if (!isDeleted) {
        return new IResponse(
          true,
          null,
          'An error occurred while deleting the filesevent',
          HttpStatus.ACCEPTED,
          'FilesEvent',
        );
      }

      return new IResponse(
        false,
        true,
        'FilesEvent deleted successfully',
        HttpStatus.OK,
        'FilesEvent',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the filesevent, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'FilesEvent',
      );
    }
  }

  public async getFilesEventById(id: string): Promise<IResponse<FilesEvent>> {
    try {
      if (!validate(id)) {
        return new IResponse(
          true,
          null,
          'Invalid filesevent id',
          HttpStatus.BAD_REQUEST,
          'FilesEvent',
        );
      }

      const filesevent = await this._repository.getFilesEventById(id);
      if (!filesevent) {
        return new IResponse(
          true,
          null,
          'FilesEvent not found',
          HttpStatus.NOT_FOUND,
          'FilesEvent',
        );
      }

      return new IResponse(
        false,
        filesevent,
        'FilesEvent retrieved successfully',
        HttpStatus.OK,
        'FilesEvent',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the filesevent, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'FilesEvent',
      );
    }
  }

  public async getFilesEvents(): Promise<IResponse<FilesEvent[]>> {
    try {
      const filesevents = await this._repository.getFilesEvents();
      return new IResponse(
        false,
        filesevents,
        'FilesEvents retrieved successfully',
        HttpStatus.OK,
        'FilesEvent',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the filesevents, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'FilesEvent',
      );
    }
  }
}
