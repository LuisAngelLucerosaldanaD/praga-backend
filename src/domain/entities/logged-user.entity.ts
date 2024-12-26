import { BaseTable } from '../../infrastructure/models/base-table';

export class LoggedUser extends BaseTable {
  id: number;
  user_id: string;
  event: string;
  ip_request: string;
  coordinates: string;
}
