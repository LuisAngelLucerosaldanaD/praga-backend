import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../../shared/infrastructure/persistence/database.module';
import { AuthService } from './auth.service';
import { SecurityModule } from '../../shared/infrastructure/security/security.module';
import { AuthRepository } from '../domain/auth.repository';
import { ApplicationService } from '../application/application.service';
import { PasswordHistoryModule } from '../../password-history/infrastructure/password_history.module';
import { LoggedUsersModule } from '../../logged-users/infrastructure/logged_users.module';
import { UserModule } from '../../users/infrastructure/user.module';

@Module({
  imports: [
    DatabaseModule,
    SecurityModule,
    PasswordHistoryModule,
    LoggedUsersModule,
    UserModule,
  ],
  providers: [
    { provide: AuthRepository, useClass: AuthService },
    ApplicationService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
