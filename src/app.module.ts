import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infraestructure/auth.module';
import { UserModule } from './users/infraestructure/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './shared/infraestructure/guards/auth.guard';
import { RoleModule } from './roles/infraestructure/role.module';
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
