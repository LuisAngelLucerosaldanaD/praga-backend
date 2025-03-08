import { BaseTable } from '../../shared/domain/base-table';
import { TicketDTO } from '../infraestructure/dtos/dtos';

export class Ticket extends BaseTable {
  id: string;
  user_id: string;
  place_id: string;
  transaction_id: string;
  amount: number;
  status: number;
  promoter_code: string;

  constructor(
    id: string,
    user_id: string,
    place_id: string,
    transaction_id: string,
    amount: number,
    status: number,
    promoter_code: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    is_delete?: boolean,
    user_creator?: string,
    user_deleter?: string,
  ) {
    super();
    this.id = id;
    this.user_id = user_id;
    this.place_id = place_id;
    this.transaction_id = transaction_id;
    this.amount = amount;
    this.status = status;
    this.promoter_code = promoter_code;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_delete;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static parseDTO(dto: TicketDTO): Ticket {
    return new Ticket(
      dto.id,
      dto.user_id,
      dto.place_id,
      dto.transaction_id,
      dto.amount,
      dto.status,
      dto.promoter_code,
    );
  }

  public static parseQuery(query: any): Ticket {
    return new Ticket(
      query.id,
      query.user_id,
      query.place_id,
      query.transaction_id,
      query.amount,
      query.status,
      query.promoter_code,
      query.created_at,
      query.updated_at,
      query.deleted_at,
      query.is_deleted,
      query.user_creator,
      query.user_deleter,
    );
  }
}
