import { HttpStatus, Injectable } from '@nestjs/common';
import { LoggedUsersRepository } from '../domain/logged_users.repository';
import { LoggedUserDTO } from '../infrastructure/dtos/dtos';
import { IResponse } from '../../shared/domain/IResponse';
import { LoggedUser } from '../domain/logged_user';
import { validate } from 'uuid';

@Injectable()
export class ApplicationService {
  constructor(private readonly _repository: LoggedUsersRepository) {}

  public async createLoggedUser(
    dto: LoggedUserDTO,
    userId: string,
  ): Promise<IResponse> {
    const loggedUser = LoggedUser.parseDTO(dto);
    loggedUser.user_creator = userId;
    try {
      const isCreated = await this._repository.createLoggedUser(loggedUser);
      if (isCreated) {
        return new IResponse(
          false,
          true,
          'LoggedUser created successfully',
          HttpStatus.CREATED,
          'LoggedUser',
        );
      }

      return new IResponse(
        true,
        false,
        'An error occurred while creating the loggeduser',
        HttpStatus.ACCEPTED,
        'LoggedUser',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while creating the loggeduser, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'LoggedUser',
      );
    }
  }

  public async updateLoggedUser(
    dto: LoggedUserDTO,
    userId: string,
  ): Promise<IResponse> {
    const loggedUser = LoggedUser.parseDTO(dto);
    loggedUser.user_creator = userId;
    try {
      const isUpdated = await this._repository.updateLoggedUser(loggedUser);
      if (!isUpdated) {
        return new IResponse(
          true,
          null,
          'An error occurred while updating the loggeduser',
          HttpStatus.ACCEPTED,
          'LoggedUser',
        );
      }

      return new IResponse(
        false,
        true,
        'LoggedUser updated successfully',
        HttpStatus.OK,
        'LoggedUser',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while updating the loggeduser, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'LoggedUser',
      );
    }
  }

  public async deleteLoggedUser(
    id: string,
    userId: string,
  ): Promise<IResponse> {
    try {
      const isDeleted = await this._repository.deleteLoggedUser(id, userId);
      if (!isDeleted) {
        return new IResponse(
          true,
          null,
          'An error occurred while deleting the loggeduser',
          HttpStatus.ACCEPTED,
          'LoggedUser',
        );
      }

      return new IResponse(
        false,
        true,
        'LoggedUser deleted successfully',
        HttpStatus.OK,
        'LoggedUser',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the loggeduser, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'LoggedUser',
      );
    }
  }

  public async getLoggedUserById(id: string): Promise<IResponse<LoggedUser>> {
    try {
      if (!validate(id)) {
        return new IResponse(
          true,
          null,
          'Invalid loggeduser id',
          HttpStatus.BAD_REQUEST,
          'LoggedUser',
        );
      }

      const logged_user = await this._repository.getLoggedUserById(id);
      if (!logged_user) {
        return new IResponse(
          true,
          null,
          'LoggedUser not found',
          HttpStatus.NOT_FOUND,
          'LoggedUser',
        );
      }

      return new IResponse(
        false,
        logged_user,
        'LoggedUser retrieved successfully',
        HttpStatus.OK,
        'LoggedUser',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the loggeduser, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'LoggedUser',
      );
    }
  }

  public async getLoggedUsers(): Promise<IResponse<LoggedUser[]>> {
    try {
      const items = await this._repository.getLoggedUsers();
      return new IResponse(
        false,
        items,
        'LoggedUsers retrieved successfully',
        HttpStatus.OK,
        'LoggedUser',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the loggedusers, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'LoggedUser',
      );
    }
  }
}
