import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { FilesRepository } from '../domain/files.repository';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ApplicationService } from '../application/application.service';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    { provide: FilesRepository, useClass: FilesService },
    ApplicationService,
  ],
  controllers: [FilesController],
  exports: [FilesRepository],
})
export class FilesModule {}
