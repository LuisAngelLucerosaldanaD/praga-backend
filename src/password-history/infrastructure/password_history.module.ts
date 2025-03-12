import { Module } from '@nestjs/common';
import { PasswordHistoryService } from './password_history.service';
import { DatabaseModule } from '../../shared/infrastructure/persistence/database.module';
import { SecurityModule } from '../../shared/infrastructure/security/security.module';
import { ApplicationService } from '../application/application.service';
import { PasswordHistoryRepository } from '../domain/password_history.repository';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    { provide: PasswordHistoryRepository, useClass: PasswordHistoryService },
    ApplicationService,
  ],
  controllers: [],
  exports: [PasswordHistoryRepository],
})
export class PasswordHistoryModule {}
