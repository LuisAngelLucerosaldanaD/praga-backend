import { BaseTable } from '../../shared/domain/base-table';
import { ICreateZoneDTO } from '../infraestructure/dtos/crud';
import { validate } from 'uuid';

export class Zone extends BaseTable {
  id: string;
  name: string;
  description: string;
  type: number;
  location_id: string;

  constructor(
    id: string,
    name: string,
    description: string,
    type: number,
    location_id: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.location_id = location_id;
  }

  static dtoToZone(zone: ICreateZoneDTO): Zone {
    return new Zone(
      zone.id,
      zone.name,
      zone.description,
      zone.type,
      zone.location_id,
    );
  }

  public isValid(): boolean {
    if (!this.id || !validate(this.id)) return false;

    if (!this.name || this.name.length > 50) return false;

    if (!this.description || this.description.length > 255) return false;

    if (!this.type || this.type <= 0) return false;

    return !(!this.location_id || !validate(this.location_id));
  }
}
