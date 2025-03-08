import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../domain/users.repository';
import { IResponse } from '../../shared/domain/IResponse';
import { User } from '../domain/user';
import { HashText } from '../../shared/infraestructure/security/security';
import { UserDto } from '../infraestructure/dto/dtos';
import { validate } from 'uuid';
import { Ticket } from '../../tickets/domain/ticket';
import { TicketsRepository } from '../../tickets/domain/tickets.repository';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly repository: UsersRepository,
    private readonly _ticketsRepository: TicketsRepository,
  ) {}

  public async create(dto: UserDto, user: string): Promise<IResponse<boolean>> {
    dto.password = await HashText(dto.password);
    const newUser = User.parseDTO(dto);

    newUser.user_creator = user;

    try {
      const isCreated = await this.repository.createUser(newUser);
      if (isCreated) {
        return new IResponse(
          false,
          true,
          'User created successfully',
          HttpStatus.CREATED,
          'User',
        );
      }

      return new IResponse(
        true,
        false,
        'An error occurred while creating the user',
        HttpStatus.ACCEPTED,
        'User',
      );
    } catch (error) {
      return new IResponse(
        true,
        false,
        'An error occurred while creating the user, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'User',
      );
    }
  }

  public async update(dto: UserDto): Promise<IResponse<User>> {
    dto.password = '';
    const newUser = User.parseDTO(dto);

    try {
      const isUpdated = await this.repository.updateUser(newUser);
      if (!isUpdated) {
        return new IResponse(
          true,
          null,
          'An error occurred while updating the user',
          HttpStatus.ACCEPTED,
          'User',
        );
      }
      return new IResponse(
        false,
        newUser,
        'User updated successfully',
        HttpStatus.OK,
        'User',
      );
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while updating the user, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'User',
      );
    }
  }

  public async delete(id: string, user: string): Promise<IResponse<boolean>> {
    try {
      if (!validate(id)) {
        return new IResponse(
          true,
          false,
          'Invalid user id',
          HttpStatus.BAD_REQUEST,
          'User',
        );
      }
      const isCreated = await this.repository.deleteUser(id, user);
      if (!isCreated) {
        return new IResponse(
          true,
          false,
          'An error occurred while deleting the user',
          HttpStatus.ACCEPTED,
          'User',
        );
      }

      return new IResponse(
        false,
        true,
        'User deleted successfully',
        HttpStatus.OK,
        'User',
      );
    } catch (error) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the user, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'User',
      );
    }
  }

  public async getUserById(id: string): Promise<IResponse<User>> {
    if (!validate(id)) {
      return new IResponse(
        true,
        null,
        'Invalid user id',
        HttpStatus.BAD_REQUEST,
        'User',
      );
    }

    try {
      const user = await this.repository.getUserById(id);
      if (!user) {
        return new IResponse(
          true,
          null,
          'User not found',
          HttpStatus.NOT_FOUND,
          'User',
        );
      }
      return new IResponse(false, user, 'User found', HttpStatus.OK, 'User');
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the user, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'User',
      );
    }
  }

  public async getUsers(): Promise<IResponse<User[]>> {
    try {
      const users = await this.repository.getUsers();
      return new IResponse(false, users, 'Users found', HttpStatus.OK, 'User');
    } catch (error) {
      return new IResponse(
        true,
        null,
        'An error occurred while getting the users, err: ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'User',
      );
    }
  }

  public async getTicketsByUser(user: string): Promise<IResponse<Ticket[]>> {
    try {
      if (!validate(user)) {
        return new IResponse(
          true,
          null,
          'Invalid user id',
          HttpStatus.BAD_REQUEST,
          'Ticket',
        );
      }
      const tickets = await this._ticketsRepository.getTicketsByUser(user);
      return new IResponse(
        false,
        tickets,
        'Tickets retrieved successfully',
        HttpStatus.OK,
        'Ticket',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the tickets, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Ticket',
      );
    }
  }
}
