import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/infraestructure/persistence/database.module';
import { UserService } from './user.service';
import { UsersController } from './rest/user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
