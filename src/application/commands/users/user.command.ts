import { UserRepositoryService } from '../../../infrastructure/database/services/user.repository.service';
import { CreateUserDto } from '../../dtos/users/create.dto';
import { User } from '../../../domain/entities/user.entity';
import { v4 as uuidV4, validate } from 'uuid';
import { Response } from '../../../infrastructure/models/response';
import { UpdateDto } from '../../dtos/users/update.dto';

export class UserCommand {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async create(dto: CreateUserDto): Promise<Response<User>> {
    const newUser = new User(
      uuidV4(),
      dto.name,
      dto.lastname,
      dto.document,
      dto.type_document,
      dto.username,
      dto.password,
      dto.email,
      dto.cellphone,
      dto.code,
      dto.points,
      dto.status,
      dto.role,
      dto.birth_date,
      dto.picture,
      dto.block_date,
    );

    try {
      await this.userRepositoryService.createUser(newUser);
      return new Response(
        false,
        newUser,
        'User created successfully',
        201,
        'User',
      );
    } catch (error) {
      return new Response(
        true,
        null,
        'An error occurred while creating the user, err: ' + error,
        500,
        'User',
      );
    }
  }

  async update(dto: UpdateDto): Promise<Response<User>> {
    const newUser = new User(
      dto.id,
      dto.name,
      dto.lastname,
      dto.document,
      dto.type_document,
      dto.username,
      dto.password,
      dto.email,
      dto.cellphone,
      dto.code,
      dto.points,
      dto.status,
      dto.role,
      dto.birth_date,
      dto.picture,
      dto.block_date,
    );

    try {
      await this.userRepositoryService.updateUser(newUser);
      return new Response(
        false,
        newUser,
        'User updated successfully',
        200,
        'User',
      );
    } catch (error) {
      return new Response(
        true,
        null,
        'An error occurred while updating the user, err: ' + error,
        500,
        'User',
      );
    }
  }

  async delete(id: string): Promise<Response<boolean>> {
    try {
      if (!validate(id)) {
        return new Response(true, false, 'Invalid user id', 400, 'User');
      }
      await this.userRepositoryService.deleteUser(id);
      return new Response(
        false,
        true,
        'User deleted successfully',
        200,
        'User',
      );
    } catch (error) {
      return new Response(
        true,
        false,
        'An error occurred while deleting the user, err: ' + error,
        500,
        'User',
      );
    }
  }

  async getUserById(id: string): Promise<Response<User>> {
    if (!validate(id)) {
      return new Response(true, null, 'Invalid user id', 400, 'User');
    }

    try {
      const user = await this.userRepositoryService.getUserById(id);
      if (!user) {
        return new Response(true, null, 'User not found', 404, 'User');
      }
      return new Response(false, user, 'User found', 200, 'User');
    } catch (error) {
      return new Response(
        true,
        null,
        'An error occurred while getting the user, err: ' + error,
        500,
        'User',
      );
    }
  }
}
