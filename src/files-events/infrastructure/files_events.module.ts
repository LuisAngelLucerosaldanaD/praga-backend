import { Module } from '@nestjs/common';
import { FilesEventsService } from './files_events.service';
import { DatabaseModule } from '../../shared/infrastructure/persistence/database.module';
import { SecurityModule } from '../../shared/infrastructure/security/security.module';
import { ApplicationService } from '../application/application.service';
import { FilesEventsRepository } from '../domain/files_events.repository';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    { provide: FilesEventsRepository, useClass: FilesEventsService },
    ApplicationService,
  ],
  exports: [FilesEventsRepository],
})
export class FilesEventsModule {}
