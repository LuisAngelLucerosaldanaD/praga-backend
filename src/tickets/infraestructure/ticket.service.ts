import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';
import { TicketRepository } from '../domain/ticket.repository';
import { Ticket } from '../domain/ticket.entity';

@Injectable()
export class TicketService implements TicketRepository{
  private readonly logger = new Logger(TicketService.name);

  constructor(private readonly dbService: DatabaseService) {}

  createTicket(Ticket: Ticket): Promise<boolean> {
    return Promise.resolve(false);
  }

  deleteTicket(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  getTicketById(id: string): Promise<Ticket | null> {
    return Promise.resolve(undefined);
  }

  getTickets(): Promise<Ticket[]> {
    return Promise.resolve([]);
  }

  updateTicket(Ticket: Ticket): Promise<boolean> {
    return Promise.resolve(false);
  }

}