import { BaseTable } from '../../shared/domain/base-table';
import { ICreateLocationDto } from '../infraestructure/dtos/crud';
import { validate } from 'uuid';

export class Location extends BaseTable {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  capacity: number;
  email: string;

  constructor(
    id: string,
    name: string,
    description: string,
    address: string,
    phone: string,
    capacity: number,
    email: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.phone = phone;
    this.capacity = capacity;
    this.email = email;
  }

  public static dtoToLocation(dto: ICreateLocationDto): Location {
    return new Location(
      dto.id,
      dto.name,
      dto.description,
      dto.address,
      dto.phone,
      dto.capacity,
      dto.email,
    );
  }

  public isValid(): boolean {
    if (!this.id || !validate(this.id)) return false;
    if (!this.name || this.name.length > 50) return false;
    if (!this.description || this.description.length > 200) return false;
    if (!this.address || this.address.length > 100) return false;
    if (!this.phone || this.phone.length > 15) return false;
    if (!this.capacity || this.capacity < 0) return false;
    const emailRegex = new RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    );

    return !(!this.email || !emailRegex.test(this.email));
  }
}
