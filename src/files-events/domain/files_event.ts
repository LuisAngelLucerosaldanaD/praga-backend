import { BaseTable } from '../../shared/domain/base-table';
import { FilesEventDTO } from '../infrastructure/dtos/dtos';
import { v4 } from 'uuid';

export class FilesEvent extends BaseTable {
  id: string;
  typeId: number;
  eventId: string;
  fileId: string;

  constructor(
    id: string,
    typeId: number,
    eventId: string,
    fileId: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    is_delete?: boolean,
    user_creator?: string,
    user_deleter?: string,
  ) {
    super();
    this.id = id;
    this.typeId = typeId;
    this.eventId = eventId;
    this.fileId = fileId;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_delete;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static parseDTO(dto: FilesEventDTO): FilesEvent {
    return new FilesEvent(dto.id || v4(), dto.typeId, dto.eventId, dto.fileId);
  }

  public static parseQuery(query: any): FilesEvent {
    return new FilesEvent(
      query.id,
      query.typeId,
      query.eventId,
      query.fileId,
      query.created_at,
      query.updated_at,
      query.deleted_at,
      query.is_delete,
      query.user_creator,
      query.user_deleter,
    );
  }
}
