import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infraestructure/auth.module';
import { UserModule } from './users/infraestructure/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/infraestructure/guards/auth.guard';
import { RoleModule } from './roles/infraestructure/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    UserModule,
    RoleModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
