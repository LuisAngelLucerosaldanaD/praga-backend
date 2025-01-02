import { Role } from './role';

export interface RoleRepository {
  createRole(role: Role): Promise<boolean>;

  updateRole(role: Role): Promise<boolean>;

  deleteRole(id: string, user: string): Promise<boolean>;

  getRoleById(id: string): Promise<Role | null>;

  getRoles(): Promise<Role[]>;
}
