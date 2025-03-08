import { HttpStatus, Injectable } from '@nestjs/common';
import { EventDTO } from '../infraestructure/dtos/dtos';
import { Event } from '../domain/event';
import { IResponse } from '../../shared/domain/IResponse';
import { EventsRepository } from '../domain/events.repository';
import { validate } from 'uuid';
import { PlacesRepository } from '../../places/domain/places.repository';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly _repository: EventsRepository,
    private readonly _placeRepository: PlacesRepository,
  ) {}

  public async createEvent(event: EventDTO, user: string): Promise<IResponse> {
    const newEvent = Event.parseDTO(event);
    newEvent.user_creator = user;
    if (!newEvent.isValidate()) {
      return {
        error: true,
        message: 'Invalid data to create event',
        data: null,
        code: HttpStatus.BAD_REQUEST,
        type: 'event',
      };
    }

    try {
      const isCreated = await this._repository.createEvent(newEvent);
      if (isCreated) {
        return {
          error: false,
          message: 'Event created successfully',
          data: newEvent,
          code: HttpStatus.CREATED,
          type: 'event',
        };
      }
      return {
        error: true,
        message: 'Failed to create event',
        data: null,
        code: HttpStatus.ACCEPTED,
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
    if (!newEvent.isValidate()) {
      return {
        error: true,
        message: 'Invalid data to update event',
        data: null,
        code: HttpStatus.BAD_REQUEST,
        type: 'event',
      };
    }

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

  public async getEventById(id: string): Promise<IResponse<Event>> {
    try {
      const event = await this._repository.getEventById(id);
      if (event) {
        return {
          error: false,
          message: 'Event found',
          data: event,
          code: HttpStatus.OK,
          type: 'event',
        };
      }
      return {
        error: true,
        message: 'Event not found',
        data: null,
        code: HttpStatus.NOT_FOUND,
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
