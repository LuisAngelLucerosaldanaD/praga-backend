import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { DatabaseModule } from '../../shared/infrastructure/persistence/database.module';
import { SecurityModule } from '../../shared/infrastructure/security/security.module';
import { EventController } from './event.controller';
import { ApplicationService } from '../application/application.service';
import { EventsRepository } from '../domain/events.repository';
import { PlacesModule } from '../../places/infrastructure/places.module';
import { FilesModule } from '../../files/infrastructure/files.module';
import { FilesEventsModule } from '../../files-events/infrastructure/files_events.module';

@Module({
  imports: [
    DatabaseModule,
    SecurityModule,
    PlacesModule,
    FilesModule,
    FilesEventsModule,
  ],
  providers: [
    { provide: EventsRepository, useClass: EventsService },
    ApplicationService,
  ],
  controllers: [EventController],
})
export class EventsModule {}
