import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [],
  providers: [EventService],
})
export class EventsModule {}