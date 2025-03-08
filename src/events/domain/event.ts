import { BaseTable } from '../../shared/domain/base-table';
import { EventDTO, ICreateEvent } from '../infraestructure/dtos/dtos';
import { validate, v4 } from 'uuid';

export class Event extends BaseTable {
  id: string;
  name: string;
  slogan: string;
  capacity: number;
  start_date: Date;
  end_date: Date;
  publication_date: Date;
  pre_sale_date: Date;
  free_list_date: Date;

  constructor(
    id: string,
    name: string,
    slogan: string,
    capacity: number,
    start_date: Date,
    end_date: Date,
    publication_date: Date,
    pre_sale_date: Date,
    free_list_date: Date,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    is_delete?: boolean,
    user_creator?: string,
    user_deleter?: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.slogan = slogan;
    this.capacity = capacity;
    this.start_date = start_date;
    this.end_date = end_date;
    this.publication_date = publication_date;
    this.pre_sale_date = pre_sale_date;
    this.free_list_date = free_list_date;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_delete;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static dtoToEvent(dto: ICreateEvent): Event {
    return new Event(
      dto.id,
      dto.name,
      dto.slogan,
      dto.capacity,
      new Date(dto.start_date),
      new Date(dto.end_date),
      new Date(dto.publication_date),
      new Date(dto.pre_sale_date),
      new Date(dto.free_list_date),
    );
  }

  public static parseDTO(dto: EventDTO): Event {
    return new Event(
      dto.id || v4(),
      dto.name,
      dto.slogan,
      dto.capacity,
      new Date(dto.start_date),
      new Date(dto.end_date),
      new Date(dto.publication_date),
      new Date(dto.pre_sale_date),
      new Date(dto.free_list_date),
    );
  }

  public isValidate(): boolean {
    if (!this.id || !validate(this.id)) return false;
    if (!this.name || this.name.length > 100) return false;
    if (!this.slogan || this.slogan.length > 100) return false;
    if (!this.capacity || this.capacity < 0) return false;
    if (!this.start_date) return false;
    if (!this.end_date) return false;
    if (!this.publication_date) return false;
    if (!this.pre_sale_date) return false;
    return !!this.free_list_date;
  }
}
