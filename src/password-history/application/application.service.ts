import { HttpStatus, Injectable } from '@nestjs/common';
import { PasswordHistoryRepository } from '../domain/password_history.repository';
import { PasswordHistoryDTO } from '../infrastructure/dtos/dtos';
import { IResponse } from '../../shared/domain/IResponse';
import { PasswordHistory } from '../domain/password_history';
import { validate } from 'uuid';

@Injectable()
export class ApplicationService {
  constructor(private readonly _repository: PasswordHistoryRepository) {}

  public async createPasswordHistory(
    dto: PasswordHistoryDTO,
    userId: string,
  ): Promise<IResponse> {
    const pwd = PasswordHistory.parseDTO(dto);
    pwd.user_creator = userId;
    try {
      const isCreated = await this._repository.createPasswordHistory(pwd);
      if (isCreated) {
        return new IResponse(
          false,
          true,
          'Password History created successfully',
          HttpStatus.CREATED,
          'PasswordHistory',
        );
      }

      return new IResponse(
        true,
        false,
        'An error occurred while creating the password history',
        HttpStatus.ACCEPTED,
        'PasswordHistory',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while creating the password history, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'PasswordHistory',
      );
    }
  }

  public async updatePasswordHistory(
    dto: PasswordHistoryDTO,
    userId: string,
  ): Promise<IResponse> {
    const pwd = PasswordHistory.parseDTO(dto);
    pwd.user_creator = userId;
    try {
      const isUpdated = await this._repository.updatePasswordHistory(pwd);
      if (!isUpdated) {
        return new IResponse(
          true,
          null,
          'An error occurred while updating the password history',
          HttpStatus.ACCEPTED,
          'PasswordHistory',
        );
      }

      return new IResponse(
        false,
        true,
        'Password History updated successfully',
        HttpStatus.OK,
        'PasswordHistory',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while updating the password history, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'PasswordHistory',
      );
    }
  }

  public async deletePasswordHistory(
    pwd: number,
    userId: string,
  ): Promise<IResponse> {
    try {
      const isDeleted = await this._repository.deletePasswordHistory(
        pwd,
        userId,
      );
      if (!isDeleted) {
        return new IResponse(
          true,
          null,
          'An error occurred while deleting the password history',
          HttpStatus.ACCEPTED,
          'PasswordHistory',
        );
      }

      return new IResponse(
        false,
        true,
        'PasswordHistory deleted successfully',
        HttpStatus.OK,
        'PasswordHistory',
      );
    } catch (e) {
      return new IResponse(
        true,
        false,
        'An error occurred while deleting the password history, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'PasswordHistory',
      );
    }
  }

  public async getPasswordHistoryById(
    id: number,
  ): Promise<IResponse<PasswordHistory>> {
    try {
      if (!validate(id)) {
        return new IResponse(
          true,
          null,
          'Invalid password history id',
          HttpStatus.BAD_REQUEST,
          'PasswordHistory',
        );
      }

      const pwd = await this._repository.getPasswordHistoryById(id);
      if (!pwd) {
        return new IResponse(
          true,
          null,
          'PasswordHistory not found',
          HttpStatus.NOT_FOUND,
          'PasswordHistory',
        );
      }

      return new IResponse(
        false,
        pwd,
        'PasswordHistory retrieved successfully',
        HttpStatus.OK,
        'PasswordHistory',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the password history, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'PasswordHistory',
      );
    }
  }

  public async getPasswordsHistory(): Promise<IResponse<PasswordHistory[]>> {
    try {
      const pwds = await this._repository.getPasswordsHistory();
      return new IResponse(
        false,
        pwds,
        'Passwords History retrieved successfully',
        HttpStatus.OK,
        'PasswordHistory',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'An error occurred while retrieving the passwords history, err: ' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
        'PasswordHistory',
      );
    }
  }
}
