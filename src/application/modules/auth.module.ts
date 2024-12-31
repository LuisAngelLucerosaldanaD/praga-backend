import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { UsersController } from '../../infrastructure/controllers/user.controller';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleController } from '../../infrastructure/controllers/role.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const privateKey = fs.readFileSync(
          path.join(__dirname, configService.get('PRIVATE_KEY')),
        );
        const publicKey = fs.readFileSync(
          path.join(__dirname, configService.get('PUBLIC_KEY')),
        );
        const options: JwtModuleOptions = {
          privateKey: privateKey,
          publicKey: publicKey,
          signOptions: {
            expiresIn: '3h',
            issuer: 'solum-code.com',
            algorithm: 'RS256',
          },
        };
        return options;
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  controllers: [UsersController, RoleController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
