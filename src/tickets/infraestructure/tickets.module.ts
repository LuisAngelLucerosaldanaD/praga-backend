import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { TicketsService } from './tickets.service';
import { TicketsRepository } from '../domain/tickets.repository';
import { TicketController } from './ticket.controller';
import { ApplicationService } from '../applications/application.service';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    { provide: TicketsRepository, useClass: TicketsService },
    ApplicationService,
  ],
  controllers: [TicketController],
  exports: [TicketsRepository],
})
export class TicketsModule {}
