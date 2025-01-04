import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

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
  ],
  exports: [JwtModule],
})
export class SecurityModule {}
