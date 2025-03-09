import { BaseTable } from '../../shared/domain/base-table';
import { PlaceDTO } from '../infraestructure/dtos/dtos';
import { v4 } from 'uuid';

export class Place extends BaseTable {
  id: string;
  name: string;
  description: string;
  event_id: string;
  price: number;
  slots: number;
  stock: number;
  pre_sale_price: number;

  constructor(
    id: string,
    name: string,
    description: string,
    event_id: string,
    price: number,
    slots: number,
    stock: number,
    pre_sale_price: number,
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
    this.description = description;
    this.event_id = event_id;
    this.price = price;
    this.slots = slots;
    this.stock = stock;
    this.pre_sale_price = pre_sale_price;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_delete;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static parseQuery(res: any): Place {
    return new Place(
      res.id,
      res.name,
      res.description,
      res.event_id,
      res.price,
      res.slots,
      res.stock,
      res.pre_sale_price,
      res.created_at,
      res.updated_at,
      res.deleted_at,
      res.is_deleted,
      res.user_creator,
      res.user_deleter,
    );
  }

  public static parseDTO(dto: PlaceDTO): Place {
    return new Place(
      dto.id || v4(),
      dto.name,
      dto.description,
      dto.event_id,
      dto.price,
      dto.slots,
      dto.stock,
      dto.pre_sale_price,
    );
  }
}
