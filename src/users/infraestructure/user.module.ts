import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { UsersRepository } from '../domain/users.repository';
import { ApplicationService } from '../application/application.service';
import { TicketsModule } from '../../tickets/infraestructure/tickets.module';

@Module({
  imports: [DatabaseModule, SecurityModule, TicketsModule],
  providers: [
    { provide: UsersRepository, useClass: UsersService },
    ApplicationService,
  ],
  controllers: [UsersController],
})
export class UserModule {}
