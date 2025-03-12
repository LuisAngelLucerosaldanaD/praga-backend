import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infrastructure/persistence/database.module';
import { SecurityModule } from '../../shared/infrastructure/security/security.module';
import { FilesRepository } from '../domain/files.repository';
import { FilesService } from './files.service';
import { ApplicationService } from '../application/application.service';
import { FilesStorageRepository } from '../domain/files.storage.repository';
import { FilesStorage } from './files.storage';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    { provide: FilesRepository, useClass: FilesService },
    { provide: FilesStorageRepository, useClass: FilesStorage },
    ApplicationService,
  ],
  controllers: [],
  exports: [ApplicationService],
})
export class FilesModule {}
