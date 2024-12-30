import { BaseTable } from '../../shared/domain/base-table';

export class Zone extends BaseTable {
  id: string;
  name: string;
  description: string;
  type: number;
  location_id: number;
}
