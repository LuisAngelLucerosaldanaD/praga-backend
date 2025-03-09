import { Role } from './role';

export abstract class RolesRepository {
  abstract createRole(role: Role): Promise<boolean>;

  abstract updateRole(role: Role): Promise<boolean>;

  abstract deleteRole(id: string, user: string): Promise<boolean>;

  abstract getRoleById(id: string): Promise<Role | null>;

  abstract getRoles(): Promise<Role[]>;
}
