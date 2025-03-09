import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';
import { RolesRepository } from '../domain/roles.repository';
import { ApplicationService } from '../application/application.service';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [
    { provide: RolesRepository, useClass: RoleService },
    ApplicationService,
  ],
  controllers: [RoleController],
  exports: [RolesRepository],
})
export class RoleModule {}
