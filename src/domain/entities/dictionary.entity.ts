import { BaseTable } from '../../infrastructure/models/base-table';

export class Dictionary extends BaseTable {
  id: number;
  name: string;
  value: string;
  description: string;
}
