import { Module } from '@nestjs/common';
import { LoggedUsersService } from './logged_users.service';
import { DatabaseModule } from '../../shared/infrastructure/persistence/database.module';
import { SecurityModule } from '../../shared/infrastructure/security/security.module';
import { ApplicationService } from '../application/application.service';
import { LoggedUsersRepository } from '../domain/logged_users.repository';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    { provide: LoggedUsersRepository, useClass: LoggedUsersService },
    ApplicationService,
  ],
  controllers: [],
  exports: [LoggedUsersRepository],
})
export class LoggedUsersModule {}
