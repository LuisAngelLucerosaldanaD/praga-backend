import { BaseTable } from '../../shared/domain/base-table';
import { PasswordHistoryDTO } from '../infrastructure/dtos/dtos';

export class PasswordHistory extends BaseTable {
  id: number;
  user_id: string;
  password: string;

  constructor(
    id: number,
    user_id: string,
    password: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    is_delete?: boolean,
    user_creator?: string,
    user_deleter?: string,
  ) {
    super();
    this.id = id;
    this.password = password;
    this.user_id = user_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_delete;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static parseDTO(dto: PasswordHistoryDTO): PasswordHistory {
    return new PasswordHistory(dto.id, '', dto.password);
  }

  public static parseQuery(query: any): PasswordHistory {
    return new PasswordHistory(
      query.id,
      query.user_id,
      query.password,
      query.created_at,
      query.updated_at,
      query.deleted_at,
      query.is_delete,
      query.user_creator,
      query.user_deleter,
    );
  }
}
