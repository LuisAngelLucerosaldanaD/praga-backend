import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { AuthService } from './auth.service';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { AuthRepository } from '../domain/auth.repository';
import { ApplicationService } from '../application/application.service';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    { provide: AuthRepository, useClass: AuthService },
    ApplicationService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
