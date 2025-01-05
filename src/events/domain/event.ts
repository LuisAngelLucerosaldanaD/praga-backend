import { BaseTable } from '../../shared/domain/base-table';
import { ICreateEvent } from '../infraestructure/dtos/crud';
import { validate } from 'uuid';

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
