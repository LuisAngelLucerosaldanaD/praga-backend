import { HttpStatus, Injectable } from '@nestjs/common';
import { EventDTO } from '../infrastructure/dtos/dtos';
import { Event } from '../domain/event';
import { IResponse } from '../../shared/domain/IResponse';
import { EventsRepository } from '../domain/events.repository';
import { v4, validate } from 'uuid';
import { PlacesRepository } from '../../places/domain/places.repository';
import { ApplicationService as fileService } from '../../files/application/application.service';
import { FilesEventsRepository } from '../../files-events/domain/files_events.repository';
import { FilesEvent } from '../../files-events/domain/files_event';
import { FileDTO } from '../../files/infrastructure/dtos/dtos';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly _repository: EventsRepository,
    private readonly _placeRepository: PlacesRepository,
    private readonly _filesAppService: fileService,
    private readonly _filesEventsRepository: FilesEventsRepository,
  ) {}

  public async createEvent(event: EventDTO, user: string): Promise<IResponse> {
    const newEvent = Event.parseDTO(event);
    newEvent.user_creator = user;

    try {
      const isCreated = await this._repository.createEvent(newEvent);
      if (!isCreated) {
        return {
          error: true,
          message: 'Failed to create event',
          data: null,
          code: HttpStatus.ACCEPTED,
          type: 'event',
        };
      }

      for await (const image of event.images) {
        const file = new FileDTO(image.name, image.file);
        const res = await this._filesAppService.createFile(file, user);
        if (res.error) {
          return {
            error: true,
            message: 'Failed to create event file',
            data: null,
            code: HttpStatus.ACCEPTED,
            type: 'event',
          };
        }

        const rel = new FilesEvent(v4(), image.type, newEvent.id, res.data);
        rel.user_creator = user;
        await this._filesEventsRepository.createFilesEvent(rel);
      }

      return {
        error: false,
        message: 'Event created successfully',
        data: newEvent,
        code: HttpStatus.CREATED,
        type: 'event',
      };
    } catch (error) {
      return {
        error: true,
        message: 'An error occurred while creating the event, err: ' + error,
        data: null,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'event',
      };
    }
  }

  public async updateEvent(event: EventDTO): Promise<IResponse<Event>> {
    const newEvent = Event.parseDTO(event);

    try {
      const isUpdated = await this._repository.updateEvent(newEvent);
      if (isUpdated) {
        return {
          error: false,
          message: 'Event updated successfully',
          data: newEvent,
          code: HttpStatus.OK,
          type: 'event',
        };
      }
      return {
        error: true,
        message: 'Failed to update event',
        data: null,
        code: HttpStatus.ACCEPTED,
        type: 'event',
      };
    } catch (error) {
      return {
        error: true,
        message: 'An error occurred while updating the event, err: ' + error,
        data: null,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'event',
      };
    }
  }

  public async getEventById(id: string): Promise<IResponse<EventDTO>> {
    try {
      const event = await this._repository.getEventById(id);
      if (!event) {
        return {
          error: true,
          message: 'Event not found',
          data: null,
          code: HttpStatus.NOT_FOUND,
          type: 'event',
        };
      }

      const data: EventDTO = {
        id: event.id,
        name: event.name,
        slogan: event.slogan,
        capacity: event.capacity,
        start_date: event.start_date.toISOString(),
        end_date: event.end_date.toISOString(),
        publication_date: event.publication_date.toISOString(),
        pre_sale_date: event.pre_sale_date.toISOString(),
        free_list_date: event.free_list_date.toISOString(),
        images: [],
      };
      const files = await this._filesAppService.getFilesByEventId(event.id);
      if (!files.error) {
        data.images = files.data.map((img) => ({
          name: img.name,
          file: img.path,
          type: 0,
        }));
      }

      return {
        error: false,
        message: 'Event found',
        data: data,
        code: HttpStatus.OK,
        type: 'event',
      };
    } catch (error) {
      return {
        error: true,
        message: 'An error occurred while getting the event, err: ' + error,
        data: null,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'event',
      };
    }
  }

  public async deleteEvent(id: string, user: string): Promise<IResponse> {
    try {
      const isDeleted = await this._repository.deleteEvent(id, user);
      if (isDeleted) {
        return {
          error: false,
          message: 'Event deleted successfully',
          data: null,
          code: HttpStatus.OK,
          type: 'event',
        };
      }
      return {
        error: true,
        message: 'Failed to delete event',
        data: null,
        code: HttpStatus.ACCEPTED,
        type: 'event',
      };
    } catch (error) {
      return {
        error: true,
        message: 'An error occurred while deleting the event, err: ' + error,
        data: null,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'event',
      };
    }
  }

  public async getEvents(): Promise<IResponse<Event[]>> {
    try {
      const events = await this._repository.getEvents();
      return {
        error: false,
        message: 'Events found',
        data: events,
        code: HttpStatus.OK,
        type: 'event',
      };
    } catch (error) {
      return {
        error: true,
        message: 'An error occurred while getting the events, err: ' + error,
        data: null,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        type: 'event',
      };
    }
  }

  public async getPlacesEvent(eventId: string): Promise<IResponse> {
    try {
      if (!validate(eventId)) {
        return new IResponse(
          true,
          null,
          'Invalid event id',
          HttpStatus.BAD_REQUEST,
          'Place',
        );
      }

      const places = await this._placeRepository.getPlacesByEventId(eventId);
      return new IResponse(
        false,
        places,
        'Places found',
        HttpStatus.OK,
        'Place',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the places, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Place',
      );
    }
  }
}
