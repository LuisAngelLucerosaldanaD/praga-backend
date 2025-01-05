import { Event } from './event';

export interface EventRepository {
  createEvent(event: Event): Promise<boolean>;

  updateEvent(event: Event): Promise<boolean>;

  deleteEvent(id: string, user: string): Promise<boolean>;

  getEventById(id: string): Promise<Event | null>;

  getEvents(): Promise<Event[]>;
}
