import { UserService } from '../../../infrastructure/database/services/user.service';
import { CreateUserDto } from '../../dtos/users/create.dto';
import { User } from '../../../domain/entities/user.entity';
import { v4 as uuidV4, validate } from 'uuid';
import { IResponse } from '../../../infrastructure/models/IResponse';
import { UpdateDto } from '../../dtos/users/update.dto';
import { HashText } from '../../../shared/utils/security/security';
import { ICredentials, ISession } from '../../dtos/auth';
import { JwtService } from '@nestjs/jwt';

export class UserCommand {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async create(dto: CreateUserDto): Promise<IResponse<boolean>> {
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
      await this.userService.updateUser(newUser);
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

  public async delete(id: string): Promise<IResponse<boolean>> {
    try {
      if (!validate(id)) {
        return new IResponse(true, false, 'Invalid user id', 400, 'User');
      }
      const isCreated = await this.userService.deleteUser(id);
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

  public async login(dto: ICredentials): Promise<IResponse<ISession | null>> {
    try {
      const user = await this.userService.getUserByUsername(dto.username);
      if (!user) {
        return new IResponse(
          true,
          null,
          'User or password invalid',
          404,
          'User',
        );
      }

      const isEquals = await User.validatePassword(dto.password, user.password);
      if (!isEquals) {
        return new IResponse(
          true,
          null,
          'User or password invalid',
          400,
          'User',
        );
      }

      const payload = { id: user.id, role: user.role };
      const token = await this.jwtService.signAsync(payload);

      return new IResponse(
        false,
        {
          access_token: token,
          refresh_token: token,
        },
        'User logged in successfully',
        200,
        'User',
      );
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting login, err: ' + error,
        500,
        'User',
      );
    }
  }
}
