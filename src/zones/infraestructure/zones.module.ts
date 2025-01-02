import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { ZoneService } from './zone.service';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [],
  providers: [ZoneService],
})
export class ZonesModule {}