import { BaseTable } from '../../shared/domain/base-table';

export class Role extends BaseTable {
  id: string;
  name: string;
  description: string;

  constructor(id: string, name: string, description: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
