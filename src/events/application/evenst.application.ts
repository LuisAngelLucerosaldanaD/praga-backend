import { HttpStatus, Injectable } from '@nestjs/common';
import { EventsService } from '../infraestructure/events.service';
import { ICreateEvent } from '../infraestructure/dtos/crud';
import { Event } from '../domain/event';
import { IResponse } from '../../shared/domain/IResponse';

@Injectable()
export class EventsApplication {
  constructor(private readonly eventsService: EventsService) {}

  public async createEvent(
    event: ICreateEvent,
    user: string,
  ): Promise<IResponse<Event>> {
    const newEvent = Event.dtoToEvent(event);
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
      const isCreated = await this.eventsService.createEvent(newEvent);
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

  public async getEvents(): Promise<IResponse<Event[]>> {
    try {
      const events = await this.eventsService.getEvents();
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

  public async getEventById(id: string): Promise<IResponse<Event>> {
    try {
      const event = await this.eventsService.getEventById(id);
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

  public async updateEvent(event: ICreateEvent): Promise<IResponse<Event>> {
    const newEvent = Event.dtoToEvent(event);
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
      const isUpdated = await this.eventsService.updateEvent(newEvent);
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

  public async deleteEvent(
    id: string,
    user: string,
  ): Promise<IResponse<Event>> {
    try {
      const isDeleted = await this.eventsService.deleteEvent(id, user);
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
}
