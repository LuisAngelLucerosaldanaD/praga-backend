import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { LocationService } from './location.service';
import { LocationController } from './rest/location.controller';
import { LocationApplication } from '../application/location.application';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [LocationController],
  providers: [LocationService, LocationApplication],
})
export class LocationsModule {}
