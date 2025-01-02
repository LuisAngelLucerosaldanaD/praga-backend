import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { AuthModule } from '../../auth/infraestructure/auth.module';
import { RoleService } from './role.service';
import { RoleController } from './rest/role.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
