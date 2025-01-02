import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { RoleService } from './role.service';
import { RoleController } from './rest/role.controller';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
