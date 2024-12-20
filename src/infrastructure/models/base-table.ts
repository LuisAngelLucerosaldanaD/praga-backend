export class BaseTable {
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  is_deleted: boolean;
  user_creator: string;
  user_deleter: string | null;
}
