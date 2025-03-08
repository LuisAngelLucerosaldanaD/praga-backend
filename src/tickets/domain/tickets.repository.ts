import { Ticket } from './ticket';

export abstract class TicketsRepository {
  abstract createTicket(Ticket: Ticket): Promise<boolean>;

  abstract updateTicket(Ticket: Ticket): Promise<boolean>;

  abstract deleteTicket(id: string, user: string): Promise<boolean>;

  abstract getTicketById(id: string): Promise<Ticket | null>;

  abstract getTicketsByUser(user: string): Promise<Ticket[]>;

  abstract getTicketsByPlace(place: string): Promise<Ticket[]>;

  abstract getTickets(): Promise<Ticket[]>;
}
