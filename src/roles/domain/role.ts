import { BaseTable } from '../../shared/domain/base-table';
import { RoleDTO } from '../infrastructure/dtos/role';
import { v4 } from 'uuid';

export class Role extends BaseTable {
  id: string;
  name: string;
  description: string;

  constructor(
    id: string,
    name: string,
    description: string,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
    is_delete?: boolean,
    user_creator?: string,
    user_deleter?: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
    this.is_deleted = is_delete;
    this.user_creator = user_creator;
    this.user_deleter = user_deleter;
  }

  public static parseDTO(dto: RoleDTO): Role {
    return new Role(dto.id || v4(), dto.name, dto.description);
  }

  public static parseQuery(query: any): Role {
    return new Role(
      query.id || v4(),
      query.name,
      query.description,
      query.created_at,
      query.updated_at,
      query.deleted_at,
      query.is_delete,
      query.user_creator,
      query.user_deleter,
    );
  }
}
