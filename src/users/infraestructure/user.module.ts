import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { UserService } from './user.service';
import { UsersController } from './rest/user.controller';
import { SecurityModule } from '../../shared/infraestructure/security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule],
  providers: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
