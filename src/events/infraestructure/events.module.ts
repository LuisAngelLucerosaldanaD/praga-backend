import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { EventController } from './event.controller';
import { ApplicationService } from '../application/application.service';
import { EventsRepository } from '../domain/events.repository';
import { PlacesModule } from '../../places/infraestructure/places.module';

@Module({
  imports: [DatabaseModule, SecurityModule, PlacesModule],
  providers: [
    { provide: EventsRepository, useClass: EventsService },
    ApplicationService,
  ],
  controllers: [EventController],
})
export class EventsModule {}
