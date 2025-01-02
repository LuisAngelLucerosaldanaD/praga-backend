import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { UserService } from './user.service';
import { UsersController } from './rest/user.controller';
import { AuthModule } from '../../auth/infraestructure/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
