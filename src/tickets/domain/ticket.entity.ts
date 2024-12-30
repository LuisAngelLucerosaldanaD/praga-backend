import { BaseTable } from '../../shared/domain/base-table';

export class Ticket extends BaseTable {
  id: string;
  user_id: string;
  event_id: string;
  transaction_id: string;
  amount: number;
  status: number;
  promoter_code: string;
}
