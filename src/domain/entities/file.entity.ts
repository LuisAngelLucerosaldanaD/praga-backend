import { BaseTable } from '../../infrastructure/models/base-table';

export class File extends BaseTable {
  id: string;
  name: string;
  path: string;
  format: string;
  hash: string;
  size: number;
}
