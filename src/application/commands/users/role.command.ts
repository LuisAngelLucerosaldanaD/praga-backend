import { RoleService } from '../../../infrastructure/database/services/role.service';
import { IResponse } from '../../../infrastructure/models/IResponse';
import { Role } from '../../../domain/entities/role.entity';
import { ICreateRoleDto, IUpdateDto } from '../../dtos/role';
import { v4 as uuidV4 } from 'uuid';

export class RoleCommand {
  constructor(private readonly roleService: RoleService) {}

  public async create(dto: ICreateRoleDto): Promise<IResponse<Role>> {
    const newRole = new Role(dto.id || uuidV4(), dto.name, dto.description);

    try {
      const isCreated = await this.roleService.createRole(newRole);
      if (isCreated) {
        return new IResponse(
          false,
          newRole,
          'Role created successfully',
          201,
          'Role',
        );
      }
      return new IResponse(
        true,
        null,
        'An error occurred while creating the role',
        500,
        'Role',
      );
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while creating the role, err: ' + error,
        500,
        'Role',
      );
    }
  }

  public async update(dto: IUpdateDto): Promise<IResponse<Role>> {
    const newRole = new Role(dto.id, dto.name, dto.description);

    try {
      const isUpdated = await this.roleService.updateRole(newRole);
      if (isUpdated) {
        return new IResponse(
          false,
          newRole,
          'Role updated successfully',
          200,
          'Role',
        );
      }
      return new IResponse(
        true,
        null,
        'An error occurred while updating the role',
        500,
        'Role',
      );
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while updating the role, err: ' + error,
        500,
        'Role',
      );
    }
  }

  public async delete(id: string): Promise<IResponse<boolean>> {
    try {
      const isDeleted = await this.roleService.deleteRole(id);
      if (isDeleted) {
        return new IResponse(
          false,
          true,
          'Role deleted successfully',
          200,
          'Role',
        );
      }
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the role',
        500,
        'Role',
      );
    } catch (error) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the role, err: ' + error,
        500,
        'Role',
      );
    }
  }

  public async getRoleById(id: string): Promise<IResponse<Role>> {
    try {
      const role = await this.roleService.getRoleById(id);
      if (!role) {
        return new IResponse(true, null, 'Role not found', 404, 'Role');
      }
      return new IResponse(false, role, 'Role found', 200, 'Role');
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the role, err: ' + error,
        500,
        'Role',
      );
    }
  }

  public async getRoles(): Promise<IResponse<Role[]>> {
    try {
      const roles = await this.roleService.getRoles();
      if (!roles) {
        return new IResponse(true, [], 'Roles not found', 404, 'Role');
      }
      return new IResponse(false, roles, 'Roles found', 200, 'Role');
    } catch (error) {
      return new IResponse(
        true,
        [],
        'An error occurred while getting the roles, err: ' + error,
        500,
        'Role',
      );
    }
  }
}
