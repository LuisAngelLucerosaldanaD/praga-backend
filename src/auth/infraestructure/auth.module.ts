import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { AuthController } from './http/auth.controller';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { AuthService } from './auth.service';

export const jwtConstants = {
  privateKey: fs.readFileSync(path.join(__dirname, '../keys/private.key')),
  publicKey: fs.readFileSync(path.join(__dirname, '../keys/public.key')),
};

@Module({
  imports: [
    JwtModule.register({
      privateKey: jwtConstants.privateKey,
      publicKey: jwtConstants.publicKey,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'RS256',
        issuer: 'solum-code.com',
      },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
