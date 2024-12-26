import { Role } from '../entities/Role.entity';

export interface RoleRepository {
  createRole(role: Role): Promise<boolean>;

  updateRole(role: Role): Promise<boolean>;

  deleteRole(id: string): Promise<boolean>;

  getRoleById(id: string): Promise<Role | null>;

  getRoles(): Promise<Role[]>;
}
