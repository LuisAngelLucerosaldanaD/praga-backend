import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infraestructure/auth.module';
import { UserModule } from './users/infraestructure/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/infraestructure/guards/auth.guard';
import { RoleModule } from './roles/infraestructure/role.module';
import { LocationsModule } from './locations/infraestructure/locations.module';
import { ZonesModule } from './zones/infraestructure/zones.module';
import { SecurityModule } from './shared/infraestructure/security/security.module';
import { EventsModule } from './events/infraestructure/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SecurityModule,
    AuthModule,
    UserModule,
    RoleModule,
    LocationsModule,
    ZonesModule,
    EventsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
