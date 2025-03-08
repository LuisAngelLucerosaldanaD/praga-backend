import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { PlacesRepository } from '../domain/places.repository';
import { PlacesService } from './places.service';
import { ApplicationService } from '../applications/application.service';
import { PlacesController } from './places.controller';
import { TicketsModule } from '../../tickets/infraestructure/tickets.module';

@Module({
  imports: [DatabaseModule, SecurityModule, TicketsModule],
  providers: [
    { provide: PlacesRepository, useClass: PlacesService },
    ApplicationService,
  ],
  controllers: [PlacesController],
  exports: [PlacesRepository],
})
export class PlacesModule {}
