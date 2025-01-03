import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { LocationService } from './location.service';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [],
  providers: [LocationService],
})
export class LocationsModule {}
