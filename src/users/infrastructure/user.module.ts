import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infrastructure/persistence/database.module';
import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { SecurityModule } from '../../shared/infrastructure/security/security.module';
import { UsersRepository } from '../domain/users.repository';
import { ApplicationService } from '../application/application.service';
import { TicketsModule } from '../../tickets/infrastructure/tickets.module';

@Module({
  imports: [DatabaseModule, SecurityModule, TicketsModule],
  providers: [
    { provide: UsersRepository, useClass: UsersService },
    ApplicationService,
  ],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UserModule {}
