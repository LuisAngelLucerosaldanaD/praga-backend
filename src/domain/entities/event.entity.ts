import { BaseTable } from '../../infrastructure/models/base-table';

export class Event extends BaseTable {
  id: string;
  name: string;
  slogan: string;
  capacity: number;
  start_date: Date;
  end_date: Date;
  publication_date: Date;
  pre_sale_date: Date;
  free_list_date: Date;
}
