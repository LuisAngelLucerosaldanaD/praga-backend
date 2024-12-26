import { BaseTable } from '../../infrastructure/models/base-table';

export class PasswordHistory extends BaseTable {
  id: number;
  user_id: string;
  password: string;
}
