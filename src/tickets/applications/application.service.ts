import { HttpStatus, Injectable } from '@nestjs/common';
import { TicketsRepository } from '../domain/tickets.repository';
import { TicketDTO } from '../infraestructure/dtos/dtos';
import { IResponse } from '../../shared/domain/IResponse';
import { Ticket } from '../domain/ticket';
import { validate } from 'uuid';

@Injectable()
export class ApplicationService {
  constructor(private readonly _repository: TicketsRepository) {}

  public async createTicket(dto: TicketDTO, user: string): Promise<IResponse> {
    const ticket = Ticket.parseDTO(dto);
    ticket.user_creator = user;
    try {
      const isCreated = await this._repository.createTicket(ticket);
      if (isCreated) {
        return new IResponse(
          false,
          true,
          'Ticket created successfully',
          HttpStatus.CREATED,
          'Ticket',
        );
      }

      return new IResponse(
        true,
        false,
        'An error occurred while creating the ticket',
        HttpStatus.ACCEPTED,
        'Ticket',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while creating the ticket, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ticket',
      );
    }
  }

  public async updateTicket(dto: TicketDTO, user: string): Promise<IResponse> {
    const ticket = Ticket.parseDTO(dto);
    ticket.user_creator = user;
    try {
      const isUpdated = await this._repository.updateTicket(ticket);
      if (!isUpdated) {
        return new IResponse(
          true,
          null,
          'An error occurred while updating the ticket',
          HttpStatus.ACCEPTED,
          'Ticket',
        );
      }

      return new IResponse(
        false,
        true,
        'Ticket updated successfully',
        HttpStatus.OK,
        'Ticket',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while updating the ticket, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ticket',
      );
    }
  }

  public async deleteTicket(ticket: string, user: string): Promise<IResponse> {
    try {
      const isDeleted = await this._repository.deleteTicket(ticket, user);
      if (!isDeleted) {
        return new IResponse(
          true,
          null,
          'An error occurred while deleting the ticket',
          HttpStatus.ACCEPTED,
          'Ticket',
        );
      }

      return new IResponse(
        false,
        true,
        'Ticket deleted successfully',
        HttpStatus.OK,
        'Ticket',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the ticket, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ticket',
      );
    }
  }

  public async getTicketById(id: string): Promise<IResponse<Ticket>> {
    try {
      if (!validate(id)) {
        return new IResponse(
          true,
          null,
          'Invalid ticket id',
          HttpStatus.BAD_REQUEST,
          'Ticket',
        );
      }

      const ticket = await this._repository.getTicketById(id);
      if (!ticket) {
        return new IResponse(
          true,
          null,
          'Ticket not found',
          HttpStatus.NOT_FOUND,
          'Ticket',
        );
      }

      return new IResponse(
        false,
        ticket,
        'Ticket retrieved successfully',
        HttpStatus.OK,
        'Ticket',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the ticket, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ticket',
      );
    }
  }

  public async getTickets(): Promise<IResponse<Ticket[]>> {
    try {
      const tickets = await this._repository.getTickets();
      return new IResponse(
        false,
        tickets,
        'Tickets retrieved successfully',
        HttpStatus.OK,
        'Ticket',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the tickets, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ticket',
      );
    }
  }
}
