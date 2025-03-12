import { HttpStatus, Injectable } from '@nestjs/common';
import { RolesRepository } from '../domain/roles.repository';
import { RoleDTO } from '../infrastructure/dtos/role';
import { IResponse } from '../../shared/domain/IResponse';
import { Role } from '../domain/role';

@Injectable()
export class ApplicationService {
  constructor(private readonly _repository: RolesRepository) {}

  public async create(dto: RoleDTO, user: string): Promise<IResponse<Role>> {
    const newRole = Role.parseDTO(dto);
    newRole.user_creator = user;

    try {
      const isCreated = await this._repository.createRole(newRole);
      if (isCreated) {
        return new IResponse(
          false,
          newRole,
          'Role created successfully',
          HttpStatus.CREATED,
          'Role',
        );
      }
      return new IResponse(
        true,
        null,
        'An error occurred while creating the role',
        HttpStatus.ACCEPTED,
        'Role',
      );
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while creating the role, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Role',
      );
    }
  }

  public async update(dto: RoleDTO): Promise<IResponse<Role>> {
    const newRole = Role.parseDTO(dto);

    try {
      const isUpdated = await this._repository.updateRole(newRole);
      if (isUpdated) {
        return new IResponse(
          false,
          newRole,
          'Role updated successfully',
          HttpStatus.OK,
          'Role',
        );
      }
      return new IResponse(
        true,
        null,
        'An error occurred while updating the role',
        HttpStatus.ACCEPTED,
        'Role',
      );
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while updating the role, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Role',
      );
    }
  }

  public async delete(id: string, user: string): Promise<IResponse<boolean>> {
    try {
      const isDeleted = await this._repository.deleteRole(id, user);
      if (isDeleted) {
        return new IResponse(
          false,
          true,
          'Role deleted successfully',
          HttpStatus.OK,
          'Role',
        );
      }
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the role',
        HttpStatus.ACCEPTED,
        'Role',
      );
    } catch (error) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the role, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Role',
      );
    }
  }

  public async getRoleById(id: string): Promise<IResponse<Role>> {
    try {
      const role = await this._repository.getRoleById(id);
      if (!role) {
        return new IResponse(
          true,
          null,
          'Role not found',
          HttpStatus.NOT_FOUND,
          'Role',
        );
      }
      return new IResponse(false, role, 'Role found', HttpStatus.OK, 'Role');
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the role, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Role',
      );
    }
  }

  public async getRoles(): Promise<IResponse<Role[]>> {
    try {
      const roles = await this._repository.getRoles();
      return new IResponse(false, roles, 'Roles found', HttpStatus.OK, 'Role');
    } catch (error) {
      return new IResponse(
        true,
        [],
        'An error occurred while getting the roles, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Role',
      );
    }
  }
}
