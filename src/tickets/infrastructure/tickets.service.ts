import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infrastructure/persistence/database.service';
import { TicketsRepository } from '../domain/tickets.repository';
import { Ticket } from '../domain/ticket';

@Injectable()
export class TicketsService implements TicketsRepository {
  private readonly logger = new Logger(TicketsService.name);

  constructor(private readonly dbService: DatabaseService) {}

  public async createTicket(ticket: Ticket): Promise<boolean> {
    this.logger.debug(
      `Executing query: createTicket (${JSON.stringify(ticket)})`,
    );
    const query = `INSERT INTO config.tickets (id,
                                               user_id,
                                               place_id,
                                               transaction,
                                               amount,
                                               status,
                                               promoter_code, user_creator)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    try {
      await this.dbService.execute(query, [
        ticket.id,
        ticket.user_id,
        ticket.place_id,
        ticket.transaction_id,
        ticket.amount,
        ticket.status,
        ticket.promoter_code,
        ticket.user_creator,
      ]);
      return true;
    } catch (error) {
      this.logger.error(
        `Error executing query createTicket (${JSON.stringify(ticket)}), error: ${error}`,
      );
      return false;
    }
  }

  public async deleteTicket(id: string, user: string): Promise<boolean> {
    this.logger.debug(`Executing query: deleteTicket (${id})`);
    const query = `UPDATE config.tickets
                   SET is_delete    = true,
                       deleted_at   = now(),
                       user_deleter = $2
                   WHERE id = $1`;
    try {
      const res = await this.dbService.execute(query, [id, user]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query deleteTicket (${id}), error: ${error}`,
      );
      return false;
    }
  }

  public async getTicketById(id: string): Promise<Ticket | null> {
    this.logger.debug(`Executing query: getTicketById (${id})`);
    const query = `SELECT id,
                          user_id,
                          place_id,
                          transaction,
                          amount,
                          status,
                          promoter_code,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.tickets
                   WHERE id = $1
                     and is_delete = false`;
    try {
      const res = await this.dbService.execute(query, [id]);
      this.logger.debug(
        `Executed query getRoleById, result size ${res.rows.length}`,
      );
      if (res.rowCount === 0) return null;
      return Ticket.parseQuery(res.rows[0]);
    } catch (error) {
      this.logger.error(
        `Error executing query getTicketById (${id}), error: ${error}`,
      );
      return null;
    }
  }

  public async getTickets(): Promise<Ticket[]> {
    this.logger.debug(`Executing query: getTickets`);
    const query = `SELECT id,
                          user_id,
                          place_id,
                          transaction,
                          amount,
                          status,
                          promoter_code,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.tickets
                   WHERE is_delete = false`;
    try {
      const res = await this.dbService.execute(query);
      this.logger.debug(
        `Executed query getTickets, result size ${res.rows.length}`,
      );
      return res.rows.map((item) => Ticket.parseQuery(item));
    } catch (error) {
      this.logger.error(`Error executing query getTickets, error: ${error}`);
      return [];
    }
  }

  public async updateTicket(ticket: Ticket): Promise<boolean> {
    this.logger.debug(
      `Executing query: updateTicket (${JSON.stringify(ticket)})`,
    );
    const query = `UPDATE config.tickets
                   SET user_id       = $2,
                       place_id      = $3,
                       transaction   = $4,
                       amount        = $5,
                       status        = $6,
                       promoter_code = $7,
                       updated_at    = now()
                   WHERE id = $1
                   RETURNING *`;
    try {
      const res = await this.dbService.execute(query, [
        ticket.id,
        ticket.user_id,
        ticket.place_id,
        ticket.transaction_id,
        ticket.amount,
        ticket.status,
        ticket.promoter_code,
      ]);
      return res.rowCount !== 0;
    } catch (error) {
      this.logger.error(
        `Error executing query updateTicket (${JSON.stringify(ticket)}), error: ${error}`,
      );
      return false;
    }
  }

  public async getTicketsByPlace(place_id: string): Promise<Ticket[]> {
    this.logger.debug(`Executing query: getTicketsByPlace (${place_id})`);
    const query = `SELECT id,
                          user_id,
                          place_id,
                          transaction,
                          amount,
                          status,
                          promoter_code,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.tickets
                   WHERE place_id = $1
                     and is_delete = false`;
    try {
      const res = await this.dbService.execute(query, [place_id]);
      this.logger.debug(
        `Executed query getTicketsByPlace, result size ${res.rows.length}`,
      );
      return res.rows.map((item) => Ticket.parseQuery(item));
    } catch (error) {
      this.logger.error(
        `Error executing query getTicketsByPlace (${place_id}), error: ${error}`,
      );
      return [];
    }
  }

  public async getTicketsByUser(user_id: string): Promise<Ticket[]> {
    this.logger.debug(`Executing query: getTicketsByUser (${user_id})`);
    const query = `SELECT id,
                          user_id,
                          place_id,
                          transaction,
                          amount,
                          status,
                          promoter_code,
                          created_at,
                          updated_at,
                          deleted_at,
                          is_delete,
                          user_creator
                   FROM config.tickets
                   WHERE user_id = $1
                     and is_delete = false`;
    try {
      const res = await this.dbService.execute(query, [user_id]);
      this.logger.debug(
        `Executed query getTicketsByUser, result size ${res.rows.length}`,
      );
      return res.rows.map((item) => Ticket.parseQuery(item));
    } catch (error) {
      this.logger.error(
        `Error executing query getTicketsByUser (${user_id}), error: ${error}`,
      );
      return [];
    }
  }
}
