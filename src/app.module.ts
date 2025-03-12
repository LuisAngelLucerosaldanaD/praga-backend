import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infrastructure/auth.module';
import { UserModule } from './users/infrastructure/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/infrastructure/guards/auth.guard';
import { RoleModule } from './roles/infrastructure/role.module';
import { SecurityModule } from './shared/infrastructure/security/security.module';
import { EventsModule } from './events/infrastructure/events.module';
import { TicketsModule } from './tickets/infrastructure/tickets.module';
import { FilesModule } from './files/infrastructure/files.module';
import { PlacesModule } from './places/infrastructure/places.module';
import { ThrottlerGuard } from '@nestjs/throttler';

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
    EventsModule,
    TicketsModule,
    FilesModule,
    PlacesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
