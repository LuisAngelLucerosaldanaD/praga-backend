import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { EventController } from './rest/event.controller';
import { EventsApplication } from '../application/evenst.application';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [EventController],
  providers: [EventsService, EventsApplication],
})
export class EventsModule {}
