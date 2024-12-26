import { BaseTable } from '../../infrastructure/models/base-table';

export class Role extends BaseTable {
  id: string;
  name: string;
  description: string;
}
