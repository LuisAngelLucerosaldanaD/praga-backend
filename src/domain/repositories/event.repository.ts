import { Event } from '../entities/event.entity';

export interface EventRepository {
  createEvent(event: Event): Promise<boolean>;

  updateEvent(event: Event): Promise<boolean>;

  deleteEvent(id: string): Promise<boolean>;

  getEventById(id: string): Promise<Event | null>;

  getEvents(): Promise<Event[]>;
}
