import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infrastructure/persistence/database.module';
import { SecurityModule } from '../../shared/infrastructure/security/security.module';
import { PlacesRepository } from '../domain/places.repository';
import { PlacesService } from './places.service';
import { ApplicationService } from '../applications/application.service';
import { PlacesController } from './places.controller';
import { TicketsModule } from '../../tickets/infrastructure/tickets.module';

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
