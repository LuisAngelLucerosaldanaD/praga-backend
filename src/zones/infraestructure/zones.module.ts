import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { ZonesService } from './zones.service';
import { ZoneController } from './rest/zone.controller';
import { ZonesApplication } from '../application/zones.application';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [ZoneController],
  providers: [ZonesService, ZonesApplication],
})
export class ZonesModule {}
