import { BaseTable } from '../../infrastructure/models/base-table';

export class Message extends BaseTable {
  id: number;
  msg_en: string;
  msg_es: string;
  type: string;
}
