import { v4 as uuidV4, validate } from 'uuid';
import { IResponse } from '../../../shared/domain/IResponse';
import { HashText } from '../../../shared/infraestructure/security/security';
import { CreateUserDto } from '../../infraestructure/dto/create.dto';
import { UpdateDto } from '../../infraestructure/dto/update.dto';
import { UserService } from '../../infraestructure/user.service';
import { User } from '../../domain/user';

export class UserCommand {
  constructor(private readonly userService: UserService) {}

  public async create(
    dto: CreateUserDto,
    user: string,
  ): Promise<IResponse<boolean>> {
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

    newUser.user_creator = user;

    try {
      const isCreated = await this.userService.createUser(newUser);
      if (isCreated) {
        return new IResponse(
          false,
          true,
          'User created successfully',
          201,
          'User',
        );
      }
      return new IResponse(
        true,
        false,
        'An error occurred while creating the user',
        500,
        'User',
      );
    } catch (error) {
      return new IResponse(
        true,
        false,
        'An error occurred while creating the user, err: ' + error,
        500,
        'User',
      );
    }
  }

  public async update(dto: UpdateDto): Promise<IResponse<User>> {
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
      const isUpdated = await this.userService.updateUser(newUser);
      if (!isUpdated) {
        return new IResponse(
          true,
          null,
          'An error occurred while updating the user',
          500,
          'User',
        );
      }
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

  public async delete(id: string, user: string): Promise<IResponse<boolean>> {
    try {
      if (!validate(id)) {
        return new IResponse(true, false, 'Invalid user id', 400, 'User');
      }
      const isCreated = await this.userService.deleteUser(id, user);
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

  public async getUserById(id: string): Promise<IResponse<User>> {
    if (!validate(id)) {
      return new IResponse(true, null, 'Invalid user id', 400, 'User');
    }

    try {
      const user = await this.userService.getUserById(id);
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

  public async getUsers(): Promise<IResponse<User[]>> {
    try {
      const users = await this.userService.getUsers();
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
