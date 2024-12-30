import { BaseTable } from '../../shared/domain/base-table';

export class Location extends BaseTable {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  capacity: number;
  email: string;
}
