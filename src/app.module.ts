import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './infrastructure/controllers/user.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './application/guards/auth.guard';
import * as fs from 'node:fs';
import * as path from 'node:path';

export const jwtConstants = {
  privateKey: fs.readFileSync(path.join(__dirname, '../keys/private.key')),
  publicKey: fs.readFileSync(path.join(__dirname, '../keys/public.key')),
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    JwtModule.register({
      privateKey: jwtConstants.privateKey,
      publicKey: jwtConstants.publicKey,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'RS256',
      },
    }),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
