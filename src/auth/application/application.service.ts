import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from '../domain/auth.repository';
import { AccountDTO, CredentialsDTO } from '../infraestructure/dtos/auth';
import { IResponse } from '../../shared/domain/IResponse';
import { Session } from '../domain/session';
import { User } from '../../users/domain/user';
import { JwtService } from '@nestjs/jwt';
import { HashText } from '../../shared/infraestructure/security/security';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly _repository: AuthRepository,
    private readonly jwtService: JwtService,
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
      return {
        data: null,
        code: HttpStatus.UNAUTHORIZED,
        error: true,
        message: 'User or password incorrect',
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
      const isCreated = await this._repository.register(acc);
      if (isCreated) {
        return new IResponse(
          false,
          null,
          'User created successfully',
          HttpStatus.CREATED,
          'Auth',
        );
      }

      return new IResponse(
        true,
        null,
        'Error creating user',
        HttpStatus.ACCEPTED,
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
