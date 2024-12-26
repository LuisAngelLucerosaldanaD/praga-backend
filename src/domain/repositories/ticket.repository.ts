import { Ticket } from '../entities/ticket.entity';

export interface TicketRepository {
  createTicket(Ticket: Ticket): Promise<boolean>;

  updateTicket(Ticket: Ticket): Promise<boolean>;

  deleteTicket(id: string): Promise<boolean>;

  getTicketById(id: string): Promise<Ticket | null>;

  getTickets(): Promise<Ticket[]>;
}
