import { Module } from '@nestjs/common';
import { AuthController } from './http/auth.controller';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { AuthService } from './auth.service';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';

@Module({
  imports: [
    DatabaseModule,
    SecurityModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
