import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from '../domain/auth.repository';
import { AccountDTO, CredentialsDTO } from '../infrastructure/dtos/auth';
import { IResponse } from '../../shared/domain/IResponse';
import { Session } from '../domain/session';
import { User } from '../../users/domain/user';
import { JwtService } from '@nestjs/jwt';
import { HashText } from '../../shared/infrastructure/security/security';
import { PasswordHistoryRepository } from '../../password-history/domain/password_history.repository';
import { v4 } from 'uuid';
import { PasswordHistory } from '../../password-history/domain/password_history';
import { LoggedUsersRepository } from '../../logged-users/domain/logged_users.repository';
import { LoggedUser } from '../../logged-users/domain/logged_user';
import { UsersRepository } from '../../users/domain/users.repository';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly _repository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly _pwdHistory: PasswordHistoryRepository,
    private readonly _loggedUsers: LoggedUsersRepository,
    private readonly _usersRepo: UsersRepository,
  ) {}

  public async login(
    cred: CredentialsDTO,
    ip: string,
  ): Promise<IResponse<Session>> {
    const account = await this._repository.login(cred);
    if (!account) {
      return {
        data: null,
        code: HttpStatus.UNAUTHORIZED,
        error: true,
        message: 'User or password incorrect',
        type: 'Auth',
      };
    }

    if (account.is_delete) {
      return {
        data: null,
        code: HttpStatus.UNAUTHORIZED,
        error: true,
        message: 'User or password incorrect',
        type: 'Auth',
      };
    }

    if (account.is_block) {
      return {
        data: null,
        code: HttpStatus.UNAUTHORIZED,
        error: true,
        message: 'User is blocked',
        type: 'Auth',
      };
    }

    const isEquals = await User.validatePassword(
      cred.password,
      account.password,
    );
    if (!isEquals) {
      const failedAttempts = account.failed_attempts + 1;
      if (failedAttempts >= 5) await this._usersRepo.blockUser(account.id);

      await this._usersRepo.updateFailedAttempts(
        account.id,
        account.failed_attempts + 1,
      );

      return {
        data: null,
        code: HttpStatus.UNAUTHORIZED,
        error: true,
        message: 'User or password incorrect',
        type: 'Auth',
      };
    }

    const data = new LoggedUser(0, account.id, ip, '0,0');
    data.user_creator = account.id;
    const save = await this._loggedUsers.createLoggedUser(data);
    if (!save) {
      return {
        data: null,
        code: HttpStatus.UNAUTHORIZED,
        error: true,
        message: 'Could not authenticate user',
        type: 'Auth',
      };
    }

    const payload = { id: account.id, role: account.role, ip: ip };
    const token = await this.jwtService.signAsync(payload);
    return new IResponse(
      false,
      {
        access_token: token,
        refresh_token: token,
      },
      'Login successfully',
      HttpStatus.OK,
      'Auth',
    );
  }

  public async register(acc: AccountDTO): Promise<IResponse> {
    try {
      acc.password = await HashText(acc.password);
      acc.id = acc.id || v4();
      const exist = await this._repository.exists(acc.username);
      if (exist) {
        return new IResponse(
          true,
          null,
          'Username already exists',
          HttpStatus.ACCEPTED,
          'Auth',
        );
      }

      const isCreated = await this._repository.register(acc);
      if (!isCreated) {
        return new IResponse(
          true,
          null,
          'Error creating user',
          HttpStatus.ACCEPTED,
          'Auth',
        );
      }

      const data = new PasswordHistory(0, acc.id, acc.password);
      data.user_creator = acc.id;
      const saved = await this._pwdHistory.createPasswordHistory(data);
      if (!saved) {
        return new IResponse(
          true,
          null,
          'Error creating user',
          HttpStatus.ACCEPTED,
          'Auth',
        );
      }

      return new IResponse(
        false,
        null,
        'User created successfully',
        HttpStatus.CREATED,
        'Auth',
      );
    } catch (e) {
      return new IResponse(
        true,
        null,
        'Error creating user, err: ' + e,
        HttpStatus.ACCEPTED,
        'Auth',
      );
    }
  }
}
