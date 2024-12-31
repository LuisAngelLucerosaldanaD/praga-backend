import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../shared/infraestructure/persistence/database.service';
import { User } from '../../users/domain/user';
import { ICredentials, ISession } from './dtos/auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(cred: ICredentials): Promise<ISession | null> {
    this.logger.debug(`Executing query: getUserByUsername (${cred.username})`);
    const query = `SELECT password, status, is_block, is_delete  FROM auth.users WHERE username = $1`;
    try {
      const result = await this.dbService.execute(query, [cred.username]);
      this.logger.debug(`Executed query, result size ${result.rows.length}`);
      if (!result.rows.length) return null;
      const user = result.rows[0];
      const isEquals = await User.validatePassword(
        cred.password,
        user.password,
      );
      if (!isEquals) return null;
      const payload = { id: user.id, role: user.role };
      const token = await this.jwtService.signAsync(payload);
      return {
        access_token: token,
        refresh_token: token,
      };
    } catch (error) {
      this.logger.error(
        `Error executing query getUserByUsername (${cred.username}), error: ${error}`,
      );
      return null;
    }
  }
}
