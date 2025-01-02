import { Module } from '@nestjs/common';
import { AuthController } from './http/auth.controller';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Module({
  imports: [
    DatabaseModule,
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
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
