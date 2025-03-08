import { Event } from './event';

export abstract class EventsRepository {
  abstract createEvent(event: Event): Promise<boolean>;

  abstract updateEvent(event: Event): Promise<boolean>;

  abstract deleteEvent(id: string, user: string): Promise<boolean>;

  abstract getEventById(id: string): Promise<Event | null>;

  abstract getEvents(): Promise<Event[]>;
}
