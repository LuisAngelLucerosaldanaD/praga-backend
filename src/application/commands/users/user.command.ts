import { UserRepositoryService } from '../../../infrastructure/database/services/user.repository.service';
import { CreateUserDto } from '../../dtos/users/create.dto';
import { User } from '../../../domain/entities/user.entity';
import { v4 as uuidV4, validate } from 'uuid';
import { IResponse } from '../../../infrastructure/models/IResponse';
import { UpdateDto } from '../../dtos/users/update.dto';
import { HashText } from '../../../shared/utils/security/security';

export class UserCommand {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async create(dto: CreateUserDto): Promise<IResponse<User>> {
    const newUser = new User(
      dto.id || uuidV4(),
      dto.name,
      dto.lastname,
      dto.document,
      dto.type_document,
      dto.username,
      await HashText(dto.password),
      dto.email,
      dto.cellphone,
      dto.code,
      dto.points,
      dto.status,
      dto.role,
      dto.birth_date,
    );

    try {
      const isCreated = await this.userRepositoryService.createUser(newUser);
      if (isCreated) {
        return new IResponse(
          false,
          newUser,
          'User created successfully',
          201,
          'User',
        );
      }
      return new IResponse(
        true,
        null,
        'An error occurred while creating the user',
        500,
        'User',
      );
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while creating the user, err: ' + error,
        500,
        'User',
      );
    }
  }

  async update(dto: UpdateDto): Promise<IResponse<User>> {
    const newUser = new User(
      dto.id,
      dto.name,
      dto.lastname,
      dto.document,
      dto.type_document,
      dto.username,
      '',
      dto.email,
      dto.cellphone,
      dto.code,
      dto.points,
      dto.status,
      dto.role,
      dto.birth_date,
    );

    try {
      await this.userRepositoryService.updateUser(newUser);
      return new IResponse(
        false,
        newUser,
        'User updated successfully',
        200,
        'User',
      );
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while updating the user, err: ' + error,
        500,
        'User',
      );
    }
  }

  async delete(id: string): Promise<IResponse<boolean>> {
    try {
      if (!validate(id)) {
        return new IResponse(true, false, 'Invalid user id', 400, 'User');
      }
      const isCreated = await this.userRepositoryService.deleteUser(id);
      if (!isCreated) {
        return new IResponse(
          true,
          false,
          'An error occurred while deleting the user',
          500,
          'User',
        );
      }

      return new IResponse(
        false,
        true,
        'User deleted successfully',
        200,
        'User',
      );
    } catch (error) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the user, err: ' + error,
        500,
        'User',
      );
    }
  }

  async getUserById(id: string): Promise<IResponse<User>> {
    if (!validate(id)) {
      return new IResponse(true, null, 'Invalid user id', 400, 'User');
    }

    try {
      const user = await this.userRepositoryService.getUserById(id);
      if (!user) {
        return new IResponse(true, null, 'User not found', 404, 'User');
      }
      return new IResponse(false, user, 'User found', 200, 'User');
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the user, err: ' + error,
        500,
        'User',
      );
    }
  }

  async getUsers(): Promise<IResponse<User[]>> {
    try {
      const users = await this.userRepositoryService.getUsers();
      return new IResponse(false, users, 'Users found', 200, 'User');
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the users, err: ' + error,
        500,
        'User',
      );
    }
  }
}
