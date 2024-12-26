import { BaseTable } from '../../infrastructure/models/base-table';

export class Zone extends BaseTable {
  id: string;
  name: string;
  description: string;
  type: number;
  location_id: number;
}
