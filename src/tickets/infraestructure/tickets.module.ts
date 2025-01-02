import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [],
  providers: [],
})
export class TicketsModule {}