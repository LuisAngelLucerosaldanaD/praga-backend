import { BaseTable } from '../../infrastructure/models/base-table';

export class Role extends BaseTable {
  id: string;
  name: string;
  description: string;

  constructor(id: string, name: string, description: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.user_creator = 'b7c90251-8f59-4970-ab8e-c1e9a52bdc3f';
  }
}
