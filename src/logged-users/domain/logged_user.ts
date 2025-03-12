import { BaseTable } from '../../shared/domain/base-table';
import { LoggedUserDTO } from '../infrastructure/dtos/dtos';

export class LoggedUser extends BaseTable {
  id: number;
  userId: string;
  ipRequest: string;
  coordinates: string;

  constructor(
    id: number,
    userId: string,
    ipRequest: string,
    coordinates: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    is_delete?: boolean,
    user_creator?: string,
    user_deleter?: string,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.ipRequest = ipRequest;
    this.coordinates = coordinates;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_delete;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static parseDTO(dto: LoggedUserDTO): LoggedUser {
    return new LoggedUser(dto.id, dto.userId, dto.ipRequest, dto.coordinates);
  }

  public static parseQuery(query: any): LoggedUser {
    return new LoggedUser(
      query.id,
      query.userId,
      query.ipRequest,
      query.coordinates,
      query.created_at,
      query.updated_at,
      query.deleted_at,
      query.is_delete,
      query.user_creator,
      query.user_deleter,
    );
  }
}
